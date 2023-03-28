import { PageCountParams } from "src/shared/index";

export interface PaginationProps {
  onChange: (config: PageCountParams) => void;
  calssName?: string;
  pagesCount: number;
  currentPage: number;
  currentCountPerPage: number;
}
