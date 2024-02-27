import { CalendarStatementModel, Categories, PagesCount } from "src/shared/index";

export interface StatementsStore extends PagesCount, Categories {
  statements: CalendarStatementModel[];
  statementsCount: number;
}
