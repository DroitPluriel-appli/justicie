'use client'

import { ReactElement } from 'react'

import styles from './PageLieu.module.css'
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
import VotreAvis from '../common/VotreAvis/VotreAvis'

export default function PageLieu({ lieu }: { readonly lieu: Lieu }): ReactElement {
  const { useSearchParams, wording } = useDependencies()
  const searchParams = useSearchParams()

  return (
    <article className={styles.main}>
      <BackButton>
        {wording.RETOUR_AUX_RESULTATS}
      </BackButton>
      <section>
        <h1 className="titre1">
          {lieu.nom}
        </h1>
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
            latitude={Number(searchParams.get('lat'))}
            longitude={Number(searchParams.get('lon'))}
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
          {lieu.commentaire !== '' ? lieu.commentaire : wording.PAS_D_INFORMATIONS_SUPPLEMENTAIRES}
        </Preformate>
      </section>
      <section>
        <h2>
          {wording.CONTACT_ET_SITE_INTERNET}
        </h2>
        <address className={styles.contact}>
          {lieu.eMail !== '' ? (
            <Email
              hasPicto
              url={lieu.eMail}
            >
              {lieu.eMail}
            </Email>
          ) : (
            <span>
              {wording.PAS_D_E_MAIL}
            </span>
          )}
          <br />
          <Telephone
            hasPicto
            nomDuLieu={lieu.nom}
            url={lieu.telephone}
          >
            {lieu.telephone}
          </Telephone>
          <br />
          {lieu.siteInternet !== '' ? (
            <SiteInternet url={lieu.siteInternet}>
              {wording.CONSULTER_LE_SITE_INTERNET}
            </SiteInternet>
          ) : (
            <span>
              {wording.PAS_DE_SITE_INTERNET}
            </span>
          )}
        </address>
      </section>
      <RetourHautDePage />
      <VotreAvis />
    </article>
  )
}
