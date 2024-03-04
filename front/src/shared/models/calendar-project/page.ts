import { IdValue } from "src/shared/index";
import { Comment } from "src/shared/types/comment";

export interface CalendarPageModel {
  id: string,
  date: number,
  month: number,
  year: number,
  day: number;
  statement: IdValue,
  img: string,
  comments: Comment[],
  holiday: string,
}

export interface CalendarPages {
  pages: CalendarPageModel[];
}
