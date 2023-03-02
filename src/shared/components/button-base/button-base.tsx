import { ButtonBaseProps } from "./types";

export function ButtonBase({clickHandler, children}: ButtonBaseProps) {
  return (
    <>
      <button onClick={clickHandler}>
        {children}
      </button>
    </>
  )
}
