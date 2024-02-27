import { useState, ReactElement } from "react";
import { AppNotification, NotificationService } from './types';
import { NotificationComponent } from './index';

export function useNotification(): [NotificationService, ReactElement] {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const show = (notification : AppNotification) => {
    setNotifications([notification,...notifications])
  }

  const close = (index: number) => {
    setNotifications(notifications.toSpliced(index,1))
  }

  const container = (
    <div className='fixed flex flex-col z-50 gap-y-4 right-8 -top-8'>
      {notifications.map((notification, index) => {
        return (
          <NotificationComponent
              key={index}
              {...notification}
              close = {() => close(index)}
          ></NotificationComponent>
        )
      })}
    </div>
  )

  return [{ show }, container];
}