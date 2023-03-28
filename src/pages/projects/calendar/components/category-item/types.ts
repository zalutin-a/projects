import { SyntheticEvent } from "react";
import { CalendarCategory } from "src/shared/index";

export interface CategoryItemProps {
  clickHandler?: (id:CalendarCategory) => void;
  removeHandler?: (id:CalendarCategory) => void;
  className?: string;
  id: CalendarCategory;
  isEditMode?: boolean;
  active?: boolean;
}
