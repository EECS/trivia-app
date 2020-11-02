import { TLogin } from "../../types/Login";
import { API_Post_Json } from "../API/service";
import getConfig from "next/config";

export const SignUpUser = async (loginCreds: TLogin) => {
  const { publicRuntimeConfig } = getConfig();
  const url = `${publicRuntimeConfig.API_HOST_ENV}/api/auth/sign-up`;

  return await API_Post_Json(url, loginCreds);
};
