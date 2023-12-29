import { CalendarCategoryModel, CalendarPromtModel, Categories, Filter, PageCountParams } from "src/shared/index";
import { PromptsTableFilters } from "../types";

export interface PromptsState extends PageCountParams, Filter<PromptsTableFilters>, Categories {
  prompts: CalendarPromtModel[];
}