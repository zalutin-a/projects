export const LOGIN_FORM_ERRORS: Record<string,{message: string, fieldName: string[]}> = {
  "auth/invalid-credential": {message: "The email or password is incorrect.", fieldName: ['email', 'pass']},
  "auth/invalid-email": {message: "Email is incorrect.", fieldName: ['email']},
  "auth/wrong-password": {message: "Password is incorrect.", fieldName: ['pass']},
  "auth/email-already-in-use": {message: "Acount with this Email already exist, please choose another one or use sign in form.", fieldName: ['email']},
  "auth/weak-password":  {message: "Your Password is too Weak. Strong Password Must contain 8+ characters, including at least 1 letter and 1 number.",  fieldName: ['pass']},
}
