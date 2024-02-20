import { useState, SyntheticEvent } from "react";
import { Button } from "src/shared/index";
import { loginFormProps } from "./types";


export function LoginForm({type, method}: loginFormProps) {
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordType, setPaswordType] = useState<"password" | "text">("password");
  
  const onAction = () => {
    method(email, password)
  }

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
      <div className="flex gap-3 w-full flex-col">
        <input className="px-6 py-3 border-solid border-2 border-gray-600 rounded w-full h-12" onChange={onEmailChange} value={email} placeholder="Enter Email" type="email"/>
        <div className="relative">
          <input className="px-6 py-3 border-solid border-2 border-gray-600 rounded w-full h-12" onChange={onPasswordChange} value={password} placeholder="Password" type={passwordType}/>
          <span className="absolute end-9 top-1/4 cursor-pointer" onClick={showHidePassword}>{passwordType === "password" ? "Show" : "Hide"}</span>
        </div>
        <Button clickHandler={onAction} className="w-full" color='green-300'>{type}</Button>
      </div>
    </>
  )
}