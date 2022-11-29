import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './Accueil.module.css'
import ArrowIcon from './arrow-right.png'
import MapPinIcon from './map-pin.png'

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
          <Image
            alt=""
            height="48"
            src={MapPinIcon}
            width="31"
          />
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
          <Image
            alt=""
            height="25"
            src={ArrowIcon}
            width="25"
          />
          {wording.DECOUVRIR_NOS_CRITERES}
        </a>
      </Link>
    </>
  )
}
