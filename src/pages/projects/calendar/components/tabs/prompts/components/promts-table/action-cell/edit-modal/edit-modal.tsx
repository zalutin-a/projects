import { useContext } from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { AppContext } from "src/App";
import { CalendarContext, CategoryForm } from "src/pages/projects/index";
import { Button, CloseButton} from "src/shared/index";
import { EditModalProps, editPromptError } from "./types";


export function EditModal({prompt, closeModal, isNewMode = false}: EditModalProps) {
  const {notificationService} = useContext(AppContext);
  const [error, setError] = useState<editPromptError>(null);
  const [editedPropmpt, setEditedPrompt] = useState(isNewMode ? '' : prompt.promt);
  const [editedDate, setEditedDate] = useState(isNewMode ? '' : prompt.date ?? '');
  const [editedImgLink, setEditedImgLink] = useState(isNewMode ? '' : prompt.imgSrc ?? '');
  const [editedCategories, setEditedCategories] = useState(isNewMode ? [] : prompt.categories);
  const { dataService, actionService, } = useContext(CalendarContext);

  const onPromptChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setEditedPrompt(e.currentTarget.value);
  }
  const onDateChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedDate(e.currentTarget.value);
  }
  const onImgLinkChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedImgLink(e.currentTarget.value);
  }

  const resetError = () => {
    setError(null)
  }

  const onConfirm = () => {
    const method = isNewMode ? actionService.addPrompt.bind(actionService) : actionService.updatePrompt.bind(actionService);
    method(
      {
        ...(isNewMode ? {} : {id: prompt.id} ),
        promt: editedPropmpt,
        categories: editedCategories,
        date: editedDate,
        imgSrc: editedImgLink,
      },
      {
        onSuccess: () => {
          dataService.reloadData();
          closeModal();
        },
        onError: (e: Error) => {
          setError(+e.message as editPromptError);
          notificationService.show({type: 'Error', onClose: () => setError(null), message: `You trying to assign ${editPromptError[+e.message as editPromptError]} that already assigned to another prompt!`})
        },
      }
    );
  }

  const onCancel = () => {
    closeModal()
  }

  return (
    <>
      <div className="flex flex-col p-6 max-w-[640px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
        <div className="flex justify-between">
          <h3>Edit Prompt</h3>
          <CloseButton clickHandler={closeModal}></CloseButton>
        </div>
        <div className="mt-8">
          {/* {error ? <div className="flex gap-x-2 items-center text-red-400 font-bold mb-4">{`ERROR: You trying to assign ${editPromptError[error]} that already assigned to another prompt!`}<CloseButton size={5} clickHandler={resetError}></CloseButton></div> : null} */}
          <textarea placeholder="add prompt ..." rows={4} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onPromptChange} value={editedPropmpt}></textarea>
          <h4 className="mt-6">Date</h4>
          <input className={`${error === editPromptError.date ? 'outline outline-3 outline-offset-2 outline-red-400' : ''} mt-4 dark:bg-app-dark p-3`} onChange={onDateChange} value={editedDate} min="2024-01-01" max="2024-12-31" type="date"/>
          <h4 className="mt-6">Image</h4>
          <input onChange={onImgLinkChange} value={editedImgLink} className={`${error === editPromptError.image ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} mt-4 dark:bg-app-dark p-3 w-full`} type="text" placeholder="add link ..."/>
          <h4 className="mt-6">Categories</h4>
          <CategoryForm className="mt-4" isEditMode={true} setSelected={setEditedCategories} selected={editedCategories}></CategoryForm>
        </div>
        <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
          <Button color='gray-300' clickHandler={onCancel}>Cancel</Button>
          <Button color='blue-400' clickHandler={onConfirm}>Save</Button>
        </div>
      </div>
    </>
  )
}
