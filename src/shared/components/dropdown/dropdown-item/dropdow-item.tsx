import { cloneElement } from "react";
import { forwardRef } from "react";
import { DropdownItemProps } from "../types";

export const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps<any>>(function DropdownItem(props, ref) {
  const {value, name, onClick, selected, children} = props;
  return (
    <>
      <li className="w-full cursor-pointer" ref={ref} onClick={() => onClick(value)} >
        {children ? cloneElement(
          children,
          {
            ...children.props,
            name,
            selected,
          }
        )
        : <span className={`${selected ? 'selected bg-blue-300' : 'bg-gray-300'} dark:text-zinc-600 w-full p-3 box-border inline-block`}>{name}</span>
        }
      </li>
    </>
  )
});