import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

type PlusDInformationsProps = Readonly<{
  children: string
  id: number
  latitude: number
  longitude: number
}>

export default function PlusDInformations({ children, id, latitude, longitude }: PlusDInformationsProps): ReactElement {
  const { paths } = useDependencies()

  return (
    <Link
      className="carteLieu__buttons"
      href={`${paths.LIEU}/${id}?lat=${latitude}&lon=${longitude}`}
      title={children}
    >
      {children}
    </Link>
  )
}
