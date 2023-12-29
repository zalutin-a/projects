import { CalendarCategory } from "src/shared/index";
import { CalendarTableFilters } from "../../types";
import { calendarDateFilter } from "../index";

export interface DateFilterProps {
  onFilterChange: (selected: Partial<CalendarTableFilters>) => void;
  selected: calendarDateFilter;
  className?: string;
}