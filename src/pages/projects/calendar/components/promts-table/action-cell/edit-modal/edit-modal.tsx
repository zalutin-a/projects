import { ChangeEvent } from "react";
import { useContext } from "react";
import { SyntheticEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CalendarContext, DataService } from "src/pages/projects/index";
import { Button, CalendarCategory, CloseButton, useDataService } from "src/shared/index";
import { CategoryForm, CategoryItem } from "../../../index";
import { EditModalProps } from "./types";

export function EditModal({prompt, closeModal, isNewMode = false}: EditModalProps) {
  const [editedPropmpt, setEditedPrompt] = useState(isNewMode ? '' : prompt.promt);
  const [editedCategories, setEditedCategories] = useState(isNewMode ? [] : prompt.categories);
  const { dataService, actionService, } = useContext(CalendarContext);

  const onPromptChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setEditedPrompt(e.currentTarget.value)
  }

  const onConfirm = () => {
    const method = isNewMode ? actionService.addPrompt.bind(actionService) : actionService.updatePrompt.bind(actionService);
    method(
      {...(isNewMode ? {} : {id: prompt.id} ), promt: editedPropmpt, categories: editedCategories},
      {
        onSuccess: () => {
          dataService.reloadData();
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
      <div className="flex flex-col p-6 max-w-[640px] min-h-[432px] dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-500 rounded-lg ">
        <div className="flex justify-between">
          <h3>Edit Prompt</h3>
          <CloseButton clickHandler={closeModal}></CloseButton>
        </div>
        <div className="mt-8">
          <textarea placeholder="add prompt ..." rows={4} className="w-full min-w-[400px] dark:bg-app-dark p-3" onChange={onPromptChange} value={editedPropmpt}></textarea>
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
