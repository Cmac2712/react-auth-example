import { useAuth } from "../contexts/auth-context";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

function UnauthorizedApp() {
  const { isLoading, error } = useAuth();

  if (isLoading) return <p>loading&hellip;</p>;

  return (
    <>
      {error ? <p>{`${error}. Please try again.`}</p> : null}
      <LoginForm />
      <RegisterForm />
    </>
  );
}

export { UnauthorizedApp };
