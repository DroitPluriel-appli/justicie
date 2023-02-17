import { ReactElement, ReactNode } from 'react'

import styles from './Question.module.css'

type QuestionProps = Readonly<{
  children: ReactNode
  titre: string
}>

export default function Question({ children, titre }: QuestionProps): ReactElement {
  return (
    <div>
      <h2 className={styles.title}>
        {titre}
      </h2>
      {children}
    </div >
  )
}
