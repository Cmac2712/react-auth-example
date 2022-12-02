import { useAuth } from "../contexts/auth-context";
import { LoginForm } from "./LoginForm";

function UnauthorizedApp() {
  const { logIn, register, isLoading } = useAuth();

  if (isLoading) return <p>loading&hellip;</p>;

  return (
    <>
      <h1>Please log in</h1>
      <LoginForm />
      <button onClick={() => register()}>Register</button>
    </>
  );
}

export { UnauthorizedApp };
