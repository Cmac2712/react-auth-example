import { useEffect } from "react";
import { useAuth } from "./contexts/auth-context";
import { AuthorizedApp } from "./components/AuthorizedApp";
import { UnauthorizedApp } from "./components/UnauthorizedApp";

const App = () => {
  const { user, logIn, logOut, isLoading, isError } = useAuth();

  isLoading ? <div>Loading...</div> : null;

  isError ? <div>Error</div> : null;

  console.log("isLoading", isLoading);

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
