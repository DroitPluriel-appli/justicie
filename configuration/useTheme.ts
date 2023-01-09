export function useTheme() {

  const localStorageDarkThemeItem = 'modeSombreEnabled'

  const isDarkThemeDefinedInLocalStorage = () => window.localStorage.getItem(localStorageDarkThemeItem) ? true : false

  const modeSombreDataAttribute = 'modeSombre'

  const body = () => document.body

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

  return { isDarkThemeDefinedInLocalStorage, toggleDarkTheme }
}
