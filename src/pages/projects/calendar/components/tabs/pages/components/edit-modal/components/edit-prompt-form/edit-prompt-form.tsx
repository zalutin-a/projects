import { useContext, useState, useEffect } from 'react'
import { AppContext } from 'src/App';
import { CalendarCategory, CalendarPrompts, CalendarPromptShortModel, CalendarPromtModel, Hint, HoverPopover, Icon } from 'src/shared/index';
import { PagesContext } from "../../../../pages";
import { CategorySelector, PromptSelector } from "../index";
import { editPromptFormProps } from "./types";

export function EditPromptForm({page, editMode, setEditMode, setError, setPage, error}: editPromptFormProps) {
  const { dataService } = useContext(PagesContext);
  const [ category, setCategory ] = useState<CalendarCategory>(0)
  const [ filteredPrompts, setFilteredPrompts ] = useState([])
  const { theme } = useContext(AppContext);


  useEffect(() => {
    dataService.getPrompts({
      onSuccess: (data: CalendarPrompts) => setFilteredPrompts(data.prompts)},
      category
    )
  }, [category])

  const onSave = (prompt: CalendarPromptShortModel) => {
    console.log(prompt)
  }

  const onCategorySelect = (id:number) => {
    setCategory(id)
  }

  const getContent = () => {
    return editMode ? (
      <div className='flex flex-col gap-y-6'>
        <CategorySelector selectedCategory={category} onCategorySelect={onCategorySelect}></CategorySelector>
        <PromptSelector page={page} onSave={onSave} error={error} setPage={setPage} setError={setError} setEditMode={setEditMode} prompts={filteredPrompts} isCategorySelected={category >= 0}></PromptSelector>
      </div>
    ) : (
      <div className='flex flex-col gap-y-6'>
        <p className='cursor-default'>{page.prompt?.prompt || 'No asigned prompt'}</p>
        <div className='w-full flex flex-row-reverse'>
          <HoverPopover rendredComponent={<Hint message="Change Prompt"></Hint>}>
            <Icon onClick={() =>setEditMode(true)} type='edit' size={5} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
        </div>
      </div>
    )


  }

  return (
    <>
      {getContent()}
    </>
  )
}