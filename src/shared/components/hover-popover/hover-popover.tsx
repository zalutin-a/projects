import { useRef, useState } from "react";

import { PopoverBase } from "../index";
import { HoverPopoverProps } from "./types";


export function HoverPopover({rendredComponent, children, gap = 10}: HoverPopoverProps) {
  const [visible, setVisible] = useState(false);
  const container = useRef(null);

  const onMouseEnter = () => {
    setVisible(true)
  }

  const onMouseLeave = () => {
    setVisible(false)
  }

  const getPopup = () => {
    return visible ? <PopoverBase gap={gap} target={container} rendredComponent={rendredComponent}></PopoverBase> : <></>
  }

  return (
    <>  
      <div ref={container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
      {getPopup()}
    </>
  )
}