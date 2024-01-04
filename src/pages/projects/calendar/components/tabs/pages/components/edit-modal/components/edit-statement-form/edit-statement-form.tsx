import { useContext, useState, useEffect } from 'react'
import { AppContext } from 'src/App';
import { CalendarCategory, CalendarStatementModel, CalendarStatements, Hint, HoverPopover, Icon } from 'src/shared/index';
import { PagesContext } from "../../../../pages";
import { CategorySelector, editStatementFormProps, StatementSelector } from "../index";

export function EditStatementForm({page, editMode, setEditMode, setError, setPage, error}: editStatementFormProps) {
  const { dataService } = useContext(PagesContext);
  const [ category, setCategory ] = useState<CalendarCategory>(0)
  const [ filteredStatements, setFilteredStatements ] = useState<CalendarStatementModel[]>([])
  const { theme } = useContext(AppContext);


  useEffect(() => {
    dataService.getStatements({
      onSuccess: (data: CalendarStatements) => setFilteredStatements(data.statements)},
      category
    )
  }, [category])

  const onCategorySelect = (id:number) => {
    setCategory(id)
  }

  const getContent = () => {
    return editMode ? (
      <div className='flex flex-col gap-y-6'>
        <CategorySelector selectedCategory={category} onCategorySelect={onCategorySelect}></CategorySelector>
        <StatementSelector
          page={page}
          error={error}
          setPage={setPage}
          setError={setError}
          setEditMode={setEditMode}
          statements={filteredStatements}
          isCategorySelected={category >= 0}//todo: change category(start from 1)
        ></StatementSelector>
      </div>
    ) : (
      <div className='flex flex-col gap-y-6'>
        <p className='cursor-default'>{page.statement?.value || 'No asigned statement'}</p>
        <div className='w-full flex flex-row-reverse'>
          <HoverPopover rendredComponent={<Hint message="Change statement"></Hint>}>
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