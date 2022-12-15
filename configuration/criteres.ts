import { Wording } from './wording/Wording'

export type Critere = Readonly<{
  description: string
  imgSrc: string
  name: string
  title: string
}>

export const criteres = (wording: Wording): Critere[] => [
  {
    description: wording.DESCRIPTION_HANDICAP_MOTEUR_TOTAL,
    imgSrc: '/pictos_criteres_accessibilite/handicap_moteur_total.png',
    name: 'moteur-total',
    title: wording.TITLE_HANDICAP_MOTEUR_TOTAL,
  },
  {
    description: wording.DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE,
    imgSrc: '/pictos_criteres_accessibilite/handicap_moteur_avec_assistance.png',
    name: 'moteur-assistance',
    title: wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE,
  },
  {
    description: wording.DESCRIPTION_HANDICAP_VISUEL,
    imgSrc: '/pictos_criteres_accessibilite/handicap_visuel.png',
    name: 'visuel',
    title: wording.TITLE_HANDICAP_VISUEL,
  },
  {
    description: wording.DESCRIPTION_LANGUE_DES_SIGNES_FRANCAISE,
    imgSrc: '/pictos_criteres_accessibilite/langue_des_signes_fr.png',
    name: 'langue-des-signes',
    title: wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE,
  },
  {
    description: wording.DESCRIPTION_BOUCLE_A_INDUCTION,
    imgSrc: '/pictos_criteres_accessibilite/boucle_a_induction_magnetique.png',
    name: 'boucle-a-induction',
    title: wording.TITLE_BOUCLE_A_INDUCTION,
  },
  {
    description: wording.DESCRIPTION_ENVIRONNEMENT_CALME,
    imgSrc: '/pictos_criteres_accessibilite/environnement_calme.png',
    name: 'environnement-calme',
    title: wording.TITLE_ENVIRONNEMENT_CALME,
  },
  {
    description: wording.DESCRIPTION_PERSONNEL_FORME,
    imgSrc: '/pictos_criteres_accessibilite/personnel_forme.png',
    name: 'personnel-forme',
    title: wording.TITLE_PERSONNEL_FORME,
  },
]
