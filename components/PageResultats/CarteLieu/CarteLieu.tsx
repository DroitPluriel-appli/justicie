import { ReactElement } from 'react'

import styles from './CarteLieu.module.css'
import { Lieu } from '../../../backend/entities/Lieu'
import { frontDependencies } from '../../../configuration/frontDependencies'
import CriteresDAccessibilites from '../../common/CriteresDAccessibilites/CriteresDAccessibilites'
import Distance from '../../common/Distance/Distance'
import Itineraire from '../../common/Itineraire/Itineraire'
import PlusDInformations from '../../common/PlusDInformations/PlusDInformations'
import Telephone from '../../common/Telephone/Telephone'

type CarteLieuProps = Readonly<{
  latitude: number
  lieu: Lieu
  longitude: number
}>

export default function CarteLieu({ latitude, lieu, longitude }: CarteLieuProps): ReactElement {
  return (
    <article className={styles.main}>
      <div className={styles.title}>
        {lieu.nom}
      </div>
      <address className={styles.adresse}>
        <Telephone
          hasPicto={true}
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
        <CriteresDAccessibilites lieu={lieu} />
      </div>
      <Itineraire
        adresse={lieu.adresse}
        codePostal={lieu.codePostal}
        latitude={latitude}
        longitude={longitude}
        nom={lieu.nom}
        ville={lieu.ville}
      >
        {frontDependencies.wording.LANCER_L_ITINERAIRE}
      </Itineraire>
      <PlusDInformations
        id={lieu.id}
        latitude={latitude}
        longitude={longitude}
        nomDuLieu={lieu.nom}
      >
        {frontDependencies.wording.PLUS_D_INFORMATIONS}
      </PlusDInformations>
    </article>
  )
}
