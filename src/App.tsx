import { Outlet } from 'react-router-dom';
import { createContext } from 'react'
import './App.scss';
import { NAVIGATION_ITEMS, Navigation, AppContextType, useThemeMode, Footer, useNotification } from './shared';

export const AppContext = createContext<AppContextType>({} as AppContextType) //todo: use theme and setThemeMode as one object

function App() {
  const { theme, setThemeMode } = useThemeMode()
  const [notificationService, notificationContainer] = useNotification();

  const getMain = () => {
    return !theme ? <p>Loading ...</p> : // TTODO change on real loader, show loader inside main
    <div className='bg-app-gray-300 dark:bg-app-gray-800 dark:text-neutral-400'>
      <Navigation config={NAVIGATION_ITEMS}></Navigation>
      <main>
        <Outlet/>
      </main>
      <Footer config={NAVIGATION_ITEMS}></Footer>
    </div>
  }

  return (
    <AppContext.Provider value={{theme, setThemeMode, notificationService}}> 
      <div id='app' className={`app`}>
        <>
          {getMain()}
          {notificationContainer}
        </>
      </div>
    </AppContext.Provider>
  )
}

export default App;
