export interface NavigationItemType {
  name?: string;
  config?: any;
  path?: string;
  children: NavigationItemType[] | null;
}

export type navigationConfig = { config: NavigationItemType[] };

export interface NavigationProps {
  config: NavigationItemType[];
}