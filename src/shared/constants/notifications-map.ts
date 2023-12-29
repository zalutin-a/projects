import { AppNotification } from "../index";
import { errors } from "./error_enum";

export type notificationMap = {
  [key in errors]?: AppNotification;
};

export const NOTIFICATIONS_MAP: notificationMap = {
  [errors.promptEditMode]: {type: 'Warning', message: "Please Save Prompt before continue!"},
}
