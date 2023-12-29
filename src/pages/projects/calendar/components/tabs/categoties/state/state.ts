import { CalendarCategoryModel, Filter, PageCountParams } from "src/shared/index";

export interface CategoriesState extends PageCountParams, Filter {
  categories: CalendarCategoryModel[];
}
