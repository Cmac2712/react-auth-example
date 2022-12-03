import { useAuth } from "../contexts/auth-context";

function AuthorizedApp() {
  const { user, logOut, isLoading } = useAuth();

  if (isLoading) return <p>loading&hellip;</p>;

  return (
    <>
      <button onClick={() => logOut()}>Log Out</button>
      <h1>Welcome {user?.user?.email}</h1>
    </>
  );
}

export { AuthorizedApp };
