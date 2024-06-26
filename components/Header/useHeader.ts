import { metrics } from '@sentry/nextjs'
import { useEffect, useState } from 'react'

import { applyThemeFromLocalStorage } from '../common/theme'

type HeaderState = Readonly<{
  classMenu: 'burgerMenuClose' | 'burgerMenuOpen'
  isMenuClose: boolean
}>

type UseHeader = Readonly<{
  classMenu: 'burgerMenuClose' | 'burgerMenuOpen'
  isMenuClose: boolean
  touch: () => void
}>

export function useHeader(): UseHeader {
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
    metrics.increment('burger_menu')
  }

  useEffect(() => {
    applyThemeFromLocalStorage()
  })

  return {
    classMenu: state.classMenu,
    isMenuClose: state.isMenuClose,
    touch,
  }
}
