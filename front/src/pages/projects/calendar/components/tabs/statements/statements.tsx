import { createContext } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';

import { State, useAppStore, usePagination, CalendarStatements, Loader, FetchService, useDataService, useActionService, DataFetchService, useAppState, storeDispatch } from "src/shared/index";
import { StatementsHeader, StatementsTable } from './components/index';
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
  const pagination = usePagination(state, store.current.pagesCount);

  return (
    <>
      <StatementsContext.Provider value={{state, store, dataService, actionService}}>
        <div className="mx-auto box-content pb-8 mt-8 px-2.5 md:px-10 lg:mt-10 lg:pb-16 max-w-4xl">
          <StatementsHeader></StatementsHeader>
          <div className='min-h-[65svh]'>
            <Loader active={navigation.state !== 'idle'}>
              <StatementsTable className="mt-8" data={store.current.statements}></StatementsTable>
              <div className="flex justify-center mt-8">{pagination}</div>
            </Loader>
          </div>
        </div>
      </StatementsContext.Provider>
    </>
  )
}
