import { Dispatch, SetStateAction } from "react";
import { CalendarPageModel, errors } from "src/shared/index";

export type editPromptFormProps = {
  page: CalendarPageModel;
  setEditMode: (state: boolean) => void// Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  setError: (error: errors) => void;
  error: errors;
  setPage: (page: CalendarPageModel) => void;
}
