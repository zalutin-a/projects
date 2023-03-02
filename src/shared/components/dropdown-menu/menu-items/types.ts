import { ReactElement } from "react";
import { DropdownMenuPositions, NavigationProps } from "src/shared/index";


export interface MenuItemsProps extends NavigationProps {
  itemComponent: ReactElement;
  itemWithChildren: ReactElement;
  dropdownPosition: DropdownMenuPositions,
}