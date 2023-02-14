import { ReactElement, useEffect } from 'react'

import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { tagResultatsDeRecherche } from '../common/googleAnalyticsTags'
import Pagination from '../common/Pagination/Pagination'
import Title from '../common/Title/Title'
import VotreAvis from '../common/VotreAvis/VotreAvis'
import CarteLieu from './CarteLieu/CarteLieu'
import EnTete from './EnTete/EnTete'
import styles from './PageResultatsListe.module.css'

export default function PageResultatsListe({ lieux, nombreDeResultat, accessibilites }:
  { lieux: Lieu[], nombreDeResultat: number, accessibilites: Critere[] }): ReactElement {
  const { nombreDeLieuxAffichesParPage, useRouter, wording } = useDependencies()
  const { query } = useRouter()

  useEffect(() => {
    tagResultatsDeRecherche(true, nombreDeResultat, accessibilites)
  })

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_ADRESSE_LISTE}
      </Title>
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
                      latitude={Number(query.lat)}
                      lieu={lieu}
                      longitude={Number(query.lon)}
                    />
                  </li>
                )
              })
            }
          </ul>
        )
      }
      {
        nombreDeResultat > nombreDeLieuxAffichesParPage && (
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
