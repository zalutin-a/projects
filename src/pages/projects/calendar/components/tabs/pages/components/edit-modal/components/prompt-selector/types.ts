import { Dispatch, SetStateAction } from 'react'
import { CalendarPageModel, CalendarPromptShortModel, CalendarPromtModel, errors } from "src/shared/index"


export type promptSelectorProps = {
  prompts: CalendarPromtModel[];
  isCategorySelected: boolean;
  setEditMode: (state: boolean) => void// Dispatch<SetStateAction<boolean>>;
  onSave: (prompt: CalendarPromptShortModel) => void;
  page: CalendarPageModel;
  setError: (error: errors) => void;
  error: errors;
  setPage: (page: CalendarPageModel) => void;
}