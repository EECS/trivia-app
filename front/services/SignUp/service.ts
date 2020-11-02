import { TLogin } from "../../types/Login"
import { API_Post_Json } from "../API/service";
import getConfig from "next/config";

export const Login_User = async (loginCreds: TLogin) => {
    const {publicRuntimeConfig} = getConfig()
    const url = `${publicRuntimeConfig.API_HOST_ENV}/login`

    return await API_Post_Json(url, loginCreds)
}