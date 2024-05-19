import Image from 'next/image'
import { ReactElement } from 'react'

import styles from './CritereDAccessibilite.module.css'
import { useDependencies } from '../../../configuration/useDependencies'

type CritereDAccessibiliteProps = Readonly<{
  description: string
  id: string
  imgSrc: string
  name: string
  title: string
}>

export default function CritereDAccessibilite({ description, id, imgSrc, name, title }: CritereDAccessibiliteProps): ReactElement {
  const { useSearchParams } = useDependencies()
  const searchParams = useSearchParams()

  return (
    <div className={styles.article}>
      <div>
        <input
          className={styles.checkbox}
          defaultChecked={searchParams.get(name) !== null}
          id={id}
          name={name}
          type="checkbox"
        />
      </div>
      <div>
        <label htmlFor={id}>
          {title}
        </label>
        <p>
          {description}
        </p>
      </div>
      <Image
        alt=""
        height="58"
        src={imgSrc}
        width="58"
      />
    </div>
  )
}
