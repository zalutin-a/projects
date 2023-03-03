import { setThemeMode, themeMode } from "../hooks";

export interface AppContextType {
  theme: themeMode,
  setThemeMode: setThemeMode,
}
