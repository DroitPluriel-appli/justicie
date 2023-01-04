import { ReactElement } from 'react'

import { Lieu as LieuEntity } from '../../backend/entities/Lieu'

export default function Lieu({ lieu }: { lieu: LieuEntity }): ReactElement {
  // eslint-disable-next-line no-console
  console.log(lieu)

  return (
    <article>
      {'hello'}
    </article>
  )
}
