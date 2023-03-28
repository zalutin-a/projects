import { CalendarCategory } from "src/shared/index";
import { CalendarTableFilters } from "../../types";

export interface CategoryFilterProps {
  onFilterChange: (selected: Partial<CalendarTableFilters>) => void;
  selected: CalendarCategory[];
  className?: string;
}