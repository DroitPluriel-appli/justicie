import { KeyboardEvent, useCallback, useState } from 'react'

type HeaderState = Readonly<{
  classMenu: 'burger-menu-close' | 'burger-menu-open'
  isMenuClose: boolean
}>

export function useHeader() {
  const burgerMenuClose = 'burger-menu-close'
  const burgerMenuOpen = 'burger-menu-open'
  const [state, setState] = useState<HeaderState>({
    classMenu: burgerMenuClose,
    isMenuClose: true,
  })

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      setState({
        classMenu: state.classMenu === burgerMenuClose ? burgerMenuOpen : burgerMenuClose,
        isMenuClose: !state.isMenuClose,
      })
    }
  }

  const touchStart = () => {
    setState({
      classMenu: state.classMenu === burgerMenuClose ? burgerMenuOpen : burgerMenuClose,
      isMenuClose: !state.isMenuClose,
    })
  }

  return {
    classMenu: state.classMenu,
    isMenuClose: state.isMenuClose,
    keyDown: useCallback(keyDown, [state.isMenuClose, state.classMenu]),
    touchStart: useCallback(touchStart, [state.isMenuClose, state.classMenu]),
  }
}
