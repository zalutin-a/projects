import { DropdownMenu, Icon, DropdownItemWithChildren, MenuItems, NavigationItem } from "src/shared/index";
import { NavigationItemDropdown } from "../../navigation-item-dropdown/navigation-item-dropdown";
import {  FlatMenuProps } from "./types";

export function FlatMenu({config}: FlatMenuProps) {
  const dropdownItem = <NavigationItemDropdown className={null} config={null} onClick={null} children={null}></NavigationItemDropdown>;
  const itemComponent = <NavigationItem config={null}></NavigationItem>;
  const itemWithChildren = (
    <DropdownMenu config={null} positionType='down' itemWithChildren={dropdownItem}>
      {/* <li className="hover:text-gray-900 dark:hover:text-white px-3 py-2 h-full"></li> */}
      <NavigationItemDropdown className={null} config={null} onClick={null} children={null}></NavigationItemDropdown>
    </DropdownMenu>
  );

  return (
    <>
      <ul className={'flex h-full'}>
        <MenuItems itemComponent={itemComponent} itemWithChildren={itemWithChildren} dropdownPosition="down" config={config}></MenuItems>
      </ul>
    </>
  )
}