import { Children, ReactElement, useRef, cloneElement } from "react";

import { NavigationItem, useClickHandler } from "src/shared/index";
import { MenuItems } from "./menu-items/menu-items";
import { DropdownMenuProps } from "./types";

export function DropdownMenu({
  children,
  config,
  positionType,
  itemWithChildren,
  itemComponent = <NavigationItem config={null}></NavigationItem>
}: DropdownMenuProps) {
  const itemRef = useRef(null);
  const listRef = useRef(null);
  const dropdown = 
    <DropdownMenu config={null} positionType={null} itemWithChildren={itemWithChildren}>
        {itemWithChildren}
    </DropdownMenu>;

  const [ openState, updateOpenState ] = useClickHandler((e) => {
    const target = e.target as HTMLElement
    const closestDropDown = target.closest('.dropdown-trigger');
    const closestDropdownList = target.closest('.dropdown-list');
    const isClickOnChild = itemRef.current?.contains?.(target);
    const isClickOnDropdown = target?.classList?.contains?.('dropdown-trigger') || closestDropdownList?.contains(closestDropDown);
    const isCurrentHandlerOnClickedDropdown = target === itemRef.current || closestDropDown === itemRef.current;

    if (!isClickOnChild) { //when click on another dropdown should close opened dropdown on the same level
      return true;
    }
    if (isClickOnDropdown) {
      if (isCurrentHandlerOnClickedDropdown) { //when click on opened dropdown should close it
        return true;
      }
      return false; // keep opened dropdown that upper in tree
    }
    return true; //if click not on a dropdown should close all dropdowns
  });

  const menuPosition = {
    top: positionType === 'right' ? 0 : itemRef.current?.clientHeight,
    left: positionType === 'right' ? itemRef.current?.clientWidth : 0,
  }

  const list = () => {
    return (
      openState
        ? <ul style={menuPosition} ref={listRef} className={`dropdown-list flex text-left w-max min-w-full flex-col absolute`}>
            <MenuItems itemComponent={itemComponent} itemWithChildren={dropdown} dropdownPosition="right" config={config.children}></MenuItems>
          </ul>
        : <></>
    )
  }

  const value = Children.map(children as ReactElement, (child, i) => {
    return cloneElement(
      child,
      {
        className: (child?.props?.className ?? '') + ' dropdown-trigger relative ' + `dropdown-trigger_${openState ? 'open' : 'close'}`,
        ref: itemRef,
        config: config,
        onClick: updateOpenState,
        children: list(),
        isOpen: openState,
      }
    )
  })

  return (
    <>
      { value }
    </>
  )
}