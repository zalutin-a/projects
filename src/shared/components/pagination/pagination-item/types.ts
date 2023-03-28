export interface PaginationItemProps {
  page: number;
  onClick: (page: number) => void;
  isActive: boolean;
}
