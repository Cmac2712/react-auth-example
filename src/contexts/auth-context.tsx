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
  logIn: (email: string, password: string) => User;
  logOut: () => User;
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

async function authQuery(endpoint: string, data: object) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${import.meta.env.VITE_API_ENDPOINT}/${endpoint}`, config).then(
    async (resp) =>
      resp.ok ? await resp.json() : Promise.reject(await resp.json())
  );
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isError = false;

  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    const user = await authQuery("login", { email, password });
    setUser(user);
    setIsLoading(false);

    return user;
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    const user = await authQuery("register", { email, password });
    setUser(user);
    setIsLoading(false);

    return user;
  };

  const logOut = () => setUser(null);

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
