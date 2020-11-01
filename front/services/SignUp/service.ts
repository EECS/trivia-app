import { TLogin } from "../../types/Login"
import { API_Post_Json } from "../API/service";

export const Login_User = async (loginCreds: TLogin) => {
    const url = "/login"

    return await API_Post_Json(url, loginCreds)
}