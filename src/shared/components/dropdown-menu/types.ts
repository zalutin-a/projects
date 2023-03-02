import { ReactElement } from "react";
import { ForwardRefExoticComponent } from "react";
import { ForwardedRef } from "react";
import { LegacyRef } from "react";
import { SyntheticEvent } from "react";
import { ReactNode } from "react";
import { navigationConfig, NavigationItemType } from "src/shared/index";

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
  children: ReactNode | ForwardRefExoticComponent<DropdownItemWithChildProps>; // its have to be just one <li></li> element, without any children inside. its posible to add any styles for this li and this styles will be applied for every dropdown item
  config: NavigationItemType;
  positionType: DropdownMenuPositions,
  itemComponent?: ReactElement;
  itemWithChildren?: DropdownItemWithChildren;
  addNameToFirstChild?: boolean;
}
