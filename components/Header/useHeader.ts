import { KeyboardEvent, useCallback, useState } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

type HeaderState = Readonly<{
  classMenu: 'burgerMenuClose' | 'burgerMenuOpen'
  isMenuClose: boolean
}>

export function useHeader() {
  const burgerMenuClose = 'burgerMenuClose'
  const burgerMenuOpen = 'burgerMenuOpen'
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

  const touch = () => {
    setState({
      classMenu: state.classMenu === burgerMenuClose ? burgerMenuOpen : burgerMenuClose,
      isMenuClose: !state.isMenuClose,
    })
  }

  return {
    classMenu: state.classMenu,
    isMenuClose: state.isMenuClose,
    keyDown: useCallback(keyDown, [state.isMenuClose, state.classMenu, isTheGoodKeyCode]),
    touch: useCallback(touch, [state.isMenuClose, state.classMenu]),
  }
}
