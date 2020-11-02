import React from "react";

//Services import
import { LoginUser, SignUpUser } from "../services/SignUp/service";

//Types import
import { TUser } from "../types/Auth/Auth.types";

class Authentication {
  user: TUser;

  constructor() {
    this.user = this.init();
  }

  private init(): TUser {
    return {
      email: "",
      isAuthenticated: false,
    };
  }

  public async signUp(email: string, password: string) {
    const response = await SignUpUser({
      email,
      password,
    });

    if (response.ok) {
      const data: { ok: string; data: string } = await response.json();
      this.user = {
        email: data.data,
        isAuthenticated: true,
      };
    }

    return response;
  }

  public async login(email: string, password: string) {
    const response = await LoginUser({
      email,
      password,
    });

    if (response.ok) {
      const data: { ok: string; data: string } = await response.json();
      this.user = {
        email: data.data,
        isAuthenticated: true,
      };
    }

    return response;
  }
}

export type TAuthentication = Authentication;

export const AuthContext = React.createContext<TAuthentication | null>(null);

type Props = {
  /**Children to be rednered beneath authentication context. */
  children: React.ReactNode;
};

export const AuthProvider = (props: Props) => {
  const authStore = new Authentication();
  return (
    <AuthContext.Provider value={authStore}>
      {props.children}
    </AuthContext.Provider>
  );
};
