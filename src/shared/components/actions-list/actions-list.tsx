import { ActionsListItem } from "./index";
import { actionsListProps } from "./types";

export function ActionsList({onEdit = null, onDelete = null}: actionsListProps) {
  return (
    <>
      <div className="drop-shadow-rounded py-2 min-w-24 rounded dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500">
        {onEdit ? <ActionsListItem type='edit' onClick={onEdit}></ActionsListItem> : null}
        {onDelete ? <ActionsListItem type='delete' onClick={onDelete}></ActionsListItem> : null}
      </div>
    </>
  )
}
