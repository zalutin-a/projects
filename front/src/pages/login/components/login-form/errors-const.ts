import { FormValidationError } from "src/shared"
import { loginForm } from "./types"

export const LOGIN_FORM_ERRORS: Record<string, FormValidationError<loginForm>> = {
  "auth/invalid-credential": {message: "The email or password is incorrect.", fields: ['email', 'pass']},
  "auth/invalid-email": {message: "Email is incorrect.", fields: ['email']},
  "auth/wrong-password": {message: "Password is incorrect.", fields: ['pass']},
  "auth/email-already-in-use": {message: "Acount with this Email already exist, please choose another one or use sign in form.", fields: ['email']},
  "auth/weak-password":  {message: "Your Password is too Weak. Strong Password Must contain 8+ characters, including at least 1 letter and 1 number.",  fields: ['pass']},
  "auth/too-many-requests": {message: "Access to this account has been temporarily disabled. You can restore your password or try again later.", fields: ['email', 'pass']},
}
