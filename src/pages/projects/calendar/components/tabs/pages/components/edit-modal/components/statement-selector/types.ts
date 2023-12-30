import { CalendarPageModel, CalendarStatementModel, errors } from "src/shared/index"


export type StatementSelectorProps = {
  statements: CalendarStatementModel[];
  isCategorySelected: boolean;
  setEditMode: (state: boolean) => void;
  page: CalendarPageModel;
  setError: (error: errors) => void;
  error: errors;
  setPage: (page: CalendarPageModel) => void;
}