import { SyntheticEvent } from "react";
import { useEffect, useRef, useState, useMemo } from "react"
import { useClickHandler } from "src/shared/index";
import { NavigationItemType } from "../types"
import { SubMenuItem } from "./sub-menu-item/sub-menu-item";

export const SubMenu = ({ config }: {config: NavigationItemType}) => {
  const [openState, updateOpenState ] = useClickHandler(() => true);
  // const [openState, setOpenState ] = useState(false);
  // // const [openState, clickHandler] = useCkickHandler()
  // const clickHandler = useMemo(() => () => {
  //   setOpenState(false);
  //   window.removeEventListener("click", clickHandler);
  // },[]);

  // const updateOpenState = (e: SyntheticEvent) => {
  //   if (!openState) {
  //     e.stopPropagation()
  //     window.addEventListener("click", clickHandler); //(e) => { if (f(e)) {clickHandler()} }
  //     setOpenState(true);
  //   } 
  // }

const a = (event: SyntheticEvent, isOpen: boolean) => {

}

  return (
    <>
      <li className="flex">
        <div
          onClick={updateOpenState}
          className={`cursor-pointer relative z-50 px-3 py-2`}
        >
          {config.name}
          <ul className={`${openState ? 'visible ' : 'invisible'} dark:bg-app-dark text-left bg-white top-12 left-0 w-32 flex-col absolute`}>
            {config.children?.map(item => <SubMenuItem key={item.name} config={item}></SubMenuItem>)}
          </ul>
        </div>
      </li>
    </>
  )
}