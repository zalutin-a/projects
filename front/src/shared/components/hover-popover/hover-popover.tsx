import { useRef, useState } from "react";
import { PopoverBase } from "../index";
import { HoverPopoverProps } from "./types";


export function HoverPopover({rendredComponent, children, outerGap, gap = 7, className = '', positionRelative = true}: HoverPopoverProps) {
  const [visible, setVisible] = useState(false);
  const container = useRef(null);
  const timeoutId = useRef(null);

  const onMouseEnter = () => {
    timeoutId.current = setTimeout(() => {
      setVisible(true)
    }, 70)
  }

  const onMouseLeave = () => {
    clearTimeout(timeoutId.current)
    setVisible(false)
  }

  return (
    <>  
      <div className={`${positionRelative ? 'relative' : ''} ${className}`} ref={container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
        {visible ? <PopoverBase trigger={container} rendredComponent={rendredComponent} gap={gap} outerGap={outerGap}></PopoverBase> : null}
      </div>
    </>
  )
}
