import { CalendarCategoryModel, CalendarPageModel } from "src/shared/index";

export interface PagesStore {
  categories: CalendarCategoryModel[];
  pages: CalendarPageModel[];
}
