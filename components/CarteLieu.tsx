import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../configuration/useDependencies'
import ExternalLink from './ExternalLink/ExternalLink'

type CarteLieuProps = Readonly<{
  title: string,
  telephone: string,
  adresse: string,
  distance: string,
  categories: string[],
}>

export default function CarteLieu({
  title,
  telephone,
  adresse,
  distance,
  categories,
}: CarteLieuProps): ReactElement {

  const { wording } = useDependencies()

  return (
    <article>
      <h1>
        {title}
      </h1>
      <ul>
        {
          categories.map((categorie) => (
            <li key={categorie}>
              {categorie}
            </li>))
        }
      </ul>
      <address>
        <a href={`tel:${telephone}`}>
          {telephone}
        </a>
        <p>
          {adresse}
        </p>
      </address>
      <p>
        {distance}
      </p>
      <ExternalLink
        href="#"
        title={wording.TITRE_LANCER_ITINERAIRE}
      >
        {wording.LANCER_ITINERAIRE}
      </ExternalLink>
      <Link
        href="#"
        title={wording.TITRE_PLUS_D_INFORMATIONS}
      >
        {wording.PLUS_D_INFORMATIONS}
      </Link>
    </article>
  )
}
