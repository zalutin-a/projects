import { ThemeSwitcher } from "../components/theme-switcher";
import { NavigationMenu, LoginSignupBtn, useNavigationConfig, NAVIGATION_ITEMS } from "../index";

export const Navigation = () => {
  const config = useNavigationConfig(NAVIGATION_ITEMS)
  
  return (
    <div className="bg-white dark:bg-app-dark px-10 text-app-gray-800 dark:text-app-gray-300 flex justify-center h-16 text-sm font-medium">
      <nav className="max-w-4xl w-full flex justify-between items-center ">
        <NavigationMenu config={config}></NavigationMenu>
        <div className="flex items-center gap-3">
          <ThemeSwitcher></ThemeSwitcher>
          <LoginSignupBtn></LoginSignupBtn>
        </div>
      </nav>
    </div>
  )
}
