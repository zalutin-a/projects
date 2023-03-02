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
                key: item.path || '' + Math.random(),
                positionType: dropdownPosition,
                config: item,
              }
              // itemWithChildren.props?.children,
              // cloneElement(itemWithChildren.props?.children, {...itemWithChildren.props?.children?.props, name:item.name })//,itemWithChildren.props?.children?.props?.children,<span className="spanMen">{item.name}</span>)]
            )
            : cloneElement(itemComponent, {
              key: item.path,
              config: item,
            })
          })}
    </>
  )
}