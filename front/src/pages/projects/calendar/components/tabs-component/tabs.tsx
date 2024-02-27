import { NavLink } from "react-router-dom";

import { TabsProps } from "./types";

export function Tabs({config}: TabsProps) {
  return (
    <>
      <div className="">
        <nav className="flex gap-x-5">
          {config.map(item => {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({isActive}) => `${isActive ? 'bg-zinc-100 dark:bg-zinc-500 border-blue-400 border-t-4 dark:text-zinc-50':''} px-6 py-4`}
              >
                  {({ isActive }) => (
                    <span className={isActive ? "active" : ""}>{item.name}</span>
                  )}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </>
  )
}