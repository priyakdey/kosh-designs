import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import api from "@/services/api";
import type { User, AuthResponse } from "@/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    api
      .get<AuthResponse>("/me.json")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        Cookies.remove("auth_token");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async () => {
    const res = await api.get<AuthResponse>("/me.json");
    Cookies.set("auth_token", res.data.token, { expires: 7 });
    setUser(res.data.user);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("auth_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
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
