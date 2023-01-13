import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './Email.module.css'

type EmailProps = Readonly<{
  children: string
  hasPicto?: boolean
  url: string
}>

export default function Email({ children, hasPicto = false, url }: EmailProps): ReactElement {
  const { wording } = useDependencies()

  return (
    <a
      className={styles.email}
      href={`mailto:${url}`}
      title={wording.ENVOYER_UN_EMAIL_A + children}
    >
      {
        hasPicto ? (
          <svg
            aria-hidden
            height="14"
            viewBox="0 0 32 32"
            width="14"
          >
            <path
              d="M29,6H3L2.92,6a.78.78,0,0,0-.21,0l-.17.07a.65.65,0,0,0-.15.1.67.67,0,0,0-.15.14l-.06.06a.36.36,0,0,0,0,.09,1.08,1.08,0,0,0-.08.19A1.29,1.29,0,0,0,2,6.9S2,7,2,7V25a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V7A1,1,0,0,0,29,6ZM16,14.81,6.2,8H27.09ZM4,24V8.91l11.43,7.91,0,0a1.51,1.51,0,0,0,.18.09l.08,0A1.09,1.09,0,0,0,16,17h0a1,1,0,0,0,.41-.1l.07,0,0,0L28,9.79V24Z"
            />
          </svg>
        ) : null
      }
      {children}
    </a>
  )
}
