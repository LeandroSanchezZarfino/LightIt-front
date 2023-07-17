import { LoginFormInterface, RegisterFormInterface } from "../interfaces/LoginInterface";

import AppAxios from "../utils/Axios";

export const registerUser = (params: RegisterFormInterface) => {
    return AppAxios.post('auth/register', params);
}

export const loginUser = (params: LoginFormInterface) => {
    return AppAxios.post('auth/login', params);
}

