import { AuthProps } from "./auth-context";
import { useContext, createContext } from "react";
import { ReactNode } from "react";

type UserProps =
  | {
      name: string;
      email: string;
    }
  | AuthProps
  | null;

const UserContext = createContext<UserProps>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const value: UserProps = null;
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
