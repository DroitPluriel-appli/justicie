import Head from 'next/head'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'
import CarteLieu from '../CarteLieu/CarteLieu'
import Pagination from '../Pagination/Pagination'
import EnTete from './EnTete'

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
      <Head>
        <title>
          {wording.TITLE_PAGE_ADRESSE_LISTE}
        </title>
      </Head>
      <EnTete nombreDeResultat={nombreDeResultat} />
      <ul>
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
      {
        nombreDeResultat > nombreDeLieuxAffichesParPage && (
          <Pagination
            nombreDeResultat={nombreDeResultat}
          />
        )
      }
    </>
  )
}
