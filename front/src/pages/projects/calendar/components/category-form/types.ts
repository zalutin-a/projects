import { SyntheticEvent, } from "react";
import { CalendarCategory, setFunction } from "src/shared/index";

export interface CategoryFormProps {
  setSelected?: setFunction<CalendarCategory[]>,
  selected?: CalendarCategory[];
  isEditMode?: boolean;
  className?: string;
}
