import { cloneElement } from "react";

import {  MenuItemsProps } from "./types";


export function MenuItems({config, itemComponent, itemWithChildren, dropdownPosition}: MenuItemsProps) {
  return (
    <>
      {config.map(item => {
        return item.children
        ? cloneElement(
          itemWithChildren,
          {
            key: item.path,
            positionType: dropdownPosition,
            config: item,
          }
        )
        : cloneElement(itemComponent, {
          key: item.path,
          config: item,
        })
      })}
    </>
  )
}
