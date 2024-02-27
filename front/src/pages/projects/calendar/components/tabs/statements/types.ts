import { CalendarCategory } from "src/shared/index";

export enum calendarDateFilter {
  withDate = 1,
  withoutDate,
}

export interface StatementsTableFilters {
  category?: CalendarCategory[];
  date?: calendarDateFilter;
}