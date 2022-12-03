import { useAuth } from "../contexts/auth-context";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

function UnauthorizedApp() {
  const { isLoading } = useAuth();

  if (isLoading) return <p>loading&hellip;</p>;

  return (
    <>
      <LoginForm />
      <RegisterForm />
    </>
  );
}

export { UnauthorizedApp };
