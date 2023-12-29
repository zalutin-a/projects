import { Dispatch } from "react";
import { SetStateAction } from "react";
import { CalendarPromtModel } from "src/shared/index";

export interface EditModalProps {
  closeModal?: () => void;
  prompt?: CalendarPromtModel;
  isNewMode?: boolean;
}

export enum editPromptError {
  'date' = 1,
  'image',
}