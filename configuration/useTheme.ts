import { useEffect } from 'react'

export function useTheme() {

  const localStorageDarkThemeItem = 'darkTheme'
  const themeDataAttribute = 'theme'
  const body = () => document.body

  const isDarkThemeInLocalStorage = () => window.localStorage.getItem(localStorageDarkThemeItem) ? true : false

  const setDarkStyle = (setDark: boolean) => {
    if (setDark) {
      body().dataset[themeDataAttribute] = 'dark'
    } else {
      body().dataset[themeDataAttribute] = 'light'
    }
  }

  const toggleDarkTheme = () => {
    if (isDarkThemeInLocalStorage()) {
      localStorage.removeItem(localStorageDarkThemeItem)
      setDarkStyle(false)
    } else {
      localStorage.setItem(localStorageDarkThemeItem, 'true')
      setDarkStyle(true)
    }
  }

  const useThemeFromLocalStorage = () => {
    useEffect(() => {
      if (isDarkThemeInLocalStorage()) {
        setDarkStyle(true)
      } else {
        setDarkStyle(false)
      }
    }, [])
  }

  return {
    toggleDarkTheme,
    useThemeFromLocalStorage,
  }
}
