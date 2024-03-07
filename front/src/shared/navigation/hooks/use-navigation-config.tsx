import { useContext, useMemo } from "react"
import { AppContext } from "src/App";
import { getNavigationConfig } from "../constants"
import { NavigationItemType } from "../types";

export function useNavigationConfig(config: NavigationItemType[]) {
  const { userService } = useContext(AppContext);

  return useMemo(() => getNavigationConfig(config), [userService.user])
}