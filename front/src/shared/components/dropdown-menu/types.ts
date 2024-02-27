import { ReactElement, ForwardRefExoticComponent, SyntheticEvent, ReactNode } from "react";
import { NavigationItemType } from "src/shared/index";

export type DropdownMenuPositions = 'down' | 'right';

export type DropdownItemWithChildren = ReturnType<ForwardRefExoticComponent<DropdownItemWithChildProps>>;

export type DropdownItemWithChildrenRef = HTMLLIElement;

export interface DropdownItemWithChildProps {
    className: string;
    config: NavigationItemType,
    onClick: (e: SyntheticEvent) => void,
    children: ReactNode,
    isOpen?: boolean,
}

export interface DropdownMenuProps {
  children: ReactNode;
  config: NavigationItemType;
  positionType: DropdownMenuPositions,
  itemComponent?: ReactElement;
  itemWithChildren?: DropdownItemWithChildren;
}
