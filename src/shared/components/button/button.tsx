import { ButtonBase } from "../index";
import { ButtonProps } from "./types";

export function Button({color='gray-600', className, rounded=true, clickHandler, children}: ButtonProps) {
  return (
    <ButtonBase clickHandler={clickHandler}>
      <div className={`${className ?? ""} flex px-6 py-4 font-bold ${rounded ? 'rounded' : ''} items-center btn-${color}`}>
        {children}
      </div>
    </ButtonBase>
  )
}
