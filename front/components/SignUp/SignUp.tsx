import React, { useState } from "react";
import { AuthContext } from "../../contexts/Auth";

export const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <AuthContext.Consumer>
      {(auth) => {
        if (auth === null) {
          return Error("Auth context should not be null.");
        }

        return (
          <form
            action="submit"
            onSubmit={async (e) => {
              setLoading(true);
              e.preventDefault();
              const response = await auth.signUp(email, password);
              setLoading(false);
            }}
          >
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="email"
              onChange={onEmailChange}
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
            />
            <button
              disabled={isLoading}
              onClick={async () => {
                setLoading(true);
                const response = await auth.signUp(email, password);
                setLoading(false);
              }}
            >
              Submit
            </button>
          </form>
        );
      }}
    </AuthContext.Consumer>
  );
};
