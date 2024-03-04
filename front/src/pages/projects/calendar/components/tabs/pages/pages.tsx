import { createContext, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { DataFetchService, FetchService, Loader, State, storeDispatch, useActionService, useAppState, useAppStore, useDataService } from "src/shared/index";
import { MonthPicker, viewMode, ViewSwitcher } from "./components/index";
import { PagesContainer } from "./components/pages-container/pages-container";
import { PagesState, pagesStateConfig, PagesStore, pagesStoreConfig } from "./index";
import { PagesActionService, PagesDataService } from "./services/index";


export type pagesContext = {
  actionService: FetchService<PagesActionService>,
  dataService: DataFetchService<PagesDataService>,
  store: State<PagesStore, storeDispatch<PagesStore>>,
  state: State<PagesState>
}
export const PagesContext = createContext<pagesContext>({} as pagesContext)

export function PagesTab() {
  const data = useLoaderData();
  const navigation = useNavigation();
  const state = useAppState<PagesState>(pagesStateConfig);
  const store = useAppStore<PagesStore>(pagesStoreConfig, data);
  const dataService = useDataService<PagesDataService>(PagesDataService);
  const actionService = useActionService<PagesActionService>(PagesActionService);
  const [viewMode, setViewMode] = useState<viewMode>('list');

  return (
    <>
      <PagesContext.Provider value={{actionService, dataService, store, state}}>
        <div className="flex justify-between flex-wrap items-center mx-auto box-content mt-8 px-2.5 md:px-10 max-w-4xl">
          <MonthPicker></MonthPicker>
          <ViewSwitcher setViewMode={setViewMode}></ViewSwitcher>
        </div>
        <div className="min-h-[65svh] mx-8">
          <Loader active={navigation.state !== 'idle'}>
            <PagesContainer viewMode={viewMode}></PagesContainer>
          </Loader>
        </div>
      </PagesContext.Provider>
    </>
  )
}
