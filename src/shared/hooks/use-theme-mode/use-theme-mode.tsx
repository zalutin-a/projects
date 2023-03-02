import { useEffect, useState, useMemo } from 'react'

import { themeMode } from './types';

export function useThemeMode() {
  const [theme, setTheme] = useState<themeMode>(null);
  useEffect (() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  }, []);

  const setThemeMode = useMemo(() => {
    return (themeMode: themeMode) => {
      localStorage.theme = themeMode;
      document.body.classList.remove(`${theme}`)
      document.body.classList.add(themeMode);
      setTheme(themeMode); 
    }
  }, [theme]);

  return {theme, setThemeMode};
}