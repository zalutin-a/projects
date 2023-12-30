import { CalendarStatementModel } from "src/shared/index";

export interface EditModalProps {
  closeModal?: () => void;
  statement?: CalendarStatementModel;
  isNewMode?: boolean;
}

//todo use notificTION map
export enum editStatementError {
  'date' = 1,
  'image',
}