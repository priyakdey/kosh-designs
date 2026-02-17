import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  PROFILE_QUERY_KEY,
  useProfile,
  useSetupProfile,
  type ProfileDetailsResponse,
  type ProfileSetupInput,
} from "@/hooks/useProfile";
import type { User } from "@/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  bootstrapProgress: number;
  requiresProfileSetup: boolean;
  isSettingUpProfile: boolean;
  login: () => Promise<void>;
  logout: () => void;
  completeProfileSetup: (input: ProfileSetupInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const getInitials = (name: string, email: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase();
};

const mapProfileToUser = (profile: ProfileDetailsResponse): User => ({
  id: profile.email || "session-user",
  name: profile.name,
  email: profile.email,
  initials: getInitials(profile.name, profile.email),
  timezone: profile.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  currency: profile.currency ?? "",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [bootstrapProgress, setBootstrapProgress] = useState(0);
  const [requiresProfileSetup, setRequiresProfileSetup] = useState(false);
  const [minDelayDone, setMinDelayDone] = useState(false);

  const profileQuery = useProfile();

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMinDelayDone(true);
    }, 700);
    return () => window.clearTimeout(id);
  }, []);

  const isProfileSettled = profileQuery.isSuccess || profileQuery.isError;
  const isLoading = !(isProfileSettled && minDelayDone);

  useEffect(() => {
    if (!isLoading) {
      setBootstrapProgress(100);
      return;
    }

    const id = window.setInterval(() => {
      setBootstrapProgress((value) => Math.min(95, value + 5));
    }, 40);

    return () => window.clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (!isProfileSettled) return;

    if (profileQuery.isSuccess && profileQuery.data) {
      const profile = profileQuery.data;
      const firstTimeLogin = profile.isFirstTimeLogin ?? false;
      setUser(mapProfileToUser(profile));
      setRequiresProfileSetup(firstTimeLogin);
      return;
    }

    setUser(null);
    setRequiresProfileSetup(false);
  }, [
    isProfileSettled,
    profileQuery.isSuccess,
    profileQuery.data,
    profileQuery.isError,
  ]);

  const profileSetupMutation = useSetupProfile();

  const login = useCallback(async () => {
    window.location.href = "http://localhost:8080/api/v1/auth/google/login";
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRequiresProfileSetup(false);
    void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
  }, [queryClient]);

  const completeProfileSetup = useCallback(
    async ({ displayName, timezone, currency }: ProfileSetupInput) => {
      await profileSetupMutation.mutateAsync({ displayName, timezone, currency });

      setUser((existing) => {
        if (!existing) return existing;
        return {
          ...existing,
          name: displayName,
          initials: getInitials(displayName, existing.email),
          timezone,
          currency,
        };
      });
      setRequiresProfileSetup(false);

      queryClient.setQueryData<ProfileDetailsResponse>(
        PROFILE_QUERY_KEY,
        (existing) => {
          if (!existing) return existing;
          return {
            ...existing,
            name: displayName,
            timezone,
            currency,
            isFirstTimeLogin: false,
            firstTimeLogin: false,
          };
        },
      );
    },
    [profileSetupMutation, queryClient],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        bootstrapProgress,
        requiresProfileSetup,
        isSettingUpProfile: profileSetupMutation.isPending,
        login,
        logout,
        completeProfileSetup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
