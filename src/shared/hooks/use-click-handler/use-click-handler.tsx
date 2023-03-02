import { useEffect } from "react";
import { SyntheticEvent } from "react";
import { useRef } from "react";
import { useState } from "react";


export function useClickHandler(shouldClose: (e: any) => boolean): [boolean, (e: SyntheticEvent) => void] {
  const [isOpenState, setOpenState ] = useState(false);
  const isSameEvent = useRef(false); //to avoide using stopPropagation (case when click on element with clickListener, react event dispatch firstly and if use stopPropagation windowListener will not execute)
  const isTargetInTree = useRef(false);

  const clickHandler = (e: MouseEvent) => {
    if (!isSameEvent.current) {
      setOpenState((isOpen) => {
        //on same level
        if(shouldClose(e)) {
          window.removeEventListener("click", clickHandler);
          return false;
        }
        return isOpen;
      });
    }
    isSameEvent.current = false;
  }

  const updateOpenState = (e: SyntheticEvent) => {
    if (!isOpenState) {
      isSameEvent.current = true;
      window.addEventListener("click", clickHandler);
      // e.stopPropagation();
      setOpenState(true);
      //closeSiblingOnSameLevel()
    } else {
      shouldClose(e)
      // setOpenState((isOpen) => {
      //   //on same level
      //   // if(shouldClose(e)) {
      //   //   window.removeEventListener("click", clickHandler);
      //   //   return false;
      //   // }
      //   return !shouldClose(e);
      // });
      //hasOpenedChildren = true
      //clickOnChild = true
      // if(!isTargetInTree.current) {
      //   setOpenState(false)
      // } 
      // isTargetInTree.current = true; //clickonchild
      // e.stopPropagation();
      
      // setOpenState(false);
    }
  }
  useEffect(() => () => window.removeEventListener("click", clickHandler), []);
  return [isOpenState, updateOpenState];
}