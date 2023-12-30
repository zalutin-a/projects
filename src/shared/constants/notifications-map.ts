import { AppNotification } from "../index";
import { errors } from "./error_enum";

export type notificationMap = {
  [key in errors]?: AppNotification;
};

export const NOTIFICATIONS_MAP: notificationMap = {
  [errors.statementEditMode]: {type: 'Warning', message: "Please Save Statement before continue!"},
}
