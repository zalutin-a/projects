import { AppNotification, ServerErrors } from "../index";

export interface ServerError {
  code: ServerErrors;
  payload: AppNotification;
}
