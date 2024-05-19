'use client'

import dynamic from 'next/dynamic'
import { ReactElement, useEffect } from 'react'

import EnTete from './EnTete/EnTete'
import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import { frontDependencies } from '../../configuration/frontDependencies'
import { tagResultatsDeRecherche } from '../common/googleAnalyticsTags'
import VotreAvis from '../common/VotreAvis/VotreAvis'

type ResultatsPlanProps = Readonly<{
  criteresDAccessibiliteSelectionnes: ReadonlyArray<Critere>
  lieux: ReadonlyArray<Lieu>
  nombreDeResultat: number
}>

export default function PageResultatsPlan({ lieux, nombreDeResultat, criteresDAccessibiliteSelectionnes }: ResultatsPlanProps): ReactElement {
  useEffect(() => {
    tagResultatsDeRecherche('plan', nombreDeResultat, criteresDAccessibiliteSelectionnes)
  })

  // Le composant Plan contient le code pour l'affichage de la cartographie avec Leaflet, qui ne peut pas être rendu côté serveur en SSG ou SSR.
  // On est donc obligé de charger le composant dynamiquement pour qu'il soit rendu côté client ; pour cela on utilise `dynamic` de Next
  const Plan = dynamic(async () => import('./Plan/Plan'), { ssr: false })

  return (
    <>
      <EnTete
        nombreDeResultat={nombreDeResultat}
        rayonDeRecherche={frontDependencies.rayonDeRecherche}
      />
      {
        nombreDeResultat > 0 && (
          <>
            <Plan lieux={lieux} />
            <VotreAvis />
          </>
        )
      }
    </>
  )
}
