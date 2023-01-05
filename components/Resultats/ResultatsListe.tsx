import Head from 'next/head'
import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import { useQueryUtilities } from '../../configuration/useQueryUtilities'
import CarteLieu from '../CarteLieu/CarteLieu'
import { LieuViewModel } from '../Lieu/LieuViewModel'
import EnTete from './EnTete'

export default function ResultatsListe({ lieux }: { lieux: Lieu[] }): ReactElement {
  const { criteres, useRouter, paths, wording } = useDependencies()
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
      <EnTete nombreDeLieuxTrouves={lieux.length} />
      {
        lieux.map((lieu) => {
          const lieuViewModel = new LieuViewModel(criteres, lieu, paths, wording)

          return (
            <CarteLieu
              key={lieu.id}
              latitude={Number(query.lat)}
              lieuViewModel={lieuViewModel}
              longitude={Number(query.lon)}
            />
          )
        })
      }
    </>
  )
}
