import { createContext, useState, useContext, useEffect } from 'react';

import { State, useAppState, UseModal, usePagination, PageCountParams, CalendarStatements, Button, Loader } from "src/shared/index";
import { CalendarContext } from '../../../calendar';
import { CalendarTableFilters } from '../../../types';
import { CategoryFilter, DateFilter } from '../../index';
import { EditModal, StatementsTable } from './components/index';
import { StatementsState, statementsStateConfig } from './index';


export type statementsContext = {state: State<StatementsState>}
export const StatementsContext = createContext<statementsContext>({} as statementsContext);

export function StatementsTab() {
  const [ state ] = useAppState<StatementsState>(statementsStateConfig);
  const { dataService } = useContext(CalendarContext);
  const [ statementsCount, setStatementsCount ] = useState(0);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);
  const {pagination, setPagesCount} = usePagination(
    {page: state.curent.page, itemPerPage: state.curent.itemPerPage},
    (config: PageCountParams) => {
      state.dispatch({type: 'page', payload: config.page});
      state.dispatch({type: 'itemPerPage', payload: config.itemPerPage});
    }
  );

  useEffect(() => {
    dataService.http.getAllCategories({onSuccess: (data) => state.dispatch({type: 'categories', payload: data})});
  },[]); 


  useEffect(() => {
    dataService.http.getStatements(
      {onSuccess: (data: CalendarStatements) => {
          setPagesCount(data.pagesCount);
          setStatementsCount(data.statementsCount);
          state.dispatch({type: 'statements', payload: data.statements});
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
      <StatementsContext.Provider value={{state}}>
        <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
          <div className="flex flex-col gap-y-5">
            <DateFilter onFilterChange={onFilterChange} selected={state.curent.filter.date}></DateFilter>
            <CategoryFilter onFilterChange={onFilterChange} selected={state.curent.filter.category || []}></CategoryFilter>
          </div>
          <div className='min-h-[65svh]'>
            <Loader active={dataService.isLoading(dataService.http.getStatements, dataService.http.getAllCategories)}>
              <div className="flex items-center mt-8 justify-between">
                <h3>Found {statementsCount} statements{`${statementsCount > 1 ? 's' : ''}`}</h3>
                <Button color='blue-400' className="dark:text-zinc-600" clickHandler={openEditModal}>Add statement</Button>
              </div>
              <StatementsTable className="mt-8" data={state.curent.statements}></StatementsTable>
              <div className="flex justify-center mt-8">{pagination}</div>
            </Loader>
          </div>
          {editModal}
        </div>
      </StatementsContext.Provider>
    </>
  )
}