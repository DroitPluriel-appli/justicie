import Link from 'next/link'
import { ReactElement } from 'react'

import { frontDependencies } from '../../../configuration/frontDependencies'


type PlusDInformationsProps = Readonly<{
  children: string
  id: number
  latitude: number
  longitude: number
  nomDuLieu: string
}>

export default function PlusDInformations({ children, id, latitude, longitude, nomDuLieu }: PlusDInformationsProps): ReactElement {
  return (
    <Link
      className="carteLieu__buttons"
      href={`${frontDependencies.paths.LIEU}/${id}?lat=${latitude}&lon=${longitude}`}
      title={frontDependencies.wording.PLUS_D_INFORMATIONS_SUR(nomDuLieu)}
    >
      {children}
    </Link>
  )
}
