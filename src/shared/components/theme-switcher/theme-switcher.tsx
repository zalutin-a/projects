import { useContext, useState, useMemo } from "react";
import { AppContext } from "../../../App";
import { themeMode } from "../../hooks";

import { Icon } from "../icons/icon";
import { iconType } from "../icons/types";
import { Switcher } from "../switcher";
import { ThemeSwitcherProps } from "./types";

const ICON_TYPE_MAP:{[mode: string]: Partial<iconType>}  = {
  light: 'themeDay',
  dark: 'themeNight',
}

export function ThemeSwitcher({}: ThemeSwitcherProps ) {
  const { theme, setThemeMode } = useContext(AppContext);
  const [ iconType, setIconType ] = useState(ICON_TYPE_MAP[theme])

  const onToggle = useMemo(() => (mode: themeMode) => {
    setIconType(ICON_TYPE_MAP[mode]);
    setThemeMode(mode);
  }, [setThemeMode]);

  return (
    <Switcher values={['light', 'dark']} onToggle={onToggle} isChecked={theme === 'dark'}>
      <Icon type={iconType} size={4} color={theme === 'dark' ? 'zinc-100' : 'gray-800'}></Icon>
      <span className="text-primary ml-1">Theme</span>
    </Switcher>
  )
}