import { forwardRef } from "react";
import { DropdownInputProps, Icon } from "../../index";


export const ItemsPerPageInputComponent = forwardRef<HTMLInputElement, DropdownInputProps<any>>(function ItemsPerPageInputComponent(props, ref) {
  const {selectedVlues, onClick, children, isOpen, className  = "", width} = props;
  return (
    <>
      <div style={{width}} ref={ref} className={`${className}  bg-gray-300 relative flex justify-between`} onClick={onClick}>
        <input className="px-3 w-full box-border cursor-pointer bg-transparent" type='text' readOnly value={"Show: " + selectedVlues.join(', ')}
        />
        <Icon className={`${isOpen ? "rotate-180" : ""} transition-transform`} type='arrowDown'></Icon>
        {children}
      </div>
    </>
  )
});
