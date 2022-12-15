import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

export default function AdressesListe(): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_ADRESSE_LISTE}
        </title>
      </Head>
      <div>
        {
          query.lat !== undefined && query.lon !== undefined && (
            <>
              <div>
                {'latitude '}
                {query.lat}
              </div>
              <div>
                {'longitude '}
                {query.lon}
              </div>
            </>
          )
        }
      </div>
    </>
  )
}
