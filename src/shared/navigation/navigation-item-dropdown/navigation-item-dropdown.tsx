import { forwardRef } from "react"
import { Icon, DropdownItemWithChildrenRef, DropdownItemWithChildProps } from "src/shared/index";

export const NavigationItemDropdown = forwardRef<DropdownItemWithChildrenRef, DropdownItemWithChildProps>(function NavigationItemDropdown(props, ref) {
  const {config, className, onClick, children, isOpen } = props;
  return (
  <>
    <li onClick={onClick} ref={ref} className={className + ""}>
      <div className={`flex content-center flex-wrap  hover:text-gray-900 dark:hover:text-white dark:bg-app-dark ${isOpen ? "dark:bg-gray-600" : ""} bg-white flex px-3 py-2 h-full w-full`}>
        <Icon type='arrowRight' className={`${ isOpen ? 'rotate-90' : ''} transition-transform`} size={5}></Icon><span className="row-item_10">{config.name}</span>
      </div>
      {children}
    </li>
  </>
)
});