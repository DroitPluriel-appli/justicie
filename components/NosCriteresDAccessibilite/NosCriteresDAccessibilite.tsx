import Head from 'next/head'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import CritereDAccessibilite from './CritereDAccessibilite'
import styles from './NosCriteresDAccessibilite.module.css'

export default function NosCriteresDAccessibilite(): ReactElement {
  const { wording } = useDependencies()
  const criteres = [
    {
      description: wording.DESCRIPTION_HANDICAP_MOTEUR_TOTAL,
      imgSrc: '/pictos_criteres_accessibilite/handicap_moteur_total.png',
      title: wording.TITLE_HANDICAP_MOTEUR_TOTAL,
    },
    {
      description: wording.DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE,
      imgSrc: '/pictos_criteres_accessibilite/handicap_moteur_avec_assistance.png',
      title: wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE,
    },
    {
      description: wording.DESCRIPTION_HANDICAP_VISUEL,
      imgSrc: '/pictos_criteres_accessibilite/handicap_visuel.png',
      title: wording.TITLE_HANDICAP_VISUEL,
    },
    {
      description: wording.DESCRIPTION_LANGUE_DES_SIGNES_FRANCAISE,
      imgSrc: '/pictos_criteres_accessibilite/langue_des_signes_fr.png',
      title: wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE,
    },
    {
      description: wording.DESCRIPTION_BOUCLE_A_INDUCTION,
      imgSrc: '/pictos_criteres_accessibilite/boucle_a_induction_magnetique.png',
      title: wording.TITLE_BOUCLE_A_INDUCTION,
    },
    {
      description: wording.DESCRIPTION_ENVIRONNEMENT_CALME,
      imgSrc: '/pictos_criteres_accessibilite/environnenent_calme.png',
      title: wording.TITLE_ENVIRONNEMENT_CALME,
    },
    {
      description: wording.DESCRIPTION_PERSONNEL_FORME,
      imgSrc: '/pictos_criteres_accessibilite/personnel_forme.png',
      title: wording.TITLE_PERSONNEL_FORME,
    },
  ]

  return (
    <>
      <Head>
        <title>
          {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
        </title>
      </Head>
      <h2 className={styles.title}>
        {wording.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE}
      </h2>
      {
        criteres.map((critere) => (
          <CritereDAccessibilite
            description={critere.description}
            imgSrc={critere.imgSrc}
            key={critere.title}
            title={critere.title}
          />
        ))
      }
    </>
  )
}
