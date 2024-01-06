import { useContext } from "react";
import { CalendarContext } from "src/pages/projects/index";
import { Button, CloseButton } from "src/shared/index";
import { DeleteModalProps } from "./types";

export function DeleteModal({id, closeModal}: DeleteModalProps) {
  const { dataService, actionService } = useContext(CalendarContext);
  const onConfirm = () => {
    actionService.http.deleteCategory(
      { id },
      {
        onSuccess: () => {
          dataService.http.reloadData();
          closeModal();
        }
      }
    );
  }
  const onCancel = () => {
    closeModal()
  }
  return (
    <>
      <div className="flex flex-col p-6 max-w-[640px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
        <div className="flex justify-between">
          <h3>Confirm Action</h3>
          <CloseButton clickHandler={closeModal}></CloseButton>
        </div>
        <div className="mt-8">
          <p>Are you sure you want to delete this category? Click delete button to continue or cancel button to return.</p>
        </div>
        <div className="flex justify-end mt-8 gap-x-5 dark:text-zinc-600">
          <Button color='gray-300' clickHandler={onCancel}>Cancel</Button>
          <Button color='red-400' clickHandler={onConfirm}>Delete</Button>
        </div>
      </div>
    </>
  )
}
