import { useContext } from "react";
import { StatementsContext } from "src/pages/projects/index";
import { BackdropComponent, Button, CloseButton } from "src/shared/index";
import { DeleteModalProps } from "./types";
import { getAuth } from "firebase/auth";


export function DeleteModal({id, closeModal}: DeleteModalProps) {
  const { dataService, actionService } = useContext(StatementsContext)
  const auth = getAuth(); //TODO: use from appProvider
  const onConfirm = async () => {
    actionService.http.deleteStatement({ id, user: await auth.currentUser?.getIdToken()})
      .then(() => {
        closeModal()
        dataService.reloadPageData();
      }).catch((error => {
        if(error.message === "INVALID") {
          console.log(error)
        }
      }));
  }
  const onCancel = () => {
    closeModal()
  }
  return (
    <>
      <BackdropComponent closeModal={closeModal}>
        <div className="flex flex-col p-6 max-w-[640px] my-20 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
          <div className="flex justify-between">
            <h3>Confirm Action</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
          <div className="mt-8">
            <p>Are you sure you want to delete this statement? Click delete button to continue or cancel button to return.</p>
          </div>
          <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
            <Button color='gray-300' clickHandler={onCancel}>Cancel</Button>
            <Button color='red-400' clickHandler={onConfirm}>Delete</Button>
          </div>
        </div>
      </BackdropComponent>
    </>
  )
}
