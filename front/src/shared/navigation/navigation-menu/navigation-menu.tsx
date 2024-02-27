import { DropdownMenu, NavigationItemDropdown, NavigationMenuIcon } from "src/shared/index";
import { FlatMenu } from "./flat-menu/flat-menu";
import { NavigationMenuProps } from "./types";

export function NavigationMenu({config}: NavigationMenuProps) {
  const dropdownItem = <NavigationItemDropdown className={null} config={null} onClick={null} children={null}></NavigationItemDropdown>;
  return (
    <>
      <div className="hidden md:block h-full cursor-pointer">
        <FlatMenu config={config}></FlatMenu>
      </div>
      <div className="md:hidden block h-full cursor-pointer">
        <DropdownMenu config={{children: config}} positionType='down' itemWithChildren={dropdownItem}>
          <NavigationMenuIcon className={null} config={null} onClick={null} children={null}></NavigationMenuIcon>
        </DropdownMenu>
      </div>
    </>
  )
}
