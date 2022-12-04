import { useEffect } from "react";
import { useAuth } from "./contexts/auth-context";
import { AuthorizedApp } from "./components/AuthorizedApp";
import { UnauthorizedApp } from "./components/UnauthorizedApp";

const App = () => {
  const { user } = useAuth();

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
