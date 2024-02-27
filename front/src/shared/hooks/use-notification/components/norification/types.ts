import { AppNotification, notificationType } from "../../types"

export interface NotificationProps extends AppNotification {
  close: () => void
}

export type notificationColors = {
  [key in notificationType]: string;
};