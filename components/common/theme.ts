const localStorageDarkThemeItem = 'themeDark'
const darkThemeClass = 'themeDark'
const lightThemeClass = 'themeLight'

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

export const isDarkThemeInLocalStorage = (): boolean => window.localStorage.getItem(localStorageDarkThemeItem) ? true : false

export const toggleDarkTheme = () => {
  isDarkThemeInLocalStorage() ?
    setThemeLight() :
    setThemeDark()
}

export const applyThemeFromLocalStorage = () => {
  isDarkThemeInLocalStorage() ?
    setThemeDark() :
    setThemeLight()
}
