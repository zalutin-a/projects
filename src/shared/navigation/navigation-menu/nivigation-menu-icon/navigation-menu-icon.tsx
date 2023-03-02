import { forwardRef } from "react"
import { Icon, DropdownItemWithChildrenRef, DropdownItemWithChildProps } from "src/shared/index";

export const NavigationMenuIcon = forwardRef<DropdownItemWithChildrenRef, DropdownItemWithChildProps>(function NavigationMenuIcon(props, ref) {
  const {className, onClick, children} = props;
  return (
  <>
    <span onClick={onClick} ref={ref} className={className + " flex items-center h-full"}>
      <Icon type='menu'></Icon>
      {children}
    </span>
  </>
)
});