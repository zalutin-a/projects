import { useContext, useState } from 'react';
import { AppContext } from 'src/App';
import { PagesContext } from '../../../../pages';
import { CalendarPageModel, Dropdown, errors, Hint, HoverPopover, Icon, ServerError } from 'src/shared/index';
import { StatementSelectorProps } from './types';

export function StatementSelector({page, setEditMode, setPage, statements, isCategorySelected, setError, error}: StatementSelectorProps) {
  const { notificationService } = useContext(AppContext);
  const { actionService } = useContext(PagesContext);
  const [selectedStatement, setSelectedStatement] = useState<string[]>([]);
  const { theme } = useContext(AppContext);

  const save = () => {
    if (selectedStatement.length) {
      const statement = statements.find(statement => statement.id === selectedStatement[0])
      const updatedPage: CalendarPageModel = {
        ...page,
        statement: {
          value: statement.value,
          id: statement.id,
        }
      }
      actionService.checkPageFields(
        updatedPage,
        {
          onSuccess: () => {
              setPage(updatedPage)
              setEditMode(false)
            },
            onError: (error: ServerError) => {
              setError(error.code);
              notificationService.show({...error.payload, onClose: () => setError(null)})
            }
        },
      )
    } else {
      setPage({...page, statement: null})
      setEditMode(false)
    }
  }

  const onStatementSelect = (statement) => {
    if(error === errors.usingAssignedStatement) {
      setError(null);
    }
    setSelectedStatement(statement)
  }

  return (
    <>
      <div className='flex justify-between'>
        <HoverPopover rendredComponent={ !isCategorySelected ? <Hint message="Please select category"></Hint> : <></> }>
          <fieldset className='disabled:opacity-50' disabled={!isCategorySelected}> 
            <Dropdown<any>
              width={500}
              disable={!isCategorySelected}
              onSelect={onStatementSelect}
              selectedVlues={selectedStatement}
              options={statements?.map(statement => ({value: statement.id, name: statement.value}))}
              placeholder="Select Statement"
            ></Dropdown>
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