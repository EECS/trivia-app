//Services import
import { action, observable } from "mobx";
import { LoginUser, SignUpUser } from "../services/SignUp/service";

//Types import
import { TUser } from "../types/Auth/Auth.types";

class Authentication {
  constructor() {
    this.user = this.init();
  }

  @observable user: TUser;

  private init(): TUser {
    return {
      email: "",
      isAuthenticated: false,
    };
  }

  @action.bound async signUp(email: string, password: string) {
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

  @action.bound async login(email: string, password: string) {
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

export const observableAuthentication = new Authentication();
