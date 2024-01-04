import { CalendarCategoryModel, CalendarPageModel, months } from "src/shared/index";

export interface PagesState {
  categories: CalendarCategoryModel[];
  pages: CalendarPageModel[];
  month: months;
  year: number;
  id: string;
}
