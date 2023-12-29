import { useContext, useState, SyntheticEvent } from "react";
import { AppContext } from "src/App";
import { PagesContext } from "src/pages/projects/index";
import { BackdropComponent, Button, CloseButton, errors, NOTIFICATIONS_MAP, ServerError, } from "src/shared/index";
import { EditPromptForm } from "./index";
import { editModalProps } from "./types";


export function EditModal({page, closeModal}: editModalProps) {
  const { notificationService } = useContext(AppContext);
  const { actionService, dataService, state } = useContext(PagesContext);
  const [editedPage, setEditedPage] = useState({...page});
  const [error, setError] = useState<errors>(null);
  const [image, setImage] = useState(editedPage.img)
  const [holiday, setHoliday] = useState(editedPage.holiday)
  const [promptEditMode, setPromptEditMode ] = useState(false)

  const onImageChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if(error === errors.usingAssignedImage) { //TODO: think about better way to reset error
      setError(null);
    }
    setImage(e.currentTarget.value)
  }

  const onHolidayChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setHoliday(e.currentTarget.value)
  }

  const updatePromtEditMode = (state: boolean) => {
    if(error === errors.promptEditMode && !state) { //TODO: think about better way to reset error
      setError(null);
    }
    setPromptEditMode(state)
  }

  const beforeClose = () =>{
    if (promptEditMode) {
      setError(errors.promptEditMode);
      notificationService.show({...NOTIFICATIONS_MAP[errors.promptEditMode], onClose: () => setError(null)});
      return false;
    }
    return true;
  }

  const updatePage = () => {
    actionService.updatePage(
      {
        ...editedPage,
        img: image,
        holiday,
      },
      {
        onSuccess: () => {
          dataService.reloadData();
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
      actionService.checkPageFields(
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
            <h4 className="mb-4">Prompt</h4>
            <fieldset className={`${error === errors.promptEditMode || error === errors.usingAssignedPrompt ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} min-w-full`}>
              <EditPromptForm editMode={promptEditMode} error={error} setPage={setEditedPage} setError={setError} setEditMode={updatePromtEditMode} page={editedPage}></EditPromptForm>
            </fieldset>
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
