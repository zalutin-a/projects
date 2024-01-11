import { useContext, useState, SyntheticEvent} from "react";
import { BackdropComponent, Button, CloseButton } from "src/shared/index";
import { CalendarContext } from "src/pages/projects/index";
import { EditModalProps } from "./types";

export function EditModal({category, closeModal, isNewMode = false}: EditModalProps) {
  const [editedCategory, setEditedCategory] = useState(isNewMode ? '' : category.name);
  const { dataService, actionService, } = useContext(CalendarContext);

  const onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setEditedCategory(e.currentTarget.value)
  }

  const onConfirm = () => {
    const method = isNewMode ? actionService.http.addCategory.bind(actionService) : actionService.http.updateCategory.bind(actionService);
    method(
      {...(isNewMode ? {} : {id: category.id} ), name: editedCategory},
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
      <BackdropComponent closeModal={closeModal}>
        <div className="flex flex-col my-20 p-6 max-w-[640px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
          <div className="flex justify-between">
            <h3>{isNewMode ? 'Add' : 'Edit'} Category</h3>
            <CloseButton clickHandler={closeModal}></CloseButton>
          </div>
          <div className="mt-8">
            <textarea placeholder="add category ..." rows={4} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onChange} value={editedCategory}></textarea>
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
