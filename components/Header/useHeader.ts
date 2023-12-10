import { useCallback, useEffect, useState } from 'react'

import { applyThemeFromLocalStorage } from '../common/theme'

type HeaderState = Readonly<{
  classMenu: 'burgerMenuClose' | 'burgerMenuOpen'
  isMenuClose: boolean
}>

export function useHeader() {
  const burgerMenuClose = 'burgerMenuClose'
  const burgerMenuOpen = 'burgerMenuOpen'
  const [state, setState] = useState<HeaderState>({
    classMenu: burgerMenuClose,
    isMenuClose: true,
  })

  const touch = () => {
    setState({
      classMenu: state.classMenu === burgerMenuClose ? burgerMenuOpen : burgerMenuClose,
      isMenuClose: !state.isMenuClose,
    })
  }

  useEffect(() => {
    applyThemeFromLocalStorage()
  })

  return {
    classMenu: state.classMenu,
    isMenuClose: state.isMenuClose,
    touch: useCallback(touch, [state.isMenuClose, state.classMenu]),
  }
}
