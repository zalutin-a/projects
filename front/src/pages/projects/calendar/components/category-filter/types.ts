import { CalendarCategory, Action } from "src/shared/index";
import { StatementsState } from "../index";

export interface CategoryFilterProps {
  onFilterChange: (selected: Action<keyof StatementsState>) => void;
  selected: CalendarCategory[];
  className?: string;
}
