import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'
import CarteLieu from '../CarteLieu/CarteLieu'
import Pagination from '../Pagination/Pagination'
import Title from '../Title/Title'
import VotreAvis from '../VotreAvis/VotreAvis'
import EnTete from './EnTete'
import styles from './ResultatsListe.module.css'

export default function ResultatsListe({ lieux, nombreDeResultat }: { lieux: Lieu[], nombreDeResultat: number }): ReactElement {
  const { nombreDeLieuxAffichesParPage, useRouter, wording } = useDependencies()
  const { query } = useRouter()
  const { latLongQueryIsInvalid } = useQueryUtilities()

  if (latLongQueryIsInvalid(query)) {
    return (
      <p>
        {wording.RECOMMENCER_PARCOURS}
      </p>
    )
  }

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_ADRESSE_LISTE}
      </Title>
      <EnTete nombreDeResultat={nombreDeResultat} />
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
