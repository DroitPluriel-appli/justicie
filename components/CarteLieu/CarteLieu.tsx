import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'
import ExternalLink from '../ExternalLink/ExternalLink'
import styles from './CarteLieu.module.css'
import { useCarteLieu } from './useCarteLieu'

type CarteLieuProps = Readonly<{
  lieu: LieuModel
}>

export default function CarteLieu({ lieu }: CarteLieuProps): ReactElement {
  const {
    nom,
    telephone,
    adresse,
    codePostal,
    ville,
  } = lieu

  const { wording } = useDependencies()
  const { getCriteresImgSrcFromLieu, nomToGoogleMapLink } = useCarteLieu()

  return (
    <article className={styles.carteLieu}>
      <h1>
        {nom}
      </h1>
      <address>
        <a href={`tel:${telephone}`}>
          {'\uD83D\uDCDE ' + telephone}
        </a>
        <p>
          {adresse}
          <br />
          {codePostal + ' '}
          {ville}
        </p>
      </address>
      <div className={styles.carteCriteres}>
        {
          getCriteresImgSrcFromLieu(lieu).map(
            (critere) => {
              return (
                critere ?
                  <Image
                    alt={critere.title}
                    height="30"
                    key={critere.title}
                    src={critere.imgSrc}
                    title={critere.title}
                    width="30"
                  /> :
                  <p>
                    {wording.CE_LIEU_N_EST_PAS_ACCESSIBLE}
                  </p>
              )
            }
          )
        }
      </div>
      <ExternalLink
        className={styles.carteButtons}
        href={nomToGoogleMapLink(nom)}
        id="lancerItineraire"
        title={wording.LANCER_L_ITINERAIRE}
      >
        {wording.LANCER_L_ITINERAIRE}
      </ExternalLink>
      <Link
        className={styles.carteButtons}
        href="#"
        id="plusDInformations"
        title={wording.PLUS_D_INFORMATIONS}
      >
        {wording.PLUS_D_INFORMATIONS}
      </Link>
    </article>
  )
}
