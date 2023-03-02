import { Outlet } from 'react-router-dom';
import { createContext } from 'react'
import './App.scss';
import { NAVIGATION_ITEMS, Navigation, AppContextType, useThemeMode } from './shared';

export const AppContext = createContext<AppContextType>({} as AppContextType)

function App() {
  const { theme, setThemeMode } = useThemeMode()

  const getMain = () => {
    return !theme ? <p>Loading ...</p> : 
    <div className='bg-app-gray-300 text-zinc-400 dark:bg-app-gray-800 dark:text-neutral-400'>
      <Navigation config={NAVIGATION_ITEMS}></Navigation>
      <main>
        <Outlet/>
      </main>
    </div>
  {/* <div id='app' className='absolute top-0 left-0'></div> */}

  }

  return (
    <AppContext.Provider value={{theme, setThemeMode}}>
      <div id='app' className={`App`}>
        {getMain()}
      </div>
    </AppContext.Provider>
  )
}

export default App;
