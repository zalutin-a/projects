import { Provider, useDispatch } from "react-redux";
import { createContext, useEffect } from 'react';
import { useActionService, useDataService } from "src/shared/index";
import { ActionService, DataService } from "../index";

import { store } from "./store/store";
import { Outlet } from "react-router-dom";
import { CalendarHeader } from "./components/calendar-header/calendar-header";
import { setCategories } from "./store/index";


export type calendarContext = {actionService: ActionService, dataService: DataService}
export const CalendarContext = createContext<calendarContext>({} as calendarContext)

export function CalendarProject() {
  const [dataService, isDataLoading] = useDataService<DataService>(DataService);
  const [actionService, isActionLoading] = useActionService<ActionService>(ActionService);
  return (
    <>
      {/* <Provider store={store}> */}
        <CalendarContext.Provider value={{dataService, actionService}}>
          <CalendarHeader></CalendarHeader>
          <Outlet></Outlet>
        </CalendarContext.Provider>
      {/* </Provider> */}
    </>
  )
}