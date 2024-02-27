import { CalendarPageModel } from "src/shared/index";

export type pageModalProps = {
  page: CalendarPageModel;
  closeModal?: () => void;
}