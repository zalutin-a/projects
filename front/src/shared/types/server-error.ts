import { AppNotification, ServerErrors } from "../index";

export interface ServerError {
  code: ServerErrors;
  payload: AppNotification;
}

export interface ErrorReason extends Error {
  cause: ServerError;
}
