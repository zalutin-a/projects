import { authType } from "../../types";

export type loginFormProps = {
  type: authType;
}

export type loginForm = {
  pass: string,
  email: string,
}
