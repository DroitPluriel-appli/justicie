'use client'

import { ReactElement, useEffect } from 'react'

import CarteLieu from './CarteLieu/CarteLieu'
import EnTete from './EnTete/EnTete'
import styles from './PageResultatsListe.module.css'
import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import { frontDependencies } from '../../configuration/frontDependencies'
import { useDependencies } from '../../configuration/useDependencies'
import { tagResultatsDeRecherche } from '../common/googleAnalyticsTags'
import Pagination from '../common/Pagination/Pagination'
import VotreAvis from '../common/VotreAvis/VotreAvis'

type ResultatsListeProps = Readonly<{
  criteresDAccessibiliteSelectionnes: Critere[]
  lieux: Lieu[]
  nombreDeResultat: number
}>

export default function PageResultatsListe({ criteresDAccessibiliteSelectionnes, lieux, nombreDeResultat }: ResultatsListeProps): ReactElement {
  const { useSearchParams } = useDependencies()
  const searchParams = useSearchParams()

  useEffect(() => {
    tagResultatsDeRecherche('liste', nombreDeResultat, criteresDAccessibiliteSelectionnes)
  })

  return (
    <>
      <EnTete
        nombreDeResultat={nombreDeResultat}
      />
      {
        lieux.length !== 0 && (
          <ul className={styles.resultats}>
            {
              lieux.map((lieu) => {
                return (
                  <li key={lieu.id}>
                    <CarteLieu
                      latitude={Number(searchParams.get('lat'))}
                      lieu={lieu}
                      longitude={Number(searchParams.get('lon'))}
                    />
                  </li>
                )
              })
            }
          </ul>
        )
      }
      {
        nombreDeResultat > frontDependencies.nombreDeLieuxAffichesParPage && (
          <Pagination
            nombreDeResultat={nombreDeResultat}
          />
        )
      }
      {
        nombreDeResultat > 0 && (
          <VotreAvis />
        )
      }
    </>
  )
}
