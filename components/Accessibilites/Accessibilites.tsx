import Image from 'next/image'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'

type AccessibilitesProps = Readonly<{
  lieu: Lieu
}>

export default function Accessibilites({ lieu }: AccessibilitesProps): ReactElement {
  const { criteres } = useDependencies()

  return (
    <>
      {
        criteres
          .filter((critere): boolean => lieu.criteres[critere.name])
          .map((critere) => (
            <Image
              alt={critere.title}
              height="40"
              key={critere.title}
              src={critere.imgSrc}
              title={critere.title}
              width="40"
            />
          ))
      }
    </>
  )
}
