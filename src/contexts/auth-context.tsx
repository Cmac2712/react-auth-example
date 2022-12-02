import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from "react";

interface User {
  id: string | null;
}

export type AuthProps = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<Response> | User;
  logOut: () => Promise<null>;
  register: () => Promise<User>;
  isLoading: boolean;
  isError: boolean;
} | null;

const AuthContext = createContext<AuthProps>(null);
AuthContext.displayName = "AuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isError = false;

  const logIn = useCallback((email: string, password: string) => {
    const user = fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (user) return user;

    setIsLoading(true);

    return user;
  }, []);

  const logOut = useCallback(() => {
    setIsLoading(true);

    return new Promise<null>((resolve) => {
      setTimeout(() => {
        setUser(null);
        setIsLoading(false);
        resolve(null);
      }, 1000);
    });
  }, []);

  const register = useCallback(() => {
    const user = {
      id: "123",
    };
    setIsLoading(true);

    return new Promise<User>((resolve) => {
      setTimeout(() => {
        setUser(user);
        resolve(user);
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  const value: AuthProps = {
    user,
    logIn,
    logOut,
    register,
    isLoading,
    isError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
