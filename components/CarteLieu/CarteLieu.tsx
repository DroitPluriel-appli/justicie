import { ReactElement } from 'react'

import { LieuViewModel } from '../Lieu/LieuViewModel'
import styles from './CarteLieu.module.css'

type CarteLieuProps = Readonly<{
  latitude: number
  lieuViewModel: LieuViewModel
  longitude: number
}>

export default function CarteLieu({ latitude, lieuViewModel, longitude }: CarteLieuProps): ReactElement {
  return (
    <article className={styles.main}>
      <h2>
        {lieuViewModel.nom}
      </h2>
      <address className={styles.adresse}>
        {lieuViewModel.telephone}
        {lieuViewModel.adresse}
      </address>
      {lieuViewModel.distance}
      <div className={styles.carteLieu__criteres}>
        {lieuViewModel.accessibilites}
      </div>
      {lieuViewModel.itineraire(latitude, longitude)}
      {lieuViewModel.plusDInformations(latitude, longitude)}
    </article>
  )
}
