import { useContext } from "react";
import { AppContext } from "src/App";
import { Hint, HoverPopover, Icon } from "src/shared/index";
import { viewSwitcherProps } from "./types";

export function ViewSwitcher({setViewMode}: viewSwitcherProps) {
  const { theme } = useContext(AppContext);

  return (
    <>
      <div className="flex gap-3">
        <HoverPopover rendredComponent={<Hint message="Show pages as table"></Hint>}>
          <Icon onClick={() => setViewMode('list')} type='list' color={theme === 'dark' ? 'zinc-100' : 'gray-800'}></Icon>
        </HoverPopover>
        <HoverPopover rendredComponent={<Hint message="Show pages as calendar"></Hint>}>
          <Icon onClick={() => setViewMode('tiles')} type='tiles' color={theme === 'dark' ? 'zinc-100' : 'gray-800'}></Icon>
        </HoverPopover>
      </div>
    </>
  )
}