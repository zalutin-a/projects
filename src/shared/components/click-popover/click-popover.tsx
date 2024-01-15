import { useRef } from "react";
import { useClickHandler } from "src/shared/index";
import { PopoverBase } from "../index";
import { ClockPopoverProps } from "./types";


export function ClickPopover({rendredComponent, children, outerGap, gap, className = '', positionRelative = true}: ClockPopoverProps) {
  const container = useRef(null);
  const [visible, clickHandler ] = useClickHandler(() => true);

  return (
    <>  
      <div className={`${positionRelative ? 'relative' : ''} ${className}`} ref={container} onClickCapture={clickHandler}>
        {children}
        {visible ? <PopoverBase trigger={container} rendredComponent={rendredComponent} gap={gap} outerGap={outerGap}></PopoverBase> : null}
      </div>
    </>
  )
}
