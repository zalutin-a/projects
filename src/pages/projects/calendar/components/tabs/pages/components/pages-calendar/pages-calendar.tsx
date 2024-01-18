import { useContext } from "react";
import { PagesContext } from "../../pages";
import { PagesCalendarItem } from "./index";

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',  
    'Thursday',
    'Friday',
    'Saturday'
]

const fillEmptyDays = (amount: number) => new Array(amount).fill(<div></div>)

export function PagesCalendar() {
  const { state } = useContext(PagesContext);

  return (
    <>
      <div className="mt-8 grid gap-3 grid-cols-calendar justify-center">
      {/* max-w-4xl w-11/12 min-[890px]:w-[220px] */}
        {DAYS.map(day => <div className="z-20 sticky top-0 flex justify-center p-6 bg-white dark:bg-app-dark border-b-8 border-b-app-gray-300 dark:border-b-app-gray-800">{day}</div>)} 
        {fillEmptyDays(state.curent.pages[0].day)}
        {state.curent.pages.map((page, index) => <PagesCalendarItem key={page.id} index={index} page={page}></PagesCalendarItem>)}
      </div>
    </>
  )
}
