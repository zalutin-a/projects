import { ButtonBase } from "../index";
import { ButtonProps } from "./types";

export function Button({color='gray-600', className, rounded=true, clickHandler, children}: ButtonProps) {
  return (
    <ButtonBase clickHandler={clickHandler}>
      <div className={`${className ?? ""} flex px-4 py-2 font-bold ${rounded ? 'rounded' : ''} items-center btn-${color}`}>
        {children}
      </div>
    </ButtonBase>
  )
}
