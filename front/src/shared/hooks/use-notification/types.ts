import { ReactElement, ReactHTMLElement } from 'react';
import { JsxElement } from 'typescript';

export type notificationType = 'Error' | 'Warning' | 'Success' | 'Info';

export type notificatonAction = {
  name: string,
  onAction?: () => void,
}

export type notificationMessage =  string | ReactElement;

export interface AppNotification {
  type: notificationType,
  message: notificationMessage,
  action?: notificatonAction,
  onClose?: () => void,
}

export interface NotificationService {
  show: (notificationConfig: AppNotification) => void;
}
