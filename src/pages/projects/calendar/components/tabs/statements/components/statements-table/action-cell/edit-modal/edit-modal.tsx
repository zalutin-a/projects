import { useContext } from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { AppContext } from "src/App";
import { CalendarContext, CategoryForm } from "src/pages/projects/index";
import { BackdropComponent, Button, CloseButton} from "src/shared/index";
import { EditModalProps, editStatementError } from "./types";


export function EditModal({statement, closeModal, isNewMode = false}: EditModalProps) {
  const {notificationService} = useContext(AppContext);
  const [error, setError] = useState<editStatementError>(null);
  const [editedStatement, setEditedStatement] = useState(isNewMode ? '' : statement.value);
  const [editedDate, setEditedDate] = useState(isNewMode ? '' : statement.date ?? '');
  const [editedImgLink, setEditedImgLink] = useState(isNewMode ? '' : statement.imgSrc ?? '');
  const [editedCategories, setEditedCategories] = useState(isNewMode ? [] : statement.categories);
  const { dataService, actionService, } = useContext(CalendarContext);

  const onStatementsChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setEditedStatement(e.currentTarget.value);
  }
  const onDateChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedDate(e.currentTarget.value);
  }
  const onImgLinkChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedImgLink(e.currentTarget.value);
  }

  const onConfirm = () => {
    const method = isNewMode ? actionService.http.addStatement.bind(actionService) : actionService.http.updateStatement.bind(actionService);
    method(
      {
        ...(isNewMode ? {} : {id: statement.id} ),
        value: editedStatement,
        categories: editedCategories,
        date: editedDate,
        imgSrc: editedImgLink,
      },
      {
        onSuccess: () => {
          dataService.http.reloadData();
          closeModal();
        },
        onError: (e: Error) => {
          setError(+e.message as editStatementError);
          notificationService.show({type: 'Error', onClose: () => setError(null), message: `You trying to assign ${editStatementError[+e.message as editStatementError]} that already assigned to another statement!`})
        },
      }
    );
  }

  const onCancel = () => {
    closeModal()
  }

  return (
    <>
      <BackdropComponent closeModal={closeModal}>
        <div className="flex flex-col p-6 max-w-[640px] min-h-[432px] my-20 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
          <div className="flex justify-between">
            <h3>Edit Statement</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
          <div className="mt-8">
            <textarea placeholder="add statement ..." rows={4} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onStatementsChange} value={editedStatement}></textarea>
            <h4 className="mt-6">Date</h4>
            <input className={`${error === editStatementError.date ? 'outline outline-3 outline-offset-2 outline-red-400' : ''} mt-4 dark:bg-app-dark p-3`} onChange={onDateChange} value={editedDate} min="2024-01-01" max="2024-12-31" type="date"/>
            <h4 className="mt-6">Image</h4>
            <input onChange={onImgLinkChange} value={editedImgLink} className={`${error === editStatementError.image ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} mt-4 dark:bg-app-dark p-3 w-full`} type="text" placeholder="add link ..."/>
            <h4 className="mt-6">Categories</h4>
            <CategoryForm className="mt-4" isEditMode={true} setSelected={setEditedCategories} selected={editedCategories}></CategoryForm>
          </div>
          <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
            <Button color='gray-300' clickHandler={onCancel}>Cancel</Button>
            <Button color='blue-400' clickHandler={onConfirm}>Save</Button>
          </div>
        </div>
      </BackdropComponent>
    </>
  )
}
