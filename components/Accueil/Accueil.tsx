import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import styles from './Accueil.module.css'

export default function Accueil(): ReactElement {
  const { wording } = useDependencies()

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
      <p>
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
    </>
  )
}
