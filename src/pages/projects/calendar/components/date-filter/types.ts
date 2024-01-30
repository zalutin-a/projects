import { Action } from "src/shared/index";
import { calendarDateFilter, StatementsState } from "../index";

export interface DateFilterProps {
  onFilterChange: (selected: Action<keyof StatementsState>) => void;
  selected: calendarDateFilter;
  className?: string;
}