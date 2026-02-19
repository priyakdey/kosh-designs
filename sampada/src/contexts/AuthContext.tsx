import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
import {
  BOOTSTRAP_MIN_DELAY_MS,
  SETUP_COMPLETE_MIN_DELAY_MS,
} from "@/lib/constants";

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

const SESSION_HINT_KEY = "sampada_session";
const hasSessionHint = () => localStorage.getItem(SESSION_HINT_KEY) === "1";

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
  timezone: profile.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  currency: profile.currency ?? "",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [bootstrapProgress, setBootstrapProgress] = useState(0);
  const [requiresProfileSetup, setRequiresProfileSetup] = useState(false);

  // If no session hint, skip the initial overlay entirely.
  const [minDelayDone, setMinDelayDone] = useState(() => !hasSessionHint());

  // True while we are running the post-setup completion overlay.
  const [isCompletingSetup, setIsCompletingSetup] = useState(false);
  // Resolves when the post-setup min-delay + POST are both done.
  const setupDoneResolveRef = useRef<(() => void) | null>(null);

  const profileQuery = useProfile();

  // Initial session-hint delay — only runs when hint is present.
  useEffect(() => {
    if (!hasSessionHint()) return;
    const id = window.setTimeout(() => setMinDelayDone(true), BOOTSTRAP_MIN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const isProfileSettled = profileQuery.isSuccess || profileQuery.isError;

  // isLoading is true while either:
  //   (a) the initial bootstrap hasn't resolved yet, OR
  //   (b) we are in the post-setup completion phase.
  const isLoading = !(isProfileSettled && minDelayDone) || isCompletingSetup;

  // Progress bar animation — runs whenever isLoading is true.
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

  // Post-setup completion phase: enforce min delay, then resolve.
  useEffect(() => {
    if (!isCompletingSetup) return;

    let resolved = false;
    let minDelayDone = false;
    let postDone = false;

    const tryResolve = () => {
      if (!resolved && minDelayDone && postDone) {
        resolved = true;
        setBootstrapProgress(100);
        // Small tick to let the 100% render before unmounting overlay.
        window.setTimeout(() => {
          setIsCompletingSetup(false);
        }, 80);
      }
    };

    const timerId = window.setTimeout(() => {
      minDelayDone = true;
      tryResolve();
    }, SETUP_COMPLETE_MIN_DELAY_MS);

    // Expose a callback so completeProfileSetup can signal POST is done.
    setupDoneResolveRef.current = () => {
      postDone = true;
      tryResolve();
    };

    return () => {
      window.clearTimeout(timerId);
      setupDoneResolveRef.current = null;
    };
  }, [isCompletingSetup]);

  useEffect(() => {
    if (!isProfileSettled) return;

    if (profileQuery.isSuccess && profileQuery.data) {
      localStorage.setItem(SESSION_HINT_KEY, "1");
      const profile = profileQuery.data;
      const firstTimeLogin = profile.isFirstTimeLogin ?? false;
      setUser(mapProfileToUser(profile));
      setRequiresProfileSetup(firstTimeLogin);
      return;
    }

    localStorage.removeItem(SESSION_HINT_KEY);
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
    localStorage.removeItem(SESSION_HINT_KEY);
    setUser(null);
    setRequiresProfileSetup(false);
    void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
  }, [queryClient]);

  const completeProfileSetup = useCallback(
    async ({ displayName, timezone, currency }: ProfileSetupInput) => {
      // Immediately engage the overlay — modal can unmount cleanly behind it.
      setRequiresProfileSetup(false);
      setIsCompletingSetup(true);

      try {
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

        // Signal that the POST is done; effect handles the min-delay.
        setupDoneResolveRef.current?.();
      } catch {
        // On error: dismiss overlay immediately and surface the error.
        setIsCompletingSetup(false);
        setRequiresProfileSetup(true);
        throw new Error("Could not save profile yet. Please try again.");
      }
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
