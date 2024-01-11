import { useContext, useState, SyntheticEvent } from "react";

import { BackdropComponent, Button, CloseButton } from "src/shared/index";
import { commentsModalProps } from "./types";

export function CommentsModal({page, closeModal}: commentsModalProps) {
  const [comment, setComment] = useState('')
  // const { dataService, actionService, } = useContext(CalendarContext);

  const onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const onConfirm = () => {

  }

  const onCancel = () => {
    closeModal()
  }

  return (
    <>
      <BackdropComponent closeModal={closeModal}>
        <div className="flex flex-col my-20 p-6 max-w-[640px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
          <div className="flex justify-between">
            <h3>Comments</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
          <div className="mt-8">
            comment
          </div>
          <div className="mt-8">
            comment
          </div>
          <div className="mt-8">
            <textarea placeholder="add comment" rows={4} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onChange} value={comment}></textarea>
          </div>
          <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
            <Button color='gray-300' clickHandler={onCancel}>Close</Button>
            <Button color='blue-400' clickHandler={onConfirm}>Add comment</Button>
          </div>
        </div>
      </BackdropComponent>
    </>
  )
}