import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'

type PlusDInformationsProps = Readonly<{
  children: string
  id: number
  latitude: number
  longitude: number
  nomDuLieu: string
}>

export default function PlusDInformations({ children, id, latitude, longitude, nomDuLieu }: PlusDInformationsProps): ReactElement {
  const { paths, wording } = useDependencies()

  return (
    <Link
      className="carteLieu__buttons"
      href={`${paths.LIEU}/${id}?lat=${latitude}&lon=${longitude}`}
      title={wording.PLUS_D_INFORMATIONS_SUR(nomDuLieu)}
    >
      {children}
    </Link>
  )
}
