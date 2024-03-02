import { NavLink, useLocation } from "react-router-dom";
import { Icon, Loader } from "src/shared/index";
import { LoginForm } from "../index";
import { loginStageProps } from "./types";

export function LoginStage({}: loginStageProps) {

  const type = useLocation().pathname === '/login' ? 'Log in' : 'Sign up';

  return (
    <div className="p-14 w-[480px] rounded-2xl bg-white">
      <div className="flex w-full gap-6 items-center flex-col">
        <h1>{type}</h1>
        <p className="max-w-52 text-center">Hey, Enter your details to {type === 'Log in' ? 'login to' : 'create'} your account</p>
        {/* <Loader active={userService.updatingState !== 'done'}> */}
          <LoginForm type={type}></LoginForm>
        {/* </Loader> */}
        <span>Or {type} with</span>
        <div className="flex w-full justify-around">
          <button className="inline-flex gap-2 items-center justify-center px-4 py-2 border-solid border-2 border-gray-600 rounded-full font-bold text-gray-800">
            <Icon type="google" size={5} color="gray-800"></Icon>
            <span>Google</span>
          </button>
          <button className="inline-flex gap-2 items-center justify-center px-4 py-2 border-solid border-2 border-gray-600 rounded-full font-bold text-gray-800">
            <Icon type="facebook" size={5} color="gray-800"></Icon>
            <span>Facebook</span>
          </button>
          <button className="inline-flex gap-2 items-center justify-center px-4 py-2 border-solid border-2 border-gray-600 rounded-full font-bold text-gray-800">
            <Icon type="gitHub" size={5} color="gray-800"></Icon>
            <span>GitHub</span>
          </button>
        </div>
        <p>{type === 'Log in' ? 'Don’t' : 'Already'} have an account? <NavLink className="font-bold" to={`/${type === 'Log in' ? 'signup' : 'login'}`}>{type === 'Log in' ? 'Register Now' : 'Log in'}</NavLink></p>
      </div>
    </div>
  )
}