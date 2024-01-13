import { useContext, useState, SyntheticEvent } from "react";
import { AppContext } from "src/App";

import { BackdropComponent, Button, CalendarPageModel, CloseButton, ServerError } from "src/shared/index";
import { Comment, Roles, UserShort } from "src/shared/types/comment";
import { PagesContext } from "../../pages";
import { CommentItem } from "./index";
import { commentsModalProps } from "./types";

const mockUser: UserShort = {
  name: "Andrii",
  surname: "Zalutin",
  roles: [{id: Roles.admin, name: "Administrator"}],
  _id: "testId",
}

export function CommentsModal({page, closeModal}: commentsModalProps) {
  const [comment, setComment] = useState('')
  const { notificationService } = useContext(AppContext);
  const { actionService, state} = useContext(PagesContext);

  const onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const onConfirm = () => {
    if(!comment) {
      return
    }
  const newComment: Comment = {
    id: null,
    value: comment,
    author: mockUser,
    date: new Date(Date.now()) // use UTC
  }

    actionService.http.updatePage(
      {
        ...page,
        comments: [...page.comments, newComment]
      },
      {
        onSuccess: (updatedPage: CalendarPageModel) => {
          const index = state.curent.pages.findIndex(page => page.id === updatedPage.id);
          const payload = [...state.curent.pages].toSpliced(index, 1, updatedPage);
          state.dispatch({type: 'pages', payload});
          setComment('')
        },
        onError: (error: ServerError) => {
          notificationService.show(error.payload);
        }
      }
    )
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
            <textarea placeholder="add comment" rows={3} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onChange} value={comment}></textarea>
          </div>
          <div className="divide-y">
            {[...page.comments].reverse().map(comment => <CommentItem comment={comment}></CommentItem>)}
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