import { useContext, useEffect, createContext, useState } from "react";

import { Button, CalendarPrompts, PageCountParams, State, stateAction, useAppState, UseModal, usePagination } from "src/shared/index";
import { CategoryFilter, DateFilter, PromptsState, promptsStateConfig } from "../../index";
import { CalendarContext, CalendarTableFilters } from "../../../index";
import { PromptsTable, EditModal } from "./components";

export type promptsContext = {state: State<PromptsState>}
export const PromptsContext = createContext<promptsContext>({} as promptsContext)

export function PromptsTab() {
  const [ promptsCount, setPromptsCount ] = useState(0)
  const [ state ] = useAppState<PromptsState>(promptsStateConfig);

  const {pagination, setPagesCount} = usePagination(
    {page: state.curent.page, itemPerPage: state.curent.itemPerPage},
    (config: PageCountParams) => {
      state.dispatch({type: 'page', payload: config.page});
      state.dispatch({type: 'itemPerPage', payload: config.itemPerPage});
    }
  );
  const { dataService } = useContext(CalendarContext);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);

  useEffect(() => {
    dataService.getAllCategories({onSuccess: (data) => state.dispatch({type: 'categories', payload: data})});
  },[]); 


  useEffect(() => {
    dataService.getPrompts(
      {onSuccess: (data: CalendarPrompts) => {
          setPagesCount(data.pagesCount);
          setPromptsCount(data.promptsCount);
          state.dispatch({type: 'prompts', payload: data.prompts});
        }
      },
      {page: state.curent.page, itemPerPage: state.curent.itemPerPage, filter: state.curent.filter}
    );
  },[state.curent.page, state.curent.itemPerPage, state.curent.filter]);

  const onFilterChange = (changedFilter: Partial<CalendarTableFilters>) => {
    state.dispatch({type: 'filter', payload: {...state.curent.filter, ...changedFilter}});
  }

  return (
    <>
      <PromptsContext.Provider value={{state}}>
        <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
          <div className="flex flex-col gap-y-5">
            <DateFilter onFilterChange={onFilterChange} selected={state.curent.filter.date}></DateFilter>
            <CategoryFilter onFilterChange={onFilterChange} selected={state.curent.filter.category || []}></CategoryFilter>
          </div>
          <div className="flex items-center mt-8 justify-between">
            <h3>Found {promptsCount} prompt{`${promptsCount > 1 ? 's' : ''}`}</h3>
            <Button color='blue-400' className="dark:text-zinc-600" clickHandler={openEditModal}>Add prompt</Button>
          </div>
          <PromptsTable className="mt-8" data={state.curent.prompts}></PromptsTable>
          <div className="flex justify-center mt-8">{pagination}</div>
          {editModal}
        </div>
      </PromptsContext.Provider>
    </>
  )
}