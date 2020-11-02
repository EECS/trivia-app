import React from "react";
import { observableAuthentication, TAuthentication } from "../stores/Auth";

export const AuthContext = React.createContext<TAuthentication | null>(null);

type Props = {
  /**Children to be rednered beneath authentication context. */
  children: React.ReactNode;
};

export const AuthProvider = (props: Props) => {
  const authStore = observableAuthentication;
  return (
    <AuthContext.Provider value={authStore}>
      {props.children}
    </AuthContext.Provider>
  );
};
