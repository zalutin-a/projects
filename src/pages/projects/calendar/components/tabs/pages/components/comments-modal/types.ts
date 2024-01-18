import { CalendarPageModel, Comment } from "src/shared/index";

export type commentsModalProps = {
  page: CalendarPageModel;
  closeModal?: () => void;
  index: number;
}

export type updateCommentsFunction = (comments: Comment[], onSuccess?: () => void) => void
