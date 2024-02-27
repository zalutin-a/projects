import { Icon } from "../../index";
import { actionListItemProps } from "./types";

export function ActionsListItem({onClick, type}: actionListItemProps) {
  return (
    <>
      <div onClick={onClick} className="flex gap-2 px-3 py-2 items-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
        <Icon size={5} type={type}></Icon>
        <span className="capitalize text-xs">{type}</span>
      </div>
    </>
  )
}
