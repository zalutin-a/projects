import { NavLink } from "react-router-dom";
import { NavigationItemType } from "../../types"

export const SubMenuItem = ({ config }: {config: NavigationItemType}) => {
  return (
    <>
      <li className="px-3 py-2">
        <NavLink
          className={`text-sm font-medium`}
          to={config.path}
        >
          {config.name}
        </NavLink>
      </li>
    </>
  )
}