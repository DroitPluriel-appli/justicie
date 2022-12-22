import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'
import EnTete from './EnTete'

export default function ResultatsListe({ lieux }: { lieux: LieuModel[] }): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()

  if (query.lat === undefined || query.lon === undefined) {
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
          return (
            <div key={lieu.id}>
              {lieu.adresse}
            </div>
          )
        })
      }
    </>
  )
}
