import { Auth, UserCredential } from "firebase/auth";
import { authType } from "../../types";

export type loginFormProps = {
  type: authType;
  method: (auth: Auth, email: string, password: string) => Promise<UserCredential>;
}
