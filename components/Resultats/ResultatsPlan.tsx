import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'
import VotreAvis from '../VotreAvis/VotreAvis'

export default function ResultatsPlan({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { latLongQueryIsInvalid } = useQueryUtilities()

  const Plan = dynamic(() => import('../../components/Resultats/Plan'), { ssr: false })

  if (latLongQueryIsInvalid(query)) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <>
      <Plan
        latitude={Number(query.lat)}
        lieux={lieux}
        longitude={Number(query.lon)}
        nombreDeResultat={nombreDeResultat}
      />
      <VotreAvis />
    </>
  )
}
