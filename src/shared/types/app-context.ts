import { NotificationService, setThemeMode, themeMode } from "../hooks";

export interface AppContextType {
  theme: themeMode, //todo change to one object theme: {curent: themeMode, setThemeMode} ?
  setThemeMode: setThemeMode,
  notificationService: NotificationService;
}
