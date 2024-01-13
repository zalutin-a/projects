import { Icon, ClickPopover, ActionsList } from "src/shared/index";
import { commentItemProps } from "./types";

export function CommentItem({comment}: commentItemProps) {
  const getUserAvatar = () => {
    //TODO : implement after userServise implementation
    return null
  }

  const onDelete = () => {
    //TODO: to be implemented
    console.log('delete')
  }

  const onEdit = () => {
    //TODO: to be implemented
    console.log('edit')
  }

  return (
    <>
      <div className="py-3">
        <div className="flex justify-between py-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9">
              <img className="rounded-full object-cover w-full h-full" src={getUserAvatar() || "/images/blank-image.jpg"} alt="user avatar" />
            </div>
            <div className="text-sm">{`${comment.author.name} ${comment.author.surname}`}</div>
            <div className="bg-gray-400 rounded-full w-1 h-1"></div>
            {/* TODO: use lib to work with date to show date in nice format (show it like 5min ago , 55min ago, 1h35min ago, 1day ago ...) */}
            <div className="text-xs">{new Date(comment.date).toDateString()}</div> 
          </div>
          <div className="flex items-center">
            <ClickPopover className="flex" rendredComponent={<ActionsList onDelete={onDelete} onEdit={onEdit}></ActionsList>}>
              <Icon type='selectAction' size={4}></Icon>
            </ClickPopover>
          </div>
        </div>
        <div className="py-2 px-3">{comment.value}</div>
      </div>
    </>
  )
}
