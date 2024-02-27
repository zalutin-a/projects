import { IdValue } from "src/shared/index";
import { CalendarCategory } from "./category";

export type CalendarStatementShortModel = IdValue

export interface CalendarStatementModel extends IdValue {
  categories: CalendarCategory[];
  date: string;
  imgSrc: string;
}

export interface CalendarStatements {
  statements: CalendarStatementModel[];
  pagesCount: number;
  statementsCount: number;
}