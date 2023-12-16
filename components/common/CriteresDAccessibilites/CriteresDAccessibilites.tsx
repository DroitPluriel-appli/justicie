import Image from 'next/image'
import { ReactElement } from 'react'

import { Lieu } from '../../../backend/entities/Lieu'
import { frontDependencies } from '../../../configuration/frontDependencies'

type AccessibilitesProps = Readonly<{
  lieu: Lieu
}>

export default function CriteresDAccessibilites({ lieu }: AccessibilitesProps): ReactElement {
  return (
    <>
      {
        frontDependencies.criteres
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
