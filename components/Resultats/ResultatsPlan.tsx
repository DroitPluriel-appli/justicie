import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'
import Title from '../Title/Title'
import VotreAvis from '../VotreAvis/VotreAvis'
import EnTete from './EnTete'

export default function ResultatsPlan({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { isLatLongQueryInvalid } = useQueryUtilities()

  const Plan = dynamic(() => import('../../components/Resultats/Plan'), { ssr: false })

  if (isLatLongQueryInvalid(query)) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_RESULTATS_PAR_PLAN}
      </Title>
      <EnTete nombreDeResultat={nombreDeResultat} />
      {
        nombreDeResultat > 0 && (
          <>
            <Plan
              latitude={Number(query.lat)}
              lieux={lieux}
              longitude={Number(query.lon)}
            />
            <VotreAvis />
          </>
        )
      }
    </>
  )
}
