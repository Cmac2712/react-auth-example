import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./contexts/auth-context";
import { AuthorizedApp } from "./components/AuthorizedApp";
import { UnauthorizedApp } from "./components/UnauthorizedApp";

const App = () => {
  const { user, logIn, logOut, isLoading } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <AuthorizedApp />
        </>
      ) : (
        <>
          <UnauthorizedApp />
        </>
      )}
    </div>
  );
};

export default App;
