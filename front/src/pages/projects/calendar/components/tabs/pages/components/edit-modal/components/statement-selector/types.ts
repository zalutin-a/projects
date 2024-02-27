import { AppError, CalendarPageModel, CalendarStatementModel } from "src/shared/index"


export type StatementSelectorProps = {
  statements: CalendarStatementModel[];
  isCategorySelected: boolean;
  setEditMode: (state: boolean) => void;
  page: CalendarPageModel;
  setError: (error: AppError) => void;
  error: AppError;
  setPage: (page: CalendarPageModel) => void;
}
