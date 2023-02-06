import { ReactElement } from 'react'

import { BoutonModeSombre } from './BoutonModeSombre/BoutonModeSombre'
import styles from './Header.module.css'
import LiensDEvitement from './LiensDEvitement/LiensDEvitement'
import MenuBurger from './MenuBurger/MenuBurger'
import MenuDesktop from './MenuDesktop/MenuDesktop'
import MenuMobile from './MenuMobile/MenuMobile'
import { useHeader } from './useHeader'

export default function Header(): ReactElement {
  const { classMenu, isMenuClose, touch } = useHeader()

  return (
    <>
      <LiensDEvitement />
      <header className={styles.header}>
        <MenuDesktop isMenuClose={isMenuClose} />
        <MenuMobile
          isMenuClose={isMenuClose}
          touch={touch}
        />
        <MenuBurger
          classMenu={classMenu}
          isMenuClose={isMenuClose}
          touch={touch}
        />
        <BoutonModeSombre />
      </header>
    </>
  )
}
