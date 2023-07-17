export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface RegisterFormInterface {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female";
  birthday: string;
}

export interface LoginResponseInterface {
  access_token: string;
}