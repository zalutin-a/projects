import { createContext, useEffect, useState } from "react";
import { FetchService, Loader, State, useActionService, useAppState, useDataService } from "src/shared/index";
import { MonthPicker, viewMode, ViewSwitcher } from "./components/index";
import { PagesContainer } from "./components/pages-container/pages-container";
import { PagesState, pagesStateConfig } from "./index";
import { PagesActionService, PagesDataService } from "./services/index";


export type pagesContext = { actionService: FetchService<PagesActionService>, dataService: FetchService<PagesDataService>, state: State<PagesState>}
export const PagesContext = createContext<pagesContext>({} as pagesContext)

export function PagesTab() {
  const [state] = useAppState<PagesState>(pagesStateConfig);
  const dataService = useDataService<PagesDataService>(PagesDataService);
  const actionService = useActionService<PagesActionService>(PagesActionService);
  const [viewMode, setViewMode] = useState<viewMode>('list');

  useEffect(() => {
    dataService.http.getAllCategories({onSuccess: (data) => state.dispatch({type: 'categories', payload: data})});
  },[]); 

  useEffect(() => {
    dataService.http.getPages({
        year: state.curent.year,
        month: state.curent.month,
        id: state.curent.id,
      },
      {
        onSuccess: (data) => state.dispatch({type: 'pages', payload: data})
      }
    );
  },[state.curent.month, state.curent.year, state.curent.id]);

  return (
    <>
      <PagesContext.Provider value={{actionService, dataService, state}}>
        <div className="flex justify-between flex-wrap items-center mx-auto box-content mt-8 px-2.5 md:px-10 max-w-4xl">
          <MonthPicker></MonthPicker>
          <ViewSwitcher setViewMode={setViewMode}></ViewSwitcher>
        </div>
        <div className="min-h-[65svh] mx-8">
          <Loader active={dataService.isLoading(dataService.http.getPages)}>
            <PagesContainer viewMode={viewMode}></PagesContainer>
          </Loader>
        </div>
      </PagesContext.Provider>
    </>
  )
}
