import { useContext } from "react";
import { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CalendarContext, DataService } from "src/pages/projects/index";
import { Button, CalendarCategory, CloseButton, useDataService } from "src/shared/index";
import { commentsModalProps } from "./types";

export function CommentsModal({page, closeModal}: commentsModalProps) {
  const [comment, setComment] = useState('')
  // const { dataService, actionService, } = useContext(CalendarContext);

  const onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const onConfirm = () => {
    // actionService.updateCategory(
    //   {},
    //   {
    //     onSuccess: () => {
    //       dataService.reloadData();
    //       closeModal();
    //     }
    //   }
    // );
  }

  const onCancel = () => {
    closeModal()
  }

  return (
    <>
      <div className="flex flex-col p-6 max-w-[640px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
        <div className="flex justify-between">
          <h3>Edit Page</h3>
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
          <Button color='gray-300' clickHandler={onCancel}>Cancel</Button>
          <Button color='blue-400' clickHandler={onConfirm}>Save</Button>
        </div>
      </div>
    </>
  )
}