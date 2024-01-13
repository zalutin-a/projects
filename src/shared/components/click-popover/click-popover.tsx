import { useRef } from "react";

import { useClickHandler } from "src/shared/index";
import { PopoverBase } from "../index";
import { ClockPopoverProps } from "./types";


export function ClickPopover({rendredComponent, children, className = '', gap = 10}: ClockPopoverProps) {
  const container = useRef(null);
  const [visible, clickHandler ] = useClickHandler(() => true);

  const getPopup = () => {
    return visible ? <PopoverBase gap={gap} target={container} rendredComponent={rendredComponent}></PopoverBase> : <></>
  }

  return (
    <>  
      <div className={className} ref={container} onClickCapture={clickHandler}>
        {children}
      </div>
      {getPopup()}
    </>
  )
}