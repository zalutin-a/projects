import { useEffect, useRef, SyntheticEvent, useState } from "react";

export function useClickHandler(shouldClose: (e: any) => boolean): [boolean, (e: SyntheticEvent) => void] {
  const [isOpenState, setOpenState ] = useState(false);
  const isSameEvent = useRef(false); //to avoide using stopPropagation (case when click on element with clickListener, react event dispatch firstly and if use stopPropagation windowListener will not execute)

  const clickHandler = (e: MouseEvent) => {
    if (!isSameEvent.current) {
      setOpenState((isOpen) => {
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
      setOpenState(true);
    }
  }
  useEffect(() => () => window.removeEventListener("click", clickHandler), []);
  return [isOpenState, updateOpenState];
}
