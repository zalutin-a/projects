import { CalendarCategoryModel, CalendarStatementModel } from "src/shared/index";

export interface CalendarDataSlice {
  statements: CalendarStatementModel[];
  categories: CalendarCategoryModel[];
}