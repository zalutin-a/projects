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
            key: item.path || '' + Math.random(), // TODO: remove MATH when finish testing(every item will has unique path)
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
