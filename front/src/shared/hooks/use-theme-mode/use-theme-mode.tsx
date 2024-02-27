import { useState, useCallback } from 'react'

import { themeMode } from './types';

export function useThemeMode() {
  const [theme, setTheme] = useState<themeMode>(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark'
    } else {
      return 'light'
    }
  });

  const setThemeMode = useCallback((themeMode: themeMode) => {
    localStorage.theme = themeMode;
    document.body.classList.remove(`${theme}`)
    document.body.classList.add(themeMode);
    setTheme(themeMode);
  }, [theme])

  return {theme, setThemeMode};
}
