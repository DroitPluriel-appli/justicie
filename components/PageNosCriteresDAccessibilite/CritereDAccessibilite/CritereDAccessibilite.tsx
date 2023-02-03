import Image from 'next/image'
import { ReactElement } from 'react'

import styles from './CritereDAccessibilite.module.css'

type CritereDAccessibiliteProps = Readonly<{
  title: string
  description: string
  imgSrc: string
}>

export default function CritereDAccessibilite({ title, description, imgSrc }: CritereDAccessibiliteProps): ReactElement {
  return (
    <article className={styles.article}>
      <header>
        <h1>
          {title}
        </h1>
      </header>
      <div>
        <Image
          alt=""
          height="58"
          src={imgSrc}
          width="58"
        />
        <p>
          {description}
        </p>
      </div>
    </article>
  )
}
