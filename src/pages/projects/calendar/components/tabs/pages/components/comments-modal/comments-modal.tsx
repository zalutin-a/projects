import { useContext, useState, SyntheticEvent } from "react";
import { AppContext } from "src/App";

import { BackdropComponent, Button, CalendarPageModel, ClientErrors, CloseButton, NOTIFICATIONS_MAP, ServerError } from "src/shared/index";
import { Comment, Roles, UserShort } from "src/shared/types/comment";
import { PagesContext } from "../../pages";
import { CommentItem } from "./index";
import { commentsModalProps, updateCommentsFunction } from "./types";

const mockUser: UserShort = {
  name: "Andrii",
  surname: "Zalutin",
  roles: [{id: Roles.admin, name: "Administrator"}],
  _id: "testId",
}

export function CommentsModal({page, index, closeModal}: commentsModalProps) {
  const [comment, setComment] = useState('')
  const { notificationService } = useContext(AppContext);
  const { actionService, state} = useContext(PagesContext);

  const onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const updateComments: updateCommentsFunction = (comments, onSuccess = () => {}) => { //TODO: use Promises in httpService instead of callbacks, do it before userService implementation!!!
    actionService.http.updatePage(
      {
        ...page,
        comments
      },
      {
        onSuccess: (updatedPage: CalendarPageModel) => {
          const payload = [...state.curent.pages].toSpliced(index, 1, updatedPage);
          state.dispatch({type: 'pages', payload});
          onSuccess();
        },
        onError: (error: ServerError) => {
          notificationService.show(error.payload);
        }
      }
    )
  }

  const onAddComment = () => {
    if(!comment) {
      notificationService.show(NOTIFICATIONS_MAP[ClientErrors.commetCantBeEmpty]);
      return
    }
    const newComment: Comment = {
      id: null,
      value: comment,
      author: mockUser,
      date: new Date(Date.now()) // use UTC
    }

    // TODO add method to actionService .addComment(page.id, callbacks) and use it instead
    updateComments([...page.comments, newComment], () => setComment(''))
  }

  const onCancel = () => {
    if (comment) {
      notificationService.show({
        type: 'Warning',
        message: "If you close the window changes will be lost. Click OK to continue.",
        action: {
          name: "Ok",
          onAction: closeModal,
        }
      });
    } else {
      closeModal();
    }
  }

  return (
    <>
      <BackdropComponent closeModal={closeModal}>
        <div className="flex flex-col my-20 p-6 w-[640px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
          <div className="flex justify-between">
            <h3>Comments</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
          <div className="mt-8">
            <textarea placeholder="add comment" rows={3} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onChange} value={comment}></textarea>
          </div>
          <div className="divide-y">
            {[...page.comments].map((comment,i) => <CommentItem updateComments={updateComments} comments={page.comments} index={i} comment={comment}></CommentItem>)}
          </div>
          <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
            <Button color='gray-300' clickHandler={onCancel}>Close</Button>
            <Button color='blue-400' clickHandler={onAddComment}>Add comment</Button>
          </div>
        </div>
      </BackdropComponent>
    </>
  )
}
