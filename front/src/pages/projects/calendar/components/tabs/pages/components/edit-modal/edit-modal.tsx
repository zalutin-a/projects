import { useContext, useState, SyntheticEvent, useRef, useEffect, createContext } from "react";
import { AppContext } from "src/App";
import { PagesContext } from "src/pages/projects/index";
import { BackdropComponent, Button, CloseButton, ServerErrors, ClientErrors, Loader, NOTIFICATIONS_MAP, AppError, ErrorReason, useFormControl, FormConfig, CalendarPageModel } from "src/shared/index";
import { editModalForm, editModalProps } from "./types";
import { TextField } from "@mui/material";
import { EDIT_PAGE_ERRORS, EditModalContext } from "./constants";
import { EditStatementForm } from "./index";

const formConfig: FormConfig<editModalForm> = {
  img: {
    initialValue: (page: CalendarPageModel) => page?.img || '',
  },
  holiday: {
    initialValue: (page: CalendarPageModel) => page?.holiday || '',
  },
  statement: {
    initialValue: (page: CalendarPageModel) => page?.statement?.id || ''
  }
}

export function EditModal({page, closeModal}: editModalProps) {
  const {notificationService} = useContext(AppContext);
  const {actionService, dataService} = useContext(PagesContext);
  const [editedPage, setEditedPage] = useState({...page});
  const [error, setError] = useState<AppError>(null);
  const [statementEditMode, setStatementEditMode ] = useState(false)
  const [formControl] = useFormControl(formConfig, page)

  const updateStatementEditMode = (state: boolean) => {
    if(error === ClientErrors.statementEditMode && !state) { //TODO: think about better way to reset error
      setError(null);
    }
    setStatementEditMode(state)
  }

  const beforeClose = () =>{
    if (statementEditMode) {
      setError(ClientErrors.statementEditMode);
      notificationService.show({...NOTIFICATIONS_MAP[ClientErrors.statementEditMode], onClose: () => setError(null)});
      return false;
    }
    return true;
  }

  const onConfirm = () => {
    formControl.submit(({img, holiday}) => {
      if (beforeClose()) {
        const updatedPage = {
          ...editedPage,
          img,
          holiday,
        }
        actionService.http.checkPageFields(updatedPage)
          .then(() => actionService.http.updatePage(updatedPage))
          .then(() => {
            dataService.reloadPageData();
            closeModal();
          })
          .catch((error: ErrorReason) => {
            if(error.message === "INVALID") {
              formControl.setIsValid(EDIT_PAGE_ERRORS[error.cause.code])
              notificationService.show({...error.cause.payload, onClose: () => setError(null)})
            }
          })
      }
    })
  }

  const onCancel = () => {
    if (beforeClose()) {
      closeModal()
    }
  }

  return (
    <>
    <EditModalContext.Provider value={{formControl}}>
      <BackdropComponent closeModal={closeModal} beforeClose={beforeClose}>
        <div className="flex flex-col p-12 w-[720px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg my-20">
          <div className="flex justify-between">
            <h3>Edit Page</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
            <form>
              <div className="mt-8">
                  <img className="object-cover w-full" src={editedPage.img || "/images/blank-image.jpg"} alt="project preview" />
                  <TextField
                    sx={{marginTop: 2}}
                    focused
                    {...formControl.registerInput('img')}
                    label="Image"
                    variant="outlined"
                    fullWidth
                  />
                </div>  
              <div className="mt-8">
                <h4>Holiday</h4>
                <TextField
                  sx={{marginTop: 2}}
                  {...formControl.registerInput('holiday')}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="mt-8">
                <h4 className="mb-4">Statement</h4>
                <div className="min-h-[95px]">
                  <Loader active={dataService.isLoading(dataService.http.getStatements) || actionService.isLoading(actionService.http.checkPageFields)} size='medium'>
                    <fieldset className={`${error === ClientErrors.statementEditMode || error === ServerErrors.usingAssignedStatement ? 'outline outline-3 outline-offset-2 outline-red-500' : ''} min-w-full`}>
                      <EditStatementForm editMode={statementEditMode} error={error} setPage={setEditedPage} setError={setError} setEditMode={updateStatementEditMode} page={editedPage}></EditStatementForm>
                    </fieldset>
                  </Loader>
                </div>
              </div>
            </form>
            <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
              <Button color='gray-300' clickHandler={onCancel}>Cancel</Button>
              <Button color='blue-400' clickHandler={onConfirm}>Save</Button>
            </div>
        </div>
      </BackdropComponent>
      </EditModalContext.Provider>
    </>
  )
}
