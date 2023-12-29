import { AppNotification, errors } from "../index";

export interface ServerError {
  code: errors;
  payload: AppNotification;
}