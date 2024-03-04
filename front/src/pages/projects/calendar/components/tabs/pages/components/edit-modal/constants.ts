import { createContext } from "react";
import { FormControl, FormValidationError, ServerErrors } from "src/shared";
import { editModalForm } from "./types";

export const EditModalContext = createContext<{formControl: FormControl<editModalForm>}>({formControl: null});

export const EDIT_PAGE_ERRORS: Record<string, FormValidationError<editModalForm>> = {
  [ServerErrors.usingAssignedImage]: {message: "Please chose another image.", fields: ['img']},
  // [ServerErrors.usingAssignedHoliday]: {message: "Please chose another holyday.", fieldName: ['holiday']},
  [ServerErrors.usingAssignedStatement]: {message: "Please chose another statement.", fields: ['statement']},
}
