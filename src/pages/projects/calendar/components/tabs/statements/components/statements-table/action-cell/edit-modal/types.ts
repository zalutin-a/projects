import { CalendarStatementModel } from "src/shared/index";

export interface EditModalProps {
  closeModal?: () => void;
  statement?: CalendarStatementModel;
  isNewMode?: boolean;
}
