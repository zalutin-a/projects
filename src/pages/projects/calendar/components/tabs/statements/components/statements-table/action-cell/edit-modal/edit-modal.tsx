import { useContext, SyntheticEvent, useState } from "react";
import { AppError, BackdropComponent, Button, ClientErrors, CloseButton, ErrorReason, NOTIFICATIONS_MAP, ServerErrors} from "src/shared/index";
import { AppContext } from "src/App";
import { CategoryForm, StatementsContext } from "src/pages/projects/index";
import { EditModalProps } from "./types";


export function EditModal({statement, closeModal, isNewMode = false}: EditModalProps) {
  const {notificationService} = useContext(AppContext);
  const { dataService, actionService } = useContext(StatementsContext)
  const [error, setError] = useState<AppError>(null);
  const [editedStatement, setEditedStatement] = useState(isNewMode ? '' : statement.value);
  const [editedDate, setEditedDate] = useState(isNewMode ? '' : statement.date ?? '');
  const [editedImgLink, setEditedImgLink] = useState(isNewMode ? '' : statement.imgSrc ?? '');
  const [editedCategories, setEditedCategories] = useState(isNewMode ? [] : statement.categories);

  const onStatementsChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setEditedStatement(e.currentTarget.value);
    if(error === ClientErrors.statementCantBeEmpty) { //TODO: think about better way to reset error
      setError(null);
    }
  }
  const onDateChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedDate(e.currentTarget.value);
    if(error === ServerErrors.usingAssignedDate) { //TODO: think about better way to reset error
      setError(null);
    }
  }
  const onImgLinkChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setEditedImgLink(e.currentTarget.value);
    if(error === ServerErrors.usingAssignedImage) { //TODO: think about better way to reset error
      setError(null);
    }
  }

  const onConfirm = () => {
    if(!editedStatement) {
      setError(ClientErrors.statementCantBeEmpty)
      notificationService.show({...NOTIFICATIONS_MAP[ClientErrors.statementCantBeEmpty], onClose: () => setError(null)})
      return
    }
    const method = isNewMode ? actionService.http.addStatement.bind(actionService.http) : actionService.http.updateStatement.bind(actionService.http);
    method({
        ...(isNewMode ? {} : {id: statement.id} ),
        value: editedStatement,
        categories: editedCategories,
        date: editedDate,
        imgSrc: editedImgLink,
    }).then(() => {
      closeModal();
      dataService.reloadPageData()
    }).catch((error: ErrorReason) => {
      if(error.message === "INVALID") {
        setError(error.cause.code);
        notificationService.show({...error.cause.payload, onClose: () => setError(null)})
      }
    });
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
            <fieldset className={`${error === ClientErrors.statementCantBeEmpty ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} min-w-full`}>
              <textarea placeholder="add statement ..." rows={4} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onStatementsChange} value={editedStatement}></textarea>
           </fieldset>
            <h4 className="mt-6">Date</h4>
            <input className={`${error === ServerErrors.usingAssignedDate? 'outline outline-3 outline-offset-2 outline-red-400' : ''} mt-4 dark:bg-app-dark p-3`} onChange={onDateChange} value={editedDate} min="2024-01-01" max="2024-12-31" type="date"/>
            <h4 className="mt-6">Image</h4>
            <input onChange={onImgLinkChange} value={editedImgLink} className={`${error === ServerErrors.usingAssignedImage ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} mt-4 dark:bg-app-dark p-3 w-full`} type="text" placeholder="add link ..."/>
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
