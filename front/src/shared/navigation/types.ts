import { PermissionsEnum } from "../types/permissions";

export interface NavigationItemType {
  name?: string;
  config?: any;
  path?: string;
  children: NavigationItemType[];
  neededPermisions?: PermissionsEnum[];
}

export interface NavigationProps {
  config: NavigationItemType[];
}
