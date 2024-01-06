import { createContext } from 'react';
import { FetchService, useActionService, useDataService } from "src/shared/index";
import { ActionService, DataService } from "./services";
import { Outlet } from "react-router-dom";
import { CalendarHeader } from "./components/calendar-header/calendar-header";


export type calendarContext = {actionService: FetchService<ActionService>, dataService: FetchService<DataService>}
export const CalendarContext = createContext<calendarContext>({} as calendarContext)

export function CalendarProject() {
  const dataService = useDataService<DataService>(DataService);
  const actionService = useActionService<ActionService>(ActionService);
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
