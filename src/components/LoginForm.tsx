import React, { useState, MouseEvent } from "react";
import { useAuth } from "../contexts/auth-context";

interface LoginFormData {
  elements: {
    email: { value: string };
    password: { value: string };
  };
}

function LoginForm() {
  const { logIn, isError } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = (
      event.target as HTMLFormElement & LoginFormData
    ).elements;

    logIn(email.value, password.value);
  };

  return (
    <>
      {isError && <p>There was an error logging in.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <br />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export { LoginForm };
