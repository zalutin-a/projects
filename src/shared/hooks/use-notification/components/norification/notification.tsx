import { useEffect, useState } from "react";
import dompurify from 'dompurify';
import { Button, buttonColor, Icon, iconColor, iconType } from "src/shared/index";
import { NotificationProps, notificationColors } from "./types";

const NOTIFICATION_COLORS: notificationColors = {
  Error: 'red',
  Info: 'cyan',
  Success: 'lime',
  Warning: 'orange',
}

export function NotificationComponent({type, message, close, action, onClose}: NotificationProps) {
  const color = NOTIFICATION_COLORS[type];
  const [didMount, setDidMount ] = useState(false)

  const onNotificationClose = () => {
    !onClose || onClose();
    close();
  }

  const onAction = () => {
    !action.onAction || action.onAction();
    onNotificationClose();
  }

  useEffect(() => {
    setDidMount(true)
  },[])
  return (
    <>
      <div className={`notification notification_${type?.toLowerCase()} ${didMount ? 'translate-y-[45px]': ''} transition-all p-3 w-96 grid grid-cols-[1fr_4fr_1fr] border-solid drop-shadow-md border-l-4`}>
        <Icon className="justify-self-center" type={type?.toLowerCase() as iconType} size={6} color={`${color}-600` as iconColor}></Icon>
        <div className="flex flex-col ml-2">
          <h4>{type}</h4>
          <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(message)}}></div> 
          {action ? <Button className="text-app-gray-800 mt-4" color={`${color}-600` as buttonColor} clickHandler={onAction}>{action.name}</Button> : null}
        </div>
        <Icon onClick={onNotificationClose} className="justify-self-center" type='cross' size={6}></Icon>
      </div>
    </>
  )
}