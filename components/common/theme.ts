/* eslint-disable @typescript-eslint/no-unused-expressions */
const localStorageDarkThemeItem = 'themeDark'
const darkThemeClass = 'themeDark'
const lightThemeClass = 'themeLight'

const setDarkTheme = () => {
  document.body.classList.add(darkThemeClass)
  document.body.classList.remove(lightThemeClass)
  localStorage.setItem(localStorageDarkThemeItem, 'true')
}

const setLightTheme = () => {
  document.body.classList.add(lightThemeClass)
  document.body.classList.remove(darkThemeClass)
  localStorage.removeItem(localStorageDarkThemeItem)
}

export const isDarkThemeInLocalStorage = (): boolean => window.localStorage.getItem(localStorageDarkThemeItem) !== null

export const toggleDarkTheme = (): void => {
  isDarkThemeInLocalStorage() ?
    setLightTheme() :
    setDarkTheme()
}

export const applyThemeFromLocalStorage = (): void => {
  isDarkThemeInLocalStorage() ?
    setDarkTheme() :
    setLightTheme()
}
