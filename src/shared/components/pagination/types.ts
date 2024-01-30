import { PagesCount, PaginationParams, Action, stateDispatch } from "src/shared/index";

export interface PaginationProps extends PagesCount {
  onChange: stateDispatch<PaginationParams>;
  className?: string;
  currentPage: number;
  currentPageSize: number;
}
