import { ReactElement } from 'react'

import ExternalLink from '../ExternalLink/ExternalLink'

type ItineraireProps = Readonly<{
  adresse: string
  children: string
  codePostal: string
  hasPicto?: boolean
  latitude: number
  longitude: number
  nom: string
  ville: string
}>

export default function Itineraire({ adresse, children, codePostal, hasPicto = false, latitude, longitude, nom, ville }: ItineraireProps): ReactElement {
  const url = new URL('https://www.google.com/maps/dir/')
  url.searchParams.append('api', '1')
  url.searchParams.append('origin', `${latitude},${longitude}`)
  url.searchParams.append('destination', `${nom}+${adresse}+${codePostal}+${ville}`.replaceAll(' ', '+'))

  return (
    <ExternalLink
      className="carteLieu__buttons"
      href={url.toString()}
      title={children}
    >
      {
        hasPicto ? (
          <svg
            aria-hidden
            height="12"
            viewBox="0 0 17 12"
            width="17"
          >
            <path
              d="M1.99361 11L1.99361 7L13.3546 7L10.2664 10.59L11.4827 12L16.6586 6L11.4827 5.11959e-07L10.2664 1.41L13.3546 5L0.268325 5L0.268324 11L1.99361 11Z"
              fill="#fff"
            />
          </svg>
        ) : null
      }
      {children}
    </ExternalLink>
  )
}
