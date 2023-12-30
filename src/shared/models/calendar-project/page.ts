import { IdValue } from "src/shared/index";

export interface CalendarPageModel {
  id: string,
  date: number,
  month: number,
  year: number,
  day: number;
  statement: IdValue,
  img: string,
  comment: string,
  holiday: string,
}

export interface CalendarPages {
  pages: CalendarPageModel[];
}
