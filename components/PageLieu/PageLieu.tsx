import { ReactElement } from 'react'

import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'
import BackButton from '../common/BackButton/BackButton'
import CriteresDAccessibilites from '../common/CriteresDAccessibilites/CriteresDAccessibilites'
import Distance from '../common/Distance/Distance'
import Email from '../common/Email/Email'
import Itineraire from '../common/Itineraire/Itineraire'
import Preformate from '../common/Preformate/Preformate'
import RetourHautDePage from '../common/RetourHautDePage/RetourHautDePage'
import SiteInternet from '../common/SiteInternet/SiteInternet'
import Telephone from '../common/Telephone/Telephone'
import Title from '../common/Title/Title'
import VotreAvis from '../common/VotreAvis/VotreAvis'
import styles from './PageLieu.module.css'

export default function PageLieu({ lieu }: { lieu: Lieu }): ReactElement {
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
        <CriteresDAccessibilites lieu={lieu} />
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
    </article >
  )
}
