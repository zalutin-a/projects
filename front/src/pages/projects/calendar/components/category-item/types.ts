import { CalendarCategory, CalendarCategoryModel, State } from "src/shared/index";

export interface CategoryItemProps {
  clickHandler?: (id:CalendarCategory) => void;
  removeHandler?: (id:CalendarCategory) => void;
  className?: string;
  isEditMode?: boolean;
  active?: boolean;
  category: CalendarCategoryModel;
}
