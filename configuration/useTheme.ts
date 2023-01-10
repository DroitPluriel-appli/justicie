export function useTheme() {

  const localStorageDarkThemeItem = 'darkTheme'
  const darkThemeClass = 'themeDark'
  const lightThemeClass = 'themeLight'

  const isDarkThemeInLocalStorage = () => window.localStorage.getItem(localStorageDarkThemeItem) ? true : false

  const setThemeDark = () => {
    document.body.classList.add(darkThemeClass)
    document.body.classList.remove(lightThemeClass)
    localStorage.setItem(localStorageDarkThemeItem, 'true')
  }

  const setThemeLight = () => {
    document.body.classList.add(lightThemeClass)
    document.body.classList.remove(darkThemeClass)
    localStorage.removeItem(localStorageDarkThemeItem)
  }

  const toggleDarkTheme = () => {
    isDarkThemeInLocalStorage() ?
      setThemeLight() :
      setThemeDark()
  }

  const applyThemeFromLocalStorage = () => {
    isDarkThemeInLocalStorage() ?
      setThemeDark() :
      setThemeLight()
  }

  return { applyThemeFromLocalStorage, toggleDarkTheme }
}
