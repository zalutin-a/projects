import { forwardRef } from "react";
import { Icon } from "../../index";
import { DropdownInputProps } from "../types";

export const DropdownInput = forwardRef<HTMLInputElement, DropdownInputProps<any>>(function DropdownInput(props, ref) {
  const {selectedVlues, onClick, children, isOpen, className  = "", placeholder = 'Select ...', width} = props;
  return (
    <>
    <div style={{width}} ref={ref} className={`${className}  bg-gray-300 relative flex justify-between`} onClick={onClick}>
      <input placeholder={placeholder} className="dark:text-zinc-600 px-3 w-full box-border cursor-pointer bg-transparent" type='text' readOnly value={selectedVlues.join(', ')}
      />
      <Icon className={`${isOpen ? "rotate-180" : ""} transition-transform`} type='arrowDown'></Icon>
      {children}
    </div>
    </>
  )
});
