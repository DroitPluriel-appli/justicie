import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import Title from '../common/Title/Title'
import VotreAvis from '../common/VotreAvis/VotreAvis'
import EnTete from './EnTete/EnTete'

export default function PageResultatsPlan({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  const { useRouter, wording, rayonDeRecherche } = useDependencies()
  const { query } = useRouter()

  // Le composant Plan contient le code pour l'affichage de la cartographie avec Leaflet, qui ne peut pas être rendu côté serveur en SSG ou SSR.
  // On est donc obligé de charger le composant dynamiquement pour qu'il soit rendu côté client ; pour cela on utilise `dynamic` de Next
  const Plan = dynamic(() => import('./Plan/Plan'), { ssr: false })

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
