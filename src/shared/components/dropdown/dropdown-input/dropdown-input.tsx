import { forwardRef } from "react";
import { Icon } from "../../index";
import { DropdownInputProps } from "../types";

export const DropdownInput = forwardRef<HTMLInputElement, DropdownInputProps<any>>(function DropdownInput(props, ref) {
  const {selectedVlues, onClick, children, isOpen, className  = "", placeholder = 'Select ...', disable = false, width} = props;
  return (
    <>
    <div
      style={{width}}
      ref={ref}
      className={`${className}  bg-gray-300 relative flex justify-between`}
      onClick={!disable ? onClick : () => {}}
      role="combobox"
      aria-labelledby="select button"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-controls="select-dropdown"
    >
      <input
        placeholder={placeholder}
        disabled={!!disable}
        className="dark:text-zinc-600  placeholder:text-zinc-500 px-3 w-full box-border cursor-pointer bg-transparent"
        type='text'
        readOnly
        value={selectedVlues.join(', ')}
      />
      <Icon className={`${isOpen ? "rotate-180" : ""} transition-transform`} type='arrowDown'></Icon>
      {children}
    </div>
    </>
  )
  // change input to select
});
