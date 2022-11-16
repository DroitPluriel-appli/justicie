import { Wording } from './Wording'

export class WordingFr implements Wording {
  // Accueil
  readonly TITLE_PAGE_ACCUEIL: string = 'Justice Plurielle'
  readonly QU_EST_CE_JUSTICE_PLURIELLE: string = 'Qu’est-ce que Justice Plurielle ?'

  // Rechercher un lieu de droit
  readonly TITLE_PAGE_RECHERCHER_UNE_CONSULTATION_JURIDIQUE: string = 'Recherche une consultation juridique'

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
