import { Action, CalendarPageModel, Comment } from "src/shared/index";

export type commentsModalProps = {
  page: CalendarPageModel;
  closeModal?: () => void;
  index: number;
}

export type commentActionFunction = (action: Action<'add' | 'update' | 'delete',Comment>) => Promise<any>
