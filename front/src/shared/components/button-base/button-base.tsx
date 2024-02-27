import { forwardRef } from "react";
import { ButtonBaseProps } from "./types";


export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(function ButtonBase(props, ref) {
  const {clickHandler, children, className } = props;
  return (
    <>
      <button ref={ref} className={`${className ?? ''} inline-flex`} onClick={clickHandler}>
        {children}
      </button>
    </>
  )
});
