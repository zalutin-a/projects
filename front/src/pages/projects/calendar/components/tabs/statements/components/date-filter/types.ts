import { Action } from "src/shared/index";
import { calendarDateFilter } from "../../types";
import { StatementsState } from "../../state";

export interface DateFilterProps {
  onFilterChange: (selected: Action<keyof StatementsState>) => void;
  selected: calendarDateFilter;
  className?: string;
}