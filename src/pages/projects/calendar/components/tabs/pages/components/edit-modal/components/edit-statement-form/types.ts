import { AppError, CalendarPageModel,  } from "src/shared/index";

export type editStatementFormProps = {
  page: CalendarPageModel;
  editMode: boolean;
  error: AppError;
  setPage: (page: CalendarPageModel) => void;
  setEditMode: (state: boolean) => void;
  setError: (error: AppError) => void;
}
