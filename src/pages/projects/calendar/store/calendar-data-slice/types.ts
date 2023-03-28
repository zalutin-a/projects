import { CalendarCategoryModel, CalendarPromtModel } from "src/shared/index";

export interface CalendarDataSlice {
  prompts: CalendarPromtModel[];
  categories: CalendarCategoryModel[];
}