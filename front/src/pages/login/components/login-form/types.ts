import { authType } from "../../types";

export type loginFormProps = {
  type: authType;
  method: (email: string, password: string) => Promise<any>;
}
