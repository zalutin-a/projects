import { NotificationService, setThemeMode, themeMode } from "../hooks";

export interface AppContextType {
  theme: themeMode,
  setThemeMode: setThemeMode,
  notificationService: NotificationService;
}
