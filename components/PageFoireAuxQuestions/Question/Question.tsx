import { ReactElement, ReactNode } from 'react'

import styles from './Question.module.css'

type QuestionProps = Readonly<{
  children: ReactNode
  titre: string
}>

export default function Question({ children, titre }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className={styles.titre}>
        {titre}
      </h3>
      {children}
    </div >
  )
}
