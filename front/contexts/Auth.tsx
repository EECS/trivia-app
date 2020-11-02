import React from "react";

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
}

export type TAuthentication = Authentication;

export const AuthContext = React.createContext<TAuthentication | null>(null);

type Props = {
  /**Children to be rednered beneath authentication context. */
  children: React.ReactNode;
};

export const AuthProvider = (props: Props) => {
  const authStore = new Authentication();
  console.log(authStore);
  return (
    <AuthContext.Provider value={authStore}>
      {props.children}
    </AuthContext.Provider>
  );
};
