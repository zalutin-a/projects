import { useContext, useState } from 'react';
import { AppContext } from 'src/App';
import { PagesContext } from '../../../../pages';
import { CalendarPageModel, Dropdown, errors, Hint, HoverPopover, Icon, ServerError, ValueName } from 'src/shared/index';
import { promptSelectorProps } from "./types";

export function PromptSelector({page, onSave, setEditMode, setPage, prompts, isCategorySelected, setError, error}: promptSelectorProps) {
  const { notificationService } = useContext(AppContext);
  const { actionService } = useContext(PagesContext);
  const [selectedPrompt, setSelectedPrompt] = useState([]);
  const { theme } = useContext(AppContext);

  const save = () => {
    if (selectedPrompt.length) {
      const prompt = prompts.find(prompt => prompt.id === selectedPrompt[0])
      //TODO: handle case when no prompt selected
      const newPrompt = {  //TODO change after fix promt => prompt (use const page = {...page, prompt})
        prompt: prompt.promt,
        id: prompt.id,
      }
      actionService.checkPageFields(
        {
          ...page,
          prompt: newPrompt
        },
        {
          onSuccess: () => {
              setPage({...page, prompt: newPrompt})
              setEditMode(false)
            },
            onError: (error: ServerError) => {
              setError(error.code);
              notificationService.show({...error.payload, onClose: () => setError(null)})
            }
        },
      )
    } else {
      setPage({...page, prompt: null})
      setEditMode(false)
    }

  }

  const onPromptSelect = (prompt) => {
    if(error === errors.usingAssignedPrompt) {
      setError(null);
    }
    setSelectedPrompt(prompt)
  }

  return (
    // Todo: fix desable state after changing dropdown 
    <>
      <div className='flex justify-between'>
        <HoverPopover rendredComponent={ !isCategorySelected ? <Hint message="Please select category"></Hint> : <></> }>
          <fieldset className='disabled:opacity-50' disabled={!isCategorySelected}> 
            <Dropdown<any> width={500} disable={!isCategorySelected} onSelect={onPromptSelect} selectedVlues={selectedPrompt} options={prompts?.map(item => ({value: item.id, name: item.promt}))} placeholder="Select prompt"></Dropdown>
          </fieldset>
        </HoverPopover>
        <div className='flex'>
          <HoverPopover rendredComponent={<Hint message="Save changes"></Hint>}>
            <Icon onClick={save} type='check' size={7} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
          <HoverPopover rendredComponent={<Hint message="Revert changes"></Hint>}>
            <Icon onClick={() => setEditMode(false)} type='cross' size={7} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
        </div>
      </div>
    </>
  )
}