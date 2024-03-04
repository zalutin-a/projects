import { AppNotification } from "../index";
import { ClientErrors } from "./client-errors-enum";

export type notificationMap = {
  [key in ClientErrors]: AppNotification;
};

export const NOTIFICATIONS_MAP: notificationMap = {
  [ClientErrors.commetCantBeEmpty]: {type: 'Warning', message: "Comment cannot be Empty!"},
  [ClientErrors.statementEditMode]: {type: 'Warning', message: "Please Save Statement before continue!"},
  [ClientErrors.statementCantBeEmpty]: {type: 'Warning', message: "Statement cannot be Empty!"},
}
