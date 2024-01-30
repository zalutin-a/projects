import { Outlet } from "react-router-dom";
import { CalendarHeader } from "./components/calendar-header/calendar-header";

export function CalendarProject() {
  return (
    <>
      {/* <Provider store={store}> */}
        <CalendarHeader></CalendarHeader>
        <div className='min-h-[65svh]'>
            <Outlet></Outlet>
        </div>
      {/* </Provider> */}
    </>
  )
}
