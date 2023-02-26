import { ReactElement, useEffect } from 'react'

import CarteLieu from './CarteLieu/CarteLieu'
import EnTete from './EnTete/EnTete'
import styles from './PageResultatsListe.module.css'
import { useDependencies } from '../../configuration/useDependencies'
import { ResultatsListeProps } from '../../pages/resultats-liste'
import { tagResultatsDeRecherche } from '../common/googleAnalyticsTags'
import Pagination from '../common/Pagination/Pagination'
import Title from '../common/Title/Title'
import VotreAvis from '../common/VotreAvis/VotreAvis'

export default function PageResultatsListe({ criteresDAccessibiliteSelectionnes, lieux, nombreDeResultat }: ResultatsListeProps): ReactElement {
  const { nombreDeLieuxAffichesParPage, useRouter, wording } = useDependencies()
  const { query } = useRouter()

  useEffect(() => {
    tagResultatsDeRecherche('liste', nombreDeResultat, criteresDAccessibiliteSelectionnes)
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
