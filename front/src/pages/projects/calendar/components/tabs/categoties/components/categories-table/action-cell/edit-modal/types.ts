import { CalendarCategoryModel } from "src/shared/index";

export interface EditModalProps {
  closeModal?: () => void;
  category?: CalendarCategoryModel;
  isNewMode?: boolean;
}
