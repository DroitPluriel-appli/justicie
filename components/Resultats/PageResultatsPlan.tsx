import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import Title from '../Title/Title'
import VotreAvis from '../VotreAvis/VotreAvis'
import EnTete from './EnTete'

export default function PageResultatsPlan({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  const { useRouter, wording, rayonDeRecherche } = useDependencies()
  const { query } = useRouter()

  const Plan = dynamic(() => import('./Plan'), { ssr: false })

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_RESULTATS_PAR_PLAN}
      </Title>
      <EnTete
        nombreDeResultat={nombreDeResultat}
        rayonDeRecherche={rayonDeRecherche}
      />
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
