import { SyntheticEvent, useContext, useState } from "react";
import { AppContext } from "src/App";
import { ClientErrors, Hint, HoverPopover, Icon, NOTIFICATIONS_MAP } from "src/shared/index";
import { editCommentFormProps } from "./types";

export function EditCommentForm({comment, onSave}: editCommentFormProps) {
  const { theme, notificationService } = useContext(AppContext);
  const [editedComment, setEditedComment] = useState(comment);

  const save = () => {
    if(!editedComment) {
      notificationService.show(NOTIFICATIONS_MAP[ClientErrors.commetCantBeEmpty]);
      return
    }
    onSave(editedComment)
  }

  const onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.currentTarget.value)
  }

  return (
    <>
      <div>
        <div className="mt-1">
          <textarea placeholder="add comment" rows={3} className="w-full min-w-[400px] dark:bg-app-dark py-1 px-3" onChange={onChange} value={editedComment}></textarea>
        </div>
        <div className='flex flex-row-reverse'>
          <HoverPopover rendredComponent={<Hint message="Save changes"></Hint>}>
            <Icon onClick={save} type='check' size={7} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
          <HoverPopover rendredComponent={<Hint message="Revert changes"></Hint>}>
            <Icon onClick={() => onSave('')} type='cross' size={7} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
        </div>
      </div>
    </>
  )
}