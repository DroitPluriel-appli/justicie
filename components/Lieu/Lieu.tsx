import { ReactElement } from 'react'

import { Lieu as LieuEntity } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import Accessibilites from '../Accessibilites/Accessibilites'
import BackButton from '../BackButton/BackButton'
import Distance from '../Distance/Distance'
import Email from '../Email/Email'
import Itineraire from '../Itineraire/Itineraire'
import Preformate from '../Preformate/Preformate'
import RetourHautDePage from '../RetourHautDePage/RetourHautDePage'
import SiteInternet from '../SiteInternet/SiteInternet'
import Telephone from '../Telephone/Telephone'
import Title from '../Title/Title'
import VotreAvis from '../VotreAvis/VotreAvis'
import styles from './Lieu.module.css'

export default function Lieu({ lieu }: { lieu: LieuEntity }): ReactElement {
  const { useRouter, wording } = useDependencies()
  const { query } = useRouter()

  return (
    <article className={styles.main}>
      <Title>
        {wording.TITLE_PAGE_LIEU(lieu.nom)}
      </Title>
      <BackButton>
        {wording.RETOUR_AUX_RESULTATS}
      </BackButton>
      <section>
        <h2 className={styles.nom}>
          {lieu.nom}
        </h2>
        <address className={styles.adresse}>
          <Distance>
            {lieu.distance}
          </Distance>
          <p>
            {lieu.adresse}
            <br />
            {lieu.codePostal + ' '}
            {lieu.ville}
          </p>
          <Itineraire
            adresse={lieu.adresse}
            codePostal={lieu.codePostal}
            hasPicto
            latitude={Number(query.lat)}
            longitude={Number(query.lon)}
            nom={lieu.nom}
            ville={lieu.ville}
          >
            {wording.LANCER_L_ITINERAIRE}
          </Itineraire>
        </address>
      </section>
      <section>
        <h2>
          {wording.ACCESSIBILITE_DU_LIEU}
        </h2>
        <Accessibilites lieu={lieu} />
      </section>
      <section>
        <h2>
          {wording.HORAIRES_ET_JOURS_D_OUVERTURE}
        </h2>
        <Preformate>
          {lieu.priseDeRendezVous}
        </Preformate>
        <Preformate>
          {lieu.horaire}
        </Preformate>
      </section>
      <section>
        <h2>
          {wording.PLUS_D_INFORMATIONS}
        </h2>
        <Preformate>
          {lieu.commentaire}
        </Preformate>
      </section>
      <section>
        <h2>
          {wording.CONTACT_ET_SITE_INTERNET}
        </h2>
        <address className={styles.contact}>
          <Email
            hasPicto
            url={lieu.eMail}
          >
            {lieu.eMail}
          </Email>
          <br />
          <Telephone
            hasPicto
            nomDuLieu={lieu.nom}
            url={lieu.telephone}
          >
            {lieu.telephone}
          </Telephone>
          <br />
          <SiteInternet url={lieu.siteInternet}>
            {wording.CONSULTER_LE_SITE_INTERNET}
          </SiteInternet>
        </address>
      </section>
      <RetourHautDePage />
      <VotreAvis />
    </article>
  )
}
