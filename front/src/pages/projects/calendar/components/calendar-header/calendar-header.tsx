import { NavigationItemType, useNavigationConfig } from "src/shared";
import { Tabs } from "../tabs-component/tabs";
import { PermissionsEnum } from "src/shared/types/permissions";

const BASE_URL = '/projects/calendar/';
const TABS_CONFIG: NavigationItemType[] = [
  {path: BASE_URL + 'statements', name: 'Statements', children: null, neededPermisions: [PermissionsEnum.statements]},
  {path: BASE_URL + 'categories', name: 'Categories', children: null, neededPermisions: [PermissionsEnum.categories]},
  {path: BASE_URL + 'pages', name: 'Pages', children: null, neededPermisions: [PermissionsEnum.pages]},
]

export function CalendarHeader() {
  const config = useNavigationConfig(TABS_CONFIG)
  return (
    <>
      <div className="mx-auto box-content mt-8 px-2.5 md:px-10 max-w-4xl">
        	<h1 className="mt-14">Calendar</h1>
          <Tabs config={config}></Tabs>
      </div>
    </>
  )
}