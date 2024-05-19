import { WordingFr } from './WordingFr'
import { Critere } from '../backend/entities/Critere'

export type CritereFront = Readonly<{
  description: string
  imgSrc: string
  name: Critere
  title: string
}>

export const criteres = (wording: WordingFr): ReadonlyArray<CritereFront> => [
  {
    description: wording.DESCRIPTION_HANDICAP_MOTEUR_TOTAL,
    imgSrc: '/pictos_criteres_accessibilite/handicap_moteur_total.png',
    name: 'pmr',
    title: wording.TITLE_HANDICAP_MOTEUR_TOTAL,
  },
  {
    description: wording.DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE,
    imgSrc: '/pictos_criteres_accessibilite/handicap_moteur_avec_assistance.png',
    name: 'pmr_assiste',
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
    name: 'lsf',
    title: wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE,
  },
  {
    description: wording.DESCRIPTION_BOUCLE_A_INDUCTION,
    imgSrc: '/pictos_criteres_accessibilite/boucle_a_induction_magnetique.png',
    name: 'bim',
    title: wording.TITLE_BOUCLE_A_INDUCTION,
  },
  {
    description: wording.DESCRIPTION_ENVIRONNEMENT_CALME,
    imgSrc: '/pictos_criteres_accessibilite/environnement_calme.png',
    name: 'calme',
    title: wording.TITLE_ENVIRONNEMENT_CALME,
  },
  {
    description: wording.DESCRIPTION_PERSONNEL_FORME,
    imgSrc: '/pictos_criteres_accessibilite/personnel_forme.png',
    name: 'forme',
    title: wording.TITLE_PERSONNEL_FORME,
  },
]
