import { ReactElement } from 'react'

import styles from './Telephone.module.css'
import { frontDependencies } from '../../../configuration/frontDependencies'

type TelephoneProps = Readonly<{
  children: string
  hasPicto?: boolean
  nomDuLieu: string
  url: string
}>

export default function Telephone({ children, hasPicto = false, nomDuLieu, url }: TelephoneProps): ReactElement {
  return (
    <a
      className={styles.telephone}
      href={`tel:${url.replace(/\s/g, '')}`}
      title={frontDependencies.wording.APPELER_LE_NUMERO(nomDuLieu, children)}
    >
      {
        hasPicto ? (
          <svg
            aria-hidden
            height="14"
            viewBox="0 0 48 48"
            width="14"
          >
            <path
              d="M 9.6666663,20.786667 C 13.506667,28.333334 19.679999,34.506666 27.24,38.346667 l 5.866667,-5.880001 c 0.733333,-0.733332 1.786666,-0.946667 2.706667,-0.653333 2.986667,0.986667 6.2,1.52 9.519999,1.52 C 46.813333,33.333333 48,34.52 48,36 v 9.333333 C 48,46.813333 46.813333,48 45.333333,48 20.293333,48 0,27.706667 0,2.6666671 0,1.1866666 1.1999998,0 2.6666671,0 H 12 c 1.48,0 2.666667,1.1866666 2.666667,2.6666671 0,3.3199988 0.533333,6.5333321 1.52,9.5199989 0.293334,0.920001 0.08001,1.973334 -0.653333,2.706667 z"
            />
          </svg>
        ) : null
      }
      {children}
    </a>
  )
}
