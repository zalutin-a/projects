import { useContext, useState } from "react";
import { AppContext } from "src/App";
import { Icon, ClickPopover, ActionsList } from "src/shared/index";
import { EditCommentForm } from "../index";
import { commentItemProps } from "./types";

export function CommentItem({onAction, comments, comment, index}: commentItemProps) {
  const { notificationService } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);

  const getUserAvatar = () => {
    //TODO : implement after userServise implementation
    return null
  }

  const onDelete = () => {
    if (comment) {
      notificationService.show({
        type: 'Warning',
        message: "You are trying to delete this comment. This action cannot be undone. Click Delete to continue.",
        action: {
          name: "Delete",
          onAction: () => onAction({type: 'delete', payload: comment}),
        }
      });
    }
  }

  const onEdit = () => {
    setEditMode(true)
  }

  const onEditedCommentSave = (value: string) => {
    if(!value) {
      setEditMode(false);
      return
    }
    onAction({type: 'update', payload: {...comment, value}})
      .then(() => setEditMode(false));
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
          {editMode 
            ? <EditCommentForm comment={comment.value} onSave={onEditedCommentSave}></EditCommentForm>
            : <div className="py-2 px-3">{comment.value}</div>
          }
      </div>
    </>
  )
}
