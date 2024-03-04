export interface NavigationItemType {
  name?: string;
  config?: any;
  path?: string;
  children: NavigationItemType[] | null;
}

export interface NavigationProps {
  config: NavigationItemType[];
}
