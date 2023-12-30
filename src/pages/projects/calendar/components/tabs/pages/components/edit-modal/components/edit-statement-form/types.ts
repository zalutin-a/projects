import { CalendarPageModel, errors } from "src/shared/index";

export type editStatementFormProps = {
  page: CalendarPageModel;
  setEditMode: (state: boolean) => void;
  editMode: boolean;
  setError: (error: errors) => void;
  error: errors;
  setPage: (page: CalendarPageModel) => void;
}
