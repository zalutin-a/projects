import { CalendarCategory } from "src/shared/index";
import { calendarDateFilter } from "./index";

export interface CalendarTableFilters {
  category?: CalendarCategory[];
  date?: calendarDateFilter;
}