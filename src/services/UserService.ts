import AppAxios from "../utils/Axios";
import { RegisterFormInterface } from "../interfaces/LoginInterface";

export const registerUser = (params: RegisterFormInterface) => {
    return AppAxios.post('user/register', params);
}