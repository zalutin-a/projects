import { useState, SyntheticEvent, useRef, ReactElement } from "react";
import { Button, InputWithError, useFormControl } from "src/shared/index";
import { loginFormProps } from "./types";

const FIREBASE_ERRORS: Record<string,{message: string, fieldName: string[]}> = {
  "auth/invalid-credential": {message: "The email or password is incorrect.", fieldName: ['email', 'pass']},
  "auth/invalid-email": {message: "Email is incorrect.", fieldName: ['email']},
  "auth/wrong-password": {message: "Password is incorrect.", fieldName: ['pass']},
  "auth/email-already-in-use": {message: "Acount with this Email already exist, please choose another one or use sign in form.", fieldName: ['email']},
  "auth/weak-password":  {message: "Your Password is too Weak. Strong Password Must contain 8+ characters, including at least 1 letter and 1 number.",  fieldName: ['pass']},
}

type inputConfig = {
  inputId: string,
  validator: (value: any) => boolean,
  transform: (value: any) => any,
  disabled: boolean,
  isValid: boolean,
}

export function LoginForm({type, method}: loginFormProps) {
  const form = useRef<HTMLFormElement>(null)
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordType, setPaswordType] = useState<"password" | "text">("password");
  const [erroState, setErrorState] = useState(null);
  const [formControl, setForm] = useFormControl<{pass: string, email: string}>({
    pass: {
      isRequred: true,
      id: 'passId',
      validator: (value) => value.length >= 6 ? '' : 'Must contain 8+ characters', // return error message instead of
      transform: (value) => value,
      initialValue: '',
    },
    email: {
      isRequred: true,
      id: 'emailId',
      validator: (value) => '',
      transform: (value) => value,
      initialValue: '',
    }
  }, async (e) => {
      e.preventDefault()
      method(formControl.children.email.value, formControl.children.pass.value).catch(error => {
        FIREBASE_ERRORS[error.code].fieldName.forEach(inputName => {
          formControl[inputName]?.setIsValid(false, FIREBASE_ERRORS[error.code].message)
        })
        // formControl.children.email.setIsValid(false, FIREBASE_ERRORS[error.code].message)
      })
  })
  // const formControl: {[namr:string]: inputConfig} = {}


  // formControl.children.email.setDisabled(true)

  // const onAction = (e: SyntheticEvent) => {
  //   e.preventDefault()
  //   method(formControl.children.email.value, formControl.children.pass.value).catch(error => {
  //     FIREBASE_ERRORS[error.code].fieldName.forEach(inputName => {
  //       formControl[inputName]?.setIsValid(false, FIREBASE_ERRORS[error.code].message)
  //     })
  //     formControl.children.email.setIsValid(false, FIREBASE_ERRORS[error.code].message)

  //   })
  // }

  const showHidePassword = () => {
    setPaswordType((type) => {
      return type === "password" ? "text" : "password";
    });
  }

  const onEmailChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const onPasswordChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setPasword(e.currentTarget.value)
  }
  

  return (
    <>
      <form ref={setForm} className="flex gap-3 w-full flex-col">
        <div>
          <InputWithError error={formControl.children.email.errorMessage}>
            <input value={formControl.children.email.value} onChange={() => {}} autoComplete='email' id="emailId" aria-invalid={false} aria-describedby="elementID" className="px-6 py-3 border-solid border-2 border-gray-600 rounded w-full h-12" placeholder="Enter Email" required type="email"/>
          </InputWithError>
        </div>
        <div>
          <InputWithError error={formControl?.children.pass?.errorMessage}>
            <fieldset disabled={formControl.children.pass.disabled} className="relative">
              <input id="passId" className="px-6 py-3 border-solid border-2 border-gray-600 rounded w-full h-12" placeholder="Password" minLength={2} required type={passwordType}/>
              <button onClick={showHidePassword} className="absolute end-9 top-2.5 cursor-pointer">{passwordType === "password" ? "Show" : "Hide"}</button>
            </fieldset>
          </InputWithError>
          <p className="text-gray-400">Must contain 8+ characters, including at least 1 letter and 1 number.</p>
        </div>
        {/* <button type="submit">{type}</button> */}
        <fieldset disabled={!formControl.children.pass.isValid} className="relative w-full">
          <Button clickHandler={() => {}} className="w-full" color='green-300'>{type}</Button>
        </fieldset>
      </form>
    </>
  )
}