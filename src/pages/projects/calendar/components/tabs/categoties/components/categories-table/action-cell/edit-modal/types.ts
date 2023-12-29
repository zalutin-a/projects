import { Dispatch } from "react";
import { SetStateAction } from "react";
import { CalendarCategoryModel, CalendarPromtModel } from "src/shared/index";

export interface EditModalProps {
  closeModal?: () => void;
  category?: CalendarCategoryModel;
  isNewMode?: boolean;
}
