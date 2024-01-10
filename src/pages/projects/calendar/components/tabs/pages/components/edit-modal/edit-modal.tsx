import { useContext, useState, SyntheticEvent } from "react";
import { AppContext } from "src/App";
import { PagesContext } from "src/pages/projects/index";
import { BackdropComponent, Button, CloseButton, errors, Loader, NOTIFICATIONS_MAP, ServerError, } from "src/shared/index";
import { EditStatementForm } from "./index";
import { editModalProps } from "./types";


export function EditModal({page, closeModal}: editModalProps) {
  const { notificationService } = useContext(AppContext);
  const { actionService, dataService } = useContext(PagesContext);
  const [editedPage, setEditedPage] = useState({...page});
  const [error, setError] = useState<errors>(null);
  const [image, setImage] = useState(editedPage.img)
  const [holiday, setHoliday] = useState(editedPage.holiday)
  const [statementEditMode, setStatementEditMode ] = useState(false)

  const onImageChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if(error === errors.usingAssignedImage) { //TODO: think about better way to reset error
      setError(null);
    }
    setImage(e.currentTarget.value)
  }

  const onHolidayChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setHoliday(e.currentTarget.value)
  }

  const updateStatementEditMode = (state: boolean) => {
    if(error === errors.statementEditMode && !state) { //TODO: think about better way to reset error
      setError(null);
    }
    setStatementEditMode(state)
  }

  const beforeClose = () =>{
    if (statementEditMode) {
      setError(errors.statementEditMode);
      notificationService.show({...NOTIFICATIONS_MAP[errors.statementEditMode], onClose: () => setError(null)});
      return false;
    }
    return true;
  }

  const updatePage = () => {
    actionService.http.updatePage(
      {
        ...editedPage,
        img: image,
        holiday,
      },
      {
        onSuccess: () => {
          dataService.http.reloadData();
          closeModal();
        },
        onError: (error: ServerError) => {
          setError(error.code);
          notificationService.show({...error.payload, onClose: () => setError(null)});
        }
      }
    );
  }

  const onConfirm = () => {
    if (beforeClose()) {
      actionService.http.checkPageFields(
        {
          ...editedPage,
          img: image,
          holiday,
        },
        {
          onSuccess: () => {
            updatePage();
          },
          onError: (error: ServerError) => {
            setError(error.code);
            notificationService.show({...error.payload, onClose: () => setError(null)})
          }
        },
      )
    }
  }

  const onCancel = () => {
    if (beforeClose()) {
      closeModal()
    }
  }

  return (
    <>
      <BackdropComponent closeModal={closeModal} beforeClose={beforeClose}>
        <div className="flex flex-col p-12 w-[720px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg my-20">
          <div className="flex justify-between">
            <h3>Edit Page</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
          <div className="mt-8">
            <img className="object-cover w-full" src={editedPage.img || "/images/blank-image.jpg"} alt="project preview" />
            <input onChange={onImageChange} value={image} className={`${error === errors.usingAssignedImage ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} mt-4 dark:bg-app-dark p-3 w-full`} type="text" placeholder="add link ..."/>
          </div>
          <div className="mt-8">
            <h4>Holiday</h4>
            <input onChange={onHolidayChange} value={holiday} className='mt-4 dark:bg-app-dark p-3 w-full' type="text" placeholder="add holyday ..."/>
          </div>
          <div className="mt-8">
            <h4 className="mb-4">Statement</h4>
            <div className="min-h-[95px]">
              <Loader active={dataService.isLoading(dataService.http.getStatements) || actionService.isLoading(actionService.http.checkPageFields)} size='medium'>
                <fieldset className={`${error === errors.statementEditMode || error === errors.usingAssignedStatement ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} min-w-full`}>
                  <EditStatementForm editMode={statementEditMode} error={error} setPage={setEditedPage} setError={setError} setEditMode={updateStatementEditMode} page={editedPage}></EditStatementForm>
                </fieldset>
              </Loader>
            </div>
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
