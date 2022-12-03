import { useAuth } from "../contexts/auth-context";

interface RegisterFormData {
  elements: {
    email: { value: string };
    password: { value: string };
  };
}

function RegisterForm() {
  const { register } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = (
      event.target as HTMLFormElement & RegisterFormData
    ).elements;

    register(email.value, password.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export { RegisterForm };
