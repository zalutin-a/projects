import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import { PopoverBaseProps } from "./types";


export function PopoverBase({rendredComponent, target, gap, outerGap = 10 }: PopoverBaseProps) {
  const [containerHeight, setContainerHeight] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const container = useRef(null);
  const targetPosition = target.current?.getBoundingClientRect();

  //TODO: change it
  const viewportWidth = document.documentElement.clientWidth;
  const scrollbarWidth = window.innerWidth - viewportWidth;
  const widthWithoutScrollbar = viewportWidth - scrollbarWidth;

  useEffect(() => {
    setContainerHeight(container.current?.clientHeight)
    setContainerWidth(container.current?.clientWidth)
  },[]);
  
  const getX = () => {
    if (!containerWidth) {  //to avoid of posibile apearing of horisontal scroll bar
      return 0
    }
    const centerPosition = targetPosition.x + (target.current?.clientWidth / 2) - (containerWidth / 2);

    switch(true) {
      case window.matchMedia('(max-width: 768px)').matches:   //md in tailwind
        return (widthWithoutScrollbar - containerWidth) / 2;
      case centerPosition < 0:
        return outerGap;
      case (centerPosition + containerWidth) > widthWithoutScrollbar:
        return widthWithoutScrollbar - containerWidth - outerGap;
      default:
        return centerPosition;
    }
  }

  const getY = () => {
    if (!containerHeight) {
      return 0
    }
    const abovePosition = window.scrollY + targetPosition.y - gap - containerHeight;

    if (abovePosition < window.scrollY + outerGap) {
      return window.scrollY + targetPosition.y + target.current?.clientHeight + gap;
    }
    return abovePosition;
  }

  const containerPosition = {  
    top: getY(),
    left: getX(),
    visibility: !containerHeight ? "hidden" : "visible" as any,
  }

  const component = () => {
      return (
        <>
          <div ref={container} style={containerPosition} className='z-50 absolute'>
            {rendredComponent}
          </div>
        </>
      )
  }
  
  const root = document.getElementById('app')
  return ReactDOM.createPortal(
    component(),
    root
  );
}
