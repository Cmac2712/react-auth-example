import { useContext, useState, createContext, ReactNode } from "react";

interface User {
  id: string | null;
}

export type AuthProps = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<User>;
  logOut: () => void;
  register: (email: string, password: string) => Promise<User>;
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

// async function authQuery(endpoint: string, data: object) {
//   const config = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   return fetch(`${import.meta.env.VITE_API_ENDPOINT}/${endpoint}`, config)
//     .then(async (resp) => {
//       return resp.ok ? await resp.json() : Promise.reject(resp);
//     })
//     .catch(async (err) => {
//       return await err.json();
//     });
// }

interface FetchConfig {
  method: "POST" | "GET" | "PUT" | "DELETE";
  headers: { "Content-Type": "application/json" };
  body: string;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getConfig = (data: any): FetchConfig => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  };

  async function logIn(email: string, password: string) {
    const config = getConfig({ email, password });
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, config)
      .then(async (resp) => {
        return resp.ok ? setUser(await resp.json()) : Promise.reject(resp);
      })
      .catch(async (err) => {
        setIsError(true);
        return await err.json();
      });
    setIsLoading(false);

    return user;
  }

  async function register(email: string, password: string) {
    const config = getConfig({ email, password });
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/register`, config)
      .then(async (resp) => {
        return resp.ok ? setUser(await resp.json()) : Promise.reject(resp);
      })
      .catch(async (err) => {
        setIsError(true);
        return await err.json();
      });
    setIsLoading(false);

    return user;
  }

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
