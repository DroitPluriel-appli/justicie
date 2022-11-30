import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './Accueil.module.css'

export default function Accueil(): ReactElement {
  const { wording, paths } = useDependencies()

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_ACCUEIL}
        </title>
      </Head>
      <h2 className={styles.title}>
        {wording.VOUS_AVEZ_UN_PROBLEME_DE_DROIT}
      </h2>
      <p className={styles.description}>
        {wording.TROUVEZ_UN_CONSEIL_JURIDIQUE}
        <br />
        <br />
        {wording.VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS}
        <br />
        {wording.VOUS_ETES_VICTIME}
        <br />
        {wording.VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE}
        <br />
        {wording.VOUS_AVEZ_RECU_UNE_DECISION}
        <br />
        {wording.JUSTICE_PLURIELLE_VOUS_PERMET}
      </p>
      <Link
        href={paths.RECHERCHER_UN_LIEU_DE_DROIT}
        legacyBehavior
      >
        <a
          className={styles.recherche}
          href={paths.RECHERCHER_UN_LIEU_DE_DROIT}
        >
          <svg
            aria-hidden
            height="48"
            viewBox="0 0 31 48"
            width="31"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.7857 14.3317C28.7857 6.42536 22.8293 0 15.5 0C8.17072 0 2.21429 6.42536 2.21429 14.3317C2.21429 25.0804 15.5 40.6064 15.5 40.6064C15.5 40.6064 28.7857 25.0804 28.7857 14.3317ZM11.0714 14.3317C11.0714 11.7042 13.0643 9.55445 15.5 9.55445C17.9357 9.55445 19.9286 11.7042 19.9286 14.3317C19.9286 16.9591 17.9579 19.1089 15.5 19.1089C13.0643 19.1089 11.0714 16.9591 11.0714 14.3317ZM0 42.995V47.7722H31V42.995H0Z"
              fill="white"
            />
          </svg>
          <span>
            {wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE_GRATUITE_ET_ACCESSIBLE}
          </span>
        </a>
      </Link>
      <Link
        href={paths.NOS_CRITERES_D_ACCESSIBILITE}
        legacyBehavior
      >
        <a
          className={styles.criteres}
          href={paths.NOS_CRITERES_D_ACCESSIBILITE}
        >
          <svg
            aria-hidden
            height="25"
            viewBox="0 0 25 25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 12.5C2.5 6.9875 6.9875 2.5 12.5 2.5C18.0125 2.5 22.5 6.9875 22.5 12.5C22.5 18.0125 18.0125 22.5 12.5 22.5C6.9875 22.5 2.5 18.0125 2.5 12.5ZM-5.46392e-07 12.5C-8.48001e-07 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 -2.44784e-07 12.5 -5.46392e-07C5.6 -8.48001e-07 -2.44784e-07 5.6 -5.46392e-07 12.5ZM12.5 11.25L7.5 11.25L7.5 13.75L12.5 13.75L12.5 17.5L17.5 12.5L12.5 7.5L12.5 11.25Z"
              fill="#343D83"
            />
          </svg>
          {wording.DECOUVRIR_NOS_CRITERES}
        </a>
      </Link>
      <div className={styles.apropos}>
        <h2 className={styles.title}>
          {wording.TITLE_A_PROPOS_DE_DROIT_PLURIEL}
        </h2>
        <p>
          {wording.DROIT_PLURIEL_EST_UNE_ASSOCIATION}
        </p>
        <p className={styles.retrouvezinfos}>
          {wording.RETROUVEZ_PLUS_D_INFOS}
          <a
            href={wording.SITE_DROIT_PLURIEL}
            rel="external noopener noreferrer"
            target="_blank"
            title={wording.TITRE_LIEN_SITE_DROIT_PLURIEL}
          >
            {wording.SITE_DROIT_PLURIEL}
          </a>
        </p>
      </div>
      <h2 className={styles.title}>
        {wording.TITLE_NOUS_CONTACTER}
      </h2>
      <address className={styles.addresse}>
        {wording.ADRESSE_NOM_DROIT_PLURIEL}
        <br />
        {wording.ADRESSE_LIEU_DROIT_PLURIEL}
        <br />
        {wording.PAR_EMAIL}
        <a href={'mailto:' + wording.EMAIL_DROIT_PLURIEL}>
          {wording.EMAIL_DROIT_PLURIEL}
        </a>
        <br />
        {wording.TELEPHONE_DROIT_PLURIEL}
      </address>
    </>
  )
}
