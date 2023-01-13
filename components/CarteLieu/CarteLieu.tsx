import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import Accessibilites from '../Accessibilites/Accessibilites'
import Distance from '../Distance/Distance'
import Itineraire from '../Itineraire/Itineraire'
import PlusDInformations from '../PlusDInformations/PlusDInformations'
import Telephone from '../Telephone/Telephone'
import styles from './CarteLieu.module.css'

type CarteLieuProps = Readonly<{
  latitude: number
  lieu: Lieu
  longitude: number
}>

export default function CarteLieu({ latitude, lieu, longitude }: CarteLieuProps): ReactElement {
  const { wording } = useDependencies()

  return (
    <article className={styles.main}>
      <div className={styles.title}>
        {lieu.nom}
      </div>
      <address className={styles.adresse}>
        <Telephone
          hasPicto
          nomDuLieu={lieu.nom}
          url={lieu.telephone}
        >
          {lieu.telephone}
        </Telephone>
        <p>
          {lieu.adresse}
          <br />
          {lieu.codePostal + ' '}
          {lieu.ville}
        </p>
      </address>
      <Distance>
        {lieu.distance}
      </Distance>
      <div className={styles.carteLieu__criteres}>
        <Accessibilites lieu={lieu} />
      </div>
      <Itineraire
        adresse={lieu.adresse}
        codePostal={lieu.codePostal}
        latitude={latitude}
        longitude={longitude}
        nom={lieu.nom}
        ville={lieu.ville}
      >
        {wording.LANCER_L_ITINERAIRE}
      </Itineraire>
      <PlusDInformations
        id={lieu.id}
        latitude={latitude}
        longitude={longitude}
        nomDuLieu={lieu.nom}
      >
        {wording.PLUS_D_INFORMATIONS}
      </PlusDInformations>
    </article>
  )
}
