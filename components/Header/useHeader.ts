import { KeyboardEvent, useCallback, useState } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

type HeaderState = Readonly<{
  classMenu: 'burger-menu-close' | 'burger-menu-open'
  isMenuClose: boolean
}>

export function useHeader() {
  const burgerMenuClose = 'burger-menu-close'
  const burgerMenuOpen = 'burger-menu-open'
  const { isTheGoodKeyCode } = useDependencies()
  const [state, setState] = useState<HeaderState>({
    classMenu: burgerMenuClose,
    isMenuClose: true,
  })

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isTheGoodKeyCode(event)) {
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
    keyDown: useCallback(keyDown, [state.isMenuClose, state.classMenu, isTheGoodKeyCode]),
    touchStart: useCallback(touchStart, [state.isMenuClose, state.classMenu]),
  }
}
