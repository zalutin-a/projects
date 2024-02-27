import { CalendarPageModel } from "src/shared/index";

export type editModalProps = {
  page: CalendarPageModel;
  closeModal?: () => void;
}