import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import ExternalLink from '../ExternalLink/ExternalLink'
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
        href={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
        legacyBehavior
      >
        <a
          className={styles.recherche}
          href={paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE}
        >
          <svg
            aria-hidden
            height="48"
            viewBox="0 0 31 48"
            width="31"
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
          >
            <path
              d="M2.5 12.5C2.5 6.9875 6.9875 2.5 12.5 2.5C18.0125 2.5 22.5 6.9875 22.5 12.5C22.5 18.0125 18.0125 22.5 12.5 22.5C6.9875 22.5 2.5 18.0125 2.5 12.5ZM-5.46392e-07 12.5C-8.48001e-07 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 -2.44784e-07 12.5 -5.46392e-07C5.6 -8.48001e-07 -2.44784e-07 5.6 -5.46392e-07 12.5ZM12.5 11.25L7.5 11.25L7.5 13.75L12.5 13.75L12.5 17.5L17.5 12.5L12.5 7.5L12.5 11.25Z"
              fill="#343D83"
            />
          </svg>
          {wording.DECOUVRIR_NOS_CRITERES}
        </a>
      </Link>
      <div className={styles['a-propos']}>
        <h2 className={styles.title}>
          {wording.TITLE_A_PROPOS_DE_DROIT_PLURIEL}
        </h2>
        <p>
          {wording.DROIT_PLURIEL_EST_UNE_ASSOCIATION}
        </p>
        <p className={styles['retrouvez-infos']}>
          {wording.RETROUVEZ_PLUS_D_INFOS}
          <ExternalLink
            href={wording.SITE_DROIT_PLURIEL}
            title={wording.TITRE_LIEN_SITE_DROIT_PLURIEL}
          >
            {wording.SITE_DROIT_PLURIEL}
          </ExternalLink>
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
      <h2 className={styles.title}>
        {wording.TITLE_SUIVEZ_NOS_ACTUALITES}
      </h2>
      <div className={styles['reseaux-sociaux']}>
        <ExternalLink
          href={wording.LIEN_FACEBOOK}
          title={wording.TITRE_LIEN_FACEBOOK}
        >
          <svg
            aria-hidden
            viewBox="0 0 60 60"
          >
            <path
              d="M 30 6 C 16.746094 6 6 16.746094 6 30 C 6 42.03125 14.863281 51.96875 26.410156 53.703125 L 26.410156 36.359375 L 20.472656 36.359375 L 20.472656 30.050781 L 26.410156 30.050781 L 26.410156 25.855469 C 26.410156 18.902344 29.796875 15.855469 35.574219 15.855469 C 38.339844 15.855469 39.804688 16.058594 40.496094 16.152344 L 40.496094 21.65625 L 36.554688 21.65625 C 34.105469 21.65625 33.246094 23.984375 33.246094 26.605469 L 33.246094 30.050781 L 40.433594 30.050781 L 39.460938 36.359375 L 33.246094 36.359375 L 33.246094 53.753906 C 44.960938 52.164062 54 42.148438 54 30 C 54 16.746094 43.253906 6 30 6 Z M 30 6 "
            />
          </svg>
        </ExternalLink>
        <ExternalLink
          href={wording.LIEN_TWITTER}
          title={wording.TITRE_LIEN_TWITTER}
        >
          <svg
            aria-hidden
            viewBox="0 0 60 60"
          >
            <path
              d="M 56 13.875 C 54.085938 14.722656 52.03125 15.296875 49.871094 15.554688 C 52.074219 14.234375 53.765625 12.144531 54.5625 9.652344 C 52.503906 10.875 50.21875 11.761719 47.785156 12.242188 C 45.839844 10.167969 43.066406 8.871094 40 8.871094 C 34.109375 8.871094 29.332031 13.648438 29.332031 19.539062 C 29.332031 20.375 29.429688 21.191406 29.609375 21.96875 C 20.742188 21.527344 12.882812 17.277344 7.617188 10.820312 C 6.703125 12.398438 6.175781 14.230469 6.175781 16.1875 C 6.175781 19.886719 8.058594 23.152344 10.921875 25.066406 C 9.171875 25.011719 7.527344 24.53125 6.089844 23.730469 C 6.089844 23.777344 6.089844 23.820312 6.089844 23.867188 C 6.089844 29.035156 9.765625 33.347656 14.644531 34.324219 C 13.753906 34.570312 12.808594 34.699219 11.835938 34.699219 C 11.148438 34.699219 10.476562 34.632812 9.828125 34.511719 C 11.1875 38.746094 15.125 41.832031 19.792969 41.921875 C 16.144531 44.78125 11.542969 46.488281 6.542969 46.488281 C 5.683594 46.488281 4.835938 46.4375 3.996094 46.339844 C 8.71875 49.363281 14.324219 51.128906 20.351562 51.128906 C 39.976562 51.128906 50.703125 34.875 50.703125 20.777344 C 50.703125 20.3125 50.695312 19.855469 50.675781 19.394531 C 52.761719 17.890625 54.570312 16.011719 56 13.875 Z M 56 13.875 "
            />
          </svg>
        </ExternalLink>
        <ExternalLink
          href={wording.LIEN_YOUTUBE}
          title={wording.TITRE_LIEN_YOUTUBE}
        >
          <svg
            aria-hidden
            fillRule="evenodd"
            viewBox="0 0 50 50"
          >
            <path
              d="M 13 5 L 16 14 L 16 20 L 18 20 L 18 14 L 21 5 L 19 5 L 17 11 L 15 5 Z M 24 9 C 22.933594 9 22.410156 9.167969 21.757813 9.703125 C 21.132813 10.230469 20.960938 10.636719 21 12 L 21 17 C 21 17.996094 21.164063 18.652344 21.765625 19.234375 C 22.390625 19.816406 22.980469 20 24 20 C 25.066406 20 25.648438 19.816406 26.25 19.234375 C 26.875 18.675781 27 17.996094 27 17 L 27 12 C 27 11.117188 26.84375 10.28125 26.238281 9.722656 C 25.613281 9.148438 24.96875 9 24 9 Z M 29 9 L 29 18 C 29 18.972656 29.980469 20 31 20 C 32.019531 20 32.558594 19.488281 33 19 L 33 20 L 35 20 L 35 9 L 33 9 L 33 17 C 32.988281 17.683594 32.183594 18 32 18 C 31.792969 18 31 17.957031 31 17 L 31 9 Z M 24 11 C 24.300781 11 25 10.996094 25 12 L 25 17 C 25 17.96875 24.324219 18 24 18 C 23.699219 18 23 17.988281 23 17 L 23 12 C 23 11.183594 23.433594 11 24 11 Z M 10 22 C 6.40625 22 4 24.382813 4 28 L 4 37.5 C 4 41.117188 6.40625 44 10 44 L 40 44 C 43.59375 44 46 41.617188 46 38 L 46 28 C 46 24.382813 43.59375 22 40 22 Z M 12 26 L 18 26 L 18 28 L 16 28 L 16 40 L 14 40 L 14 28 L 12 28 Z M 26 26 L 28 26 L 28 30 C 28.230469 29.640625 28.574219 29.355469 28.902344 29.195313 C 29.222656 29.03125 29.546875 28.9375 29.875 28.9375 C 30.523438 28.9375 31.03125 29.171875 31.378906 29.609375 C 31.726563 30.050781 32 30.636719 32 31.5 L 32 37.5 C 32 38.242188 31.75 38.703125 31.421875 39.097656 C 31.101563 39.492188 30.621094 39.992188 30 40 C 28.949219 40.011719 28.386719 39.449219 28 39 L 28 40 L 26 40 Z M 18 29 L 20 29 L 20 37 C 20 37.230469 20.269531 38.007813 21 38 C 21.8125 37.992188 21.820313 37.234375 22 37 L 22 29 L 24 29 L 24 40 L 22 40 L 22 39 C 21.628906 39.4375 21.4375 39.574219 21.019531 39.78125 C 20.605469 40.015625 20.183594 40 19.792969 40 C 19.308594 40 18.757813 39.5625 18.5 39.234375 C 18.269531 38.933594 18 38.625 18 38 Z M 36.199219 29 C 37.148438 29 37.816406 29.203125 38.320313 29.734375 C 38.835938 30.265625 39 30.886719 39 31.886719 L 39 35 L 35 35 L 35 36.546875 C 35 37.105469 35.074219 37.460938 35.21875 37.671875 C 35.355469 37.902344 35.632813 38.003906 36 38 C 36.40625 37.996094 36.664063 37.914063 36.800781 37.730469 C 36.941406 37.566406 37 37.101563 37 36.5 L 37 36 L 39 36 L 39 36.59375 C 39 37.683594 38.914063 38.496094 38.375 39.027344 C 37.867188 39.585938 37.074219 39.84375 36.035156 39.84375 C 35.085938 39.84375 34.34375 39.5625 33.8125 38.984375 C 33.28125 38.40625 33.003906 37.613281 33.003906 36.59375 L 33.003906 31.886719 C 33.003906 30.980469 33.320313 30.308594 33.902344 29.710938 C 34.371094 29.230469 35.25 29 36.199219 29 Z M 29 30.5 C 28.449219 30.5 28.007813 30.996094 28 31.5 L 28 37.5 C 28.007813 37.789063 28.449219 38 29 38 C 29.550781 38 30 37.574219 30 37.023438 L 30 32 C 30 31 29.550781 30.5 29 30.5 Z M 36 31 C 35.449219 31 35.007813 31.464844 35 32 L 35 33 L 37 33 L 37 32 C 37 31.386719 36.550781 31 36 31 Z"
            />
          </svg>
        </ExternalLink>
        <ExternalLink
          href={wording.LIEN_LINKEDIN}
          title={wording.TITRE_LIEN_LINKEDIN}
        >
          <svg
            aria-hidden
            viewBox="0 0 30 30"
          >
            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M10.496,8.403 c0.842,0,1.403,0.561,1.403,1.309c0,0.748-0.561,1.309-1.496,1.309C9.561,11.022,9,10.46,9,9.712C9,8.964,9.561,8.403,10.496,8.403z M12,20H9v-8h3V20z M22,20h-2.824v-4.372c0-1.209-0.753-1.488-1.035-1.488s-1.224,0.186-1.224,1.488c0,0.186,0,4.372,0,4.372H14v-8 h2.918v1.116C17.294,12.465,18.047,12,19.459,12C20.871,12,22,13.116,22,15.628V20z" />
          </svg>
        </ExternalLink>
        <ExternalLink
          href={wording.LIEN_INSTAGRAM}
          title={wording.TITRE_LIEN_INSTAGRAM}
        >
          <svg
            aria-hidden
            viewBox="0 0 30 30"
          >
            <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
          </svg>
        </ExternalLink>
      </div>
    </>
  )
}
