import { Tabs } from "../tabs-component/tabs";

const BASE_URL = '/projects/calendar/';
const TABS_CONFIG = [
  {path: BASE_URL + 'statements', name: 'Statements'},
  {path: BASE_URL + 'categories', name: 'Categories'},
  {path: BASE_URL + 'pages', name: 'Pages'},
]

export function CalendarHeader() {
  return (
    <>
      <div className="mx-auto box-content mt-8 px-2.5 md:px-10 max-w-4xl">
        	<h1 className="mt-14">Calendar</h1>
          <Tabs config={TABS_CONFIG}></Tabs>
      </div>
    </>
  )
}