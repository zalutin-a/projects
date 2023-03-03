import { ClickPopover } from "src/shared/index";
import { StackItemPopoverComponent } from "./popover-component/popover-component";
import { StackItemPopoverProps } from "./types";

export function StackItemPopover({children, data}: StackItemPopoverProps) {
  return (
    <>
      <ClickPopover rendredComponent={<StackItemPopoverComponent data={data}></StackItemPopoverComponent>}>
        {children}
      </ClickPopover>
    </>
  )
}
