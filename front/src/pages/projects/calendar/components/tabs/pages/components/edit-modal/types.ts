import { CalendarPageModel } from "src/shared/index";

export type editModalProps = {
  page: CalendarPageModel;
  closeModal?: () => void;
}

export interface editModalForm extends Pick<CalendarPageModel, 'img' | 'holiday'> {
  statement: string;
}
