import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'
import { LieuModel } from '../database/models/EntitéJuridiqueModel'
import ExternalLink from './ExternalLink/ExternalLink'

type CarteLieuProps = Readonly<{
  lieu: LieuModel
}>

export default function CarteLieu({ lieu }: CarteLieuProps): ReactElement {
  const { nom, telephone, adresse, codePostal, ville } = lieu

  const { wording } = useDependencies()

  return (
    <article>
      <h1>
        {nom}
      </h1>
      <address>
        <a href={`tel:${telephone}`}>
          {telephone}
        </a>
        <p>
          {adresse}
          <br />
          {codePostal}
          {ville}
        </p>
      </address>
      <ExternalLink
        href="#"
        title={wording.LANCER_L_ITINERAIRE}
      >
        {wording.LANCER_L_ITINERAIRE}
      </ExternalLink>
      <Link
        href="#"
        title={wording.PLUS_D_INFORMATIONS}
      >
        {wording.PLUS_D_INFORMATIONS}
      </Link>
    </article>
  )
}
