import { createContext } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';

import { State, useAppStore, UseModal, usePagination, CalendarStatements, Button, Loader, FetchService, useDataService, useActionService, DataFetchService, useAppState, Action, storeDispatch } from "src/shared/index";
import { CategoryFilter, DateFilter } from '../../index';
import { EditModal, StatementsTable } from './components/index';
import { StatementsActionService, StatementsDataService, StatementsState, statementsStateConfig, StatementsStore, statementsStoreConfig } from './index';



export type statementsContext = {
  store: State<StatementsStore, storeDispatch<StatementsStore>>,
  actionService: FetchService<StatementsActionService>,
  dataService: DataFetchService<StatementsDataService>,
  state: State<StatementsState>,
}
export const StatementsContext = createContext<statementsContext>({} as statementsContext);

export function StatementsTab() {
  const navigation = useNavigation();
  const data = useLoaderData() as CalendarStatements;
  const state = useAppState<StatementsState>(statementsStateConfig);
  const store = useAppStore<StatementsStore>(statementsStoreConfig, data);
  const dataService = useDataService<StatementsDataService>(StatementsDataService);
  const actionService = useActionService<StatementsActionService>(StatementsActionService);
  const [ openEditModal, editModal ] = UseModal(<EditModal isNewMode={true}></EditModal>);
  const pagination = usePagination(state, store.current.pagesCount);

  const onFilterChange = (changedFilter: Action<keyof StatementsState, any>) => {
    state.dispatch(changedFilter, {type: 'page', payload: null})
  }

  return (
    <>
      <StatementsContext.Provider value={{state, store, dataService, actionService}}>
        <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
          <div className="flex flex-col gap-y-5">
            <DateFilter onFilterChange={onFilterChange} selected={state.current.date}></DateFilter>
            <CategoryFilter onFilterChange={onFilterChange} selected={state.current.category || []}></CategoryFilter>
          </div>
          <div className='min-h-[65svh]'>
            <Loader active={navigation.state !== 'idle' || dataService.isLoading(dataService.http.getStatements, dataService.http.getAllCategories)}>
              <div className="flex items-center mt-8 justify-between">
                <h3>Found {store.current.statementsCount} statement{`${store.current.statementsCount > 1 ? 's' : ''}`}</h3>
                <Button color='blue-400' className="dark:text-zinc-600" clickHandler={openEditModal}>Add statement</Button>
              </div>
              <StatementsTable className="mt-8" data={store.current.statements}></StatementsTable>
              <div className="flex justify-center mt-8">{pagination}</div>
            </Loader>
          </div>
          {editModal}
        </div>
      </StatementsContext.Provider>
    </>
  )
}
