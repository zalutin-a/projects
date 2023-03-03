import { PropsWithChildren } from "react"

import { NavLink } from "react-router-dom"
import { NavigationItemType } from "../../types"


export const NavigationItem = (props: PropsWithChildren<{config: NavigationItemType}>) => {
  const { config } = props;

  return (
    <>
      <li>
        <NavLink to={config.path}>
          <div className="flex content-center flex-wrap hover:text-gray-900 dark:hover:text-white dark:bg-app-dark bg-white flex px-3 py-2 h-full w-full">
            {config.name}
          </div>
        </NavLink>
      </li>
    </>
  )
}
