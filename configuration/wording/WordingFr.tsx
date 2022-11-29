import { Wording } from './Wording'

export class WordingFr implements Wording {
  // Accueil
  readonly TITLE_PAGE_ACCUEIL: string = 'Justice Plurielle'

  readonly VOUS_AVEZ_UN_PROBLEME_DE_DROIT: string = 'Vous avez un problème de droit ?'
  readonly TROUVEZ_UN_CONSEIL_JURIDIQUE: string = 'Trouvez un conseil juridique près de chez vous, gratuit et accessible.'
  readonly VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS: string = 'Vous avez une question sur vos droits (travail, divorce, logement...).'
  readonly VOUS_ETES_VICTIME: string = 'Vous êtes victime (violence, viol, vol...).'
  readonly VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE: string = 'Vous voulez faire une action en justice (comment trouver un avocat, à qui vous adresser...).'
  readonly VOUS_AVEZ_RECU_UNE_DECISION: string = 'Vous avez reçu une décision de justice et vous voulez savoir comment faire (faire appel, faire respecter cette décision...) :'
  readonly JUSTICE_PLURIELLE_VOUS_PERMET: string = 'Justice Plurielle vous permet de trouver une réponse.'
  readonly RECHERCHER_UNE_CONSULTATION_JURIDIQUE_GRATUITE_ET_ACCESSIBLE: string = 'Rechercher une consultation juridique gratuite et accessible'
  readonly DECOUVRIR_NOS_CRITERES: string = 'Découvrir nos critères d’accessiblité'
  readonly TITLE_A_PROPOS_DE_DROIT_PLURIEL: string = 'À propos de Droit Pluriel'
  readonly DROIT_PLURIEL_EST_UNE_ASSOCIATION: string = 'Droit Pluriel est une association qui défend une justice accessible à tous et toutes, et notamment aux personnes en situation de handicap.'
  readonly RETROUVEZ_PLUS_D_INFOS: string = 'Retrouvez plus d’information sur notre site internet : '

  // Rechercher un lieu de droit
  readonly TITLE_PAGE_RECHERCHER_UNE_CONSULTATION_JURIDIQUE: string = 'Rechercher une consultation juridique'

  // Nos critères d’accessibilité
  readonly TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE: string = 'Nos critères d’accessibilité'

  // Politique de gestion des données
  readonly TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES: string = 'Politique de gestion des données'

  // Aide sur le site
  readonly TITLE_PAGE_AIDE_SUR_LE_SITE: string = 'Aide sur le site'

  // Confidentialité / Informations personnelles
  readonly TITLE_PAGE_CONFIDENTIALITE_INFORMATIONS_PERSONNELLES: string = 'Confidentialité / Informations personnelles'

  // Sécurité informatique
  readonly TITLE_PAGE_SECURITE_INFORMATIQUE: string = 'Sécurité informatique'

  // Mentions légales
  readonly TITLE_PAGE_MENTIONS_LEGALES: string = 'Mentions légales'

  // Header
  readonly JUSTICE_PLURIELLE: string = this.TITLE_PAGE_ACCUEIL
  readonly ACCUEIL: string = 'Accueil'
  readonly MENU: string = 'Menu'

  // Footer
  readonly RECHERCHER_UNE_CONSULTATION_JURIDIQUE: string = this.TITLE_PAGE_RECHERCHER_UNE_CONSULTATION_JURIDIQUE
  readonly NOS_CRITERES_D_ACCESSIBILITE: string = this.TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE
  readonly POLITIQUE_DE_GESTION_DES_DONNEES: string = this.TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES
  readonly INFORMATION: string = 'Information'
  readonly AIDE_SUR_LE_SITE: string = this.TITLE_PAGE_AIDE_SUR_LE_SITE
  readonly CONFIDENTIALITE_INFORMATIONS_PERSONNELLES: string = this.TITLE_PAGE_CONFIDENTIALITE_INFORMATIONS_PERSONNELLES
  readonly SECURITE_INFORMATIQUE: string = this.TITLE_PAGE_SECURITE_INFORMATIQUE
  readonly QUALITE_DE_SERVICE: string = 'Qualité du service'
  readonly ACCESSIBILITE: string = 'Accessibilité : 50 %'
  readonly COPYRIGHT: string = '© Droit Pluriel 2022 - '
  readonly MENTIONS_LEGALES: string = this.TITLE_PAGE_MENTIONS_LEGALES
}
