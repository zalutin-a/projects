import { useEffect, useState, useRef } from 'react';
import { PopoverBaseProps, popoverYPosition } from "./types";


export function PopoverBase({rendredComponent, trigger, gap = 10, outerGap = 10}: PopoverBaseProps) {
  const [popoverHeight, setPopoverHeight] = useState(null);
  const [popoverWidth, setPopoverWidth] = useState(null);
  const container = useRef(null);
  const triggerPosition = trigger.current?.getBoundingClientRect();
  const closestRelative = trigger.current?.closest('.relative')?.getBoundingClientRect();
  const widthWithoutScrollbar = document.documentElement.clientWidth;

  useEffect(() => {
    setPopoverHeight(container.current?.clientHeight);
    setPopoverWidth(container.current?.clientWidth);
  },[]);
  
  const getTopPosition = (): {top: number, y: popoverYPosition} => {
    if (!popoverHeight) {
      return {top: 0, y: 'top'}
    }

    const popoverFullHeight = popoverHeight + gap + outerGap;
    const availableSpaceAbove = triggerPosition.y;
    const availableSpaceBelow = window.innerHeight - triggerPosition.bottom;

    /** Need correction when use popover in container with overflow = auto | scroll (e.g. sliderComponent), so popover is croping
    *  acording to slider size. To fix it we need to add wrapper with position = relative around slider and this should be closest 
    *  parent with position = relative. For other cases just add position = relative to high-level popover. 
    *  Usage examples:
    *  --- for slider cases ----
    *     <div className="relative">
    *       <Slider>
    *         <ClickPopover rendredComponent={<PopoverComponent></PopoverComponent>}>
    *           <Icon type='selectAction'></Icon>
    *         </ClickPopover>
    *         <ClickPopover rendredComponent={<PopoverComponent></PopoverComponent>}>
    *           <Icon type='selectAction'></Icon>
    *         </ClickPopover>
    *       </Slider>
    *     </div>
    *  
    *   --- for other cases ----
    *     <div>
    *       <ClickPopover className="relative" rendredComponent={<PopoverComponent></PopoverComponent>}>
    *         <Icon type='selectAction'></Icon>
    *       </ClickPopover>
    *     </div>
    **/
    const correction = closestRelative?.top ? triggerPosition.top - closestRelative.top : 0;

    switch(true) {
      case popoverFullHeight < availableSpaceAbove:
        return {top: -popoverFullHeight + correction, y: 'top'}
      case popoverFullHeight < availableSpaceBelow:
        return {top: triggerPosition.height + gap + correction, y: 'bottom'}
      default:
        return {top: -((popoverHeight - triggerPosition.height) / 2) + correction, y: 'middle'};
    }
  }

  const getLeftPosition = (y: popoverYPosition) => {
    if (!popoverWidth) { //To avoid apearing of horisontal scroll bar
      return 0;
    }

    const popoverFullWidth = popoverWidth + gap + outerGap;
    const availableSpaceLeft = triggerPosition.left;
    const availableSpaceRight = widthWithoutScrollbar - triggerPosition.right;

    const correction = closestRelative?.left ? triggerPosition.left - closestRelative.left : 0

    if(y === "middle") {
      if(popoverFullWidth < availableSpaceLeft) {
        return -popoverFullWidth + correction
      }
      if(popoverFullWidth < availableSpaceRight) {
        return triggerPosition.width + gap + correction
      }
      const screenCenter = widthWithoutScrollbar / 2
      const distanceToCenter = screenCenter - triggerPosition.left
      return (distanceToCenter - popoverWidth / 2 ) + correction
    }

    const popoverOffset = (popoverWidth - triggerPosition.width) / 2
    const position = -(popoverOffset) + correction;
    
    if(popoverOffset > availableSpaceRight) {
      return position - (popoverOffset - availableSpaceRight) - outerGap
    }
    if(popoverOffset > availableSpaceLeft) {
      return position + (popoverOffset - availableSpaceLeft) + outerGap
    }

    return position;
  }

  const getPositions = () => {
    const topPosition = getTopPosition()
    const leftPosition = getLeftPosition(topPosition.y)
    return {top: topPosition.top, left: leftPosition}
  }

  const containerStyle = {  
    ...getPositions(),
    visibility: !popoverHeight ? "hidden" : "visible" as any,
  }

  return (
    <>
      <div ref={container} style={containerStyle} className='z-50 absolute'>
        {rendredComponent}
      </div>
    </>
  )
}
