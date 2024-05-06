import { string } from "yup/lib/locale";

export interface SignupValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ForgotPasswordValue {
  email: string;
}

export interface ChangePasswordValues {
  cpassword: string;
  newPassword1: string;
  newPassword2: string;
}
