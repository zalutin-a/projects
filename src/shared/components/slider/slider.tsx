import { ReactElement, Children, cloneElement, useState, useRef } from "react";
import { Icon } from "../index";
import { SliderProps } from "./types";


export function Slider({children, showArrow = false, slidingOffset = 1}: SliderProps) {
  const [curentOffst, setCurrentOffset] = useState(0);
  const scrollContainer = useRef(null);
  const slidesContainer = useRef(null);
  const childRef = useRef([]);

  const getOffset = () => {
    return (childRef?.current[0]?.nextSibling?.offsetLeft - childRef?.current[0]?.offsetLeft) * slidingOffset
  }

  const onLeftClick = () => {
    const offset = getOffset();
    const scrollValue = scrollContainer.current?.scrollLeft - offset > 0 ? scrollContainer.current?.scrollLeft - offset : 0 ;
    setCurrentOffset(scrollValue);
  }

  const onRightClick = () => {
    const offset = getOffset();
    const scrollableWidth = slidesContainer.current?.scrollWidth - scrollContainer.current?.clientWidth
    const scrollValue = scrollContainer.current?.scrollLeft + offset > scrollableWidth ? scrollableWidth : scrollContainer.current?.scrollLeft + offset;
    setCurrentOffset(scrollValue);
  }

  scrollContainer.current?.scrollTo({
    left: curentOffst,
    behavior: 'smooth',
  });

  const getArrow = (type: 'Left' | 'Right') => {
    if (typeof showArrow === 'function' ? showArrow() : showArrow) {
      return (
        <Icon onClick={type === 'Left' ? onLeftClick : onRightClick} className="flex items-center" type={`arrow${type}`}></Icon>
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className="flex items-center justify-between w-full ">
          {getArrow('Left')}
        <div ref={scrollContainer} className="scrollConteiner flex w-11/12 overflow-x-scroll">
          <div ref={slidesContainer} className="flex">
            {
              Children.map(children as ReactElement, (child, i) => {
                return cloneElement(child, {
                  className: child.props.className + ' slide',
                  ref: e => childRef.current[i] = e,
                  onClick: () => { childRef.current[i].scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"}) } // change on polyfill for using in Safari https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#browser_compatibility
                })
              })
            }
          </div>
        </div>
          {getArrow('Right')}
      </div>
    </>
  )
}