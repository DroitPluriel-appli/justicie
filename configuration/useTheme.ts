import { useEffect } from 'react'

export function useTheme() {

  const localStorageDarkThemeItem = 'modeSombreEnabled'
  const modeSombreDataAttribute = 'modeSombre'
  const body = () => document.body

  const isDarkThemeDefinedInLocalStorage = () => window.localStorage.getItem(localStorageDarkThemeItem) ? true : false

  const setDarkStyle = () => {
    body().dataset[modeSombreDataAttribute] = 'true'
  }

  const removeDarkStyle = () => {
    delete body().dataset[modeSombreDataAttribute]
  }

  const toggleDarkTheme = () => {
    if (isDarkThemeDefinedInLocalStorage()) {
      localStorage.removeItem(localStorageDarkThemeItem)
      removeDarkStyle()
    } else {
      localStorage.setItem(localStorageDarkThemeItem, 'true')
      setDarkStyle()
    }
  }

  const useThemeFromLocalStorage = () => {
    useEffect(() => {
      if (isDarkThemeDefinedInLocalStorage()) {
        setDarkStyle()
      }
    }, [])
  }

  return {
    toggleDarkTheme,
    useThemeFromLocalStorage,
  }
}
