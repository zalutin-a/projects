import { createContext, useEffect, useState } from "react";
import { State, stateDispatch, useActionService, useAppState, useDataService } from "src/shared/index";
import { MonthPicker, viewMode, ViewSwitcher } from "./components/index";
import { PagesContainer } from "./components/pages-container/pages-container";
import { PagesState, pagesStateConfig } from "./index";
import { PagesActionService, PagesDataService } from "./services/index";


export type pagesContext = { actionService: PagesActionService, dataService: PagesDataService, state: State<PagesState>}
export const PagesContext = createContext<pagesContext>({} as pagesContext)


export function PagesTab() {
  const [state] = useAppState<PagesState>(pagesStateConfig);
  const [dataService, isDataLoading] = useDataService<PagesDataService>(PagesDataService);
  const [actionService, isActionLoading] = useActionService<PagesActionService>(PagesActionService);
  const [viewMode, setViewMode] = useState<viewMode>('list');

  useEffect(() => {
    dataService.getAllCategories({onSuccess: (data) => state.dispatch({type: 'categories', payload: data})});
  },[]); 

  useEffect(() => {
    dataService.getPages({onSuccess: (data) => state.dispatch({type: 'pages', payload: data})}, {
      year: state.curent.year,
      month: state.curent.month,
    });
  },[state.curent.month, state.curent.year]);

  return (
    <>
      <PagesContext.Provider value={{actionService, dataService, state}}>
        <div className="flex justify-between flex-wrap items-center mx-auto box-content mt-8 px-2.5 md:px-10 max-w-4xl">
          <MonthPicker></MonthPicker>
          <ViewSwitcher setViewMode={setViewMode}></ViewSwitcher>
        </div>
        <div className="mx-8">
          <PagesContainer viewMode={viewMode}></PagesContainer>
        </div>
      </PagesContext.Provider>
    </>
  )
}