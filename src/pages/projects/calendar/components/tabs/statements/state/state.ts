import { PaginationParams } from "src/shared/index";

export interface StatementsState extends PaginationParams {
  date: number;
  category: number[];
}
