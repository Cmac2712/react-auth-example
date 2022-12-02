import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { UserProvider } from "./user-context";

function AppProvidors({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

export default AppProvidors;
