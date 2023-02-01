export interface Wording {
  readonly JUSTICE_PLURIELLE: string
  readonly SUFFIXE_TITLE: string

  // Navigation pages
  readonly RETOUR_EN_HAUT_DE_PAGE: string
  readonly ACCES_RAPIDE: string
  readonly EVITEMENT_ALLER_AU_CONTENU: string
  readonly NOUVELLE_FENETRE: string

  // Accueil
  readonly TITLE_PAGE_ACCUEIL: string
  readonly VOUS_AVEZ_UN_PROBLEME_DE_DROIT: string
  readonly TROUVEZ_UN_CONSEIL_JURIDIQUE: string
  readonly VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS: string
  readonly VOUS_ETES_VICTIME: string
  readonly VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE: string
  readonly VOUS_AVEZ_RECU_UNE_DECISION: string
  readonly RECHERCHER_UNE_AIDE_JURIDIQUE_GRATUITE_ET_ACCESSIBLE: string
  readonly DECOUVRIR_NOS_CRITERES: string
  readonly TITLE_A_PROPOS_DE_DROIT_PLURIEL: string
  readonly DROIT_PLURIEL_EST_UNE_ASSOCIATION: string
  readonly RETROUVEZ_PLUS_D_INFOS: string
  readonly TITLE_NOUS_CONTACTER: string
  readonly SITE_DROIT_PLURIEL: string
  readonly TITRE_LIEN_SITE_DROIT_PLURIEL: string
  readonly PAR_EMAIL: string
  readonly EMAIL_DROIT_PLURIEL: string
  readonly PAR_TELEPHONE: string
  readonly TELEPHONE_DROIT_PLURIEL: string
  readonly TITLE_SUIVEZ_NOS_ACTUALITES: string
  readonly LIEN_FACEBOOK: string
  readonly TITRE_LIEN_FACEBOOK: string
  readonly LIEN_TWITTER: string
  readonly TITRE_LIEN_TWITTER: string
  readonly LIEN_YOUTUBE: string
  readonly TITRE_LIEN_YOUTUBE: string
  readonly LIEN_LINKEDIN: string
  readonly TITRE_LIEN_LINKEDIN: string
  readonly LIEN_INSTAGRAM: string
  readonly TITRE_LIEN_INSTAGRAM: string

  // Rechercher une aide juridique
  readonly TITLE_PAGE_RECHERCHER_UNE_AIDE_JURIDIQUE: string
  readonly RETOUR_A_L_ACCUEIL: string
  readonly OU_RECHERCHEZ_VOUS: string
  readonly OBLIGATOIRE: string
  readonly UTILISER_MA_POSITION_ACTUELLE: string
  readonly CHARGEMENT: string
  readonly GEOLOCALISATION_DESACTIVEE: string
  readonly OU: string
  readonly RENSEIGNER_UNE_ADRESSE: string

  // Renseigner une adresse
  readonly TITLE_PAGE_RENSEIGNER_UNE_ADRESSE: string
  readonly EFFACER_L_ADRESSE: string
  readonly NOTICE_DES_RESULTATS: string
  readonly VALIDER_L_ADRESSE: string
  readonly API_ADRESSE_NE_REPOND_PLUS: string

  // Rechercher par handicap
  readonly TITLE_PAGE_RECHERCHER_PAR_HANDICAP: string
  readonly MODIFIER_L_ADRESSE: string
  readonly PASSER: string
  readonly BESOIN_EN_ACCESSIBILITE: string
  readonly FACULTATIF: string
  readonly SUIVANT: string

  // Résultats de la recherche en vue liste
  readonly TITLE_PAGE_ADRESSE_LISTE: string
  readonly LISTE: string
  readonly AFFICHEZ_RESULTATS_EN_LISTE: string
  readonly PLAN: string
  readonly AFFICHEZ_RESULTATS_EN_PLAN: string
  readonly BESOINS_D_ACCESSIBILITE: string
  readonly MODIFIER_VOTRE_BESOIN_D_ACCESSIBILITE: string
  readonly LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE: (nombre: number) => string
  readonly AUCUN_LIEU_NE_CORRESPOND_A_VOTRE_RECHERCHE: string
  readonly CONTACTER_LA_PERMANENCE: string
  readonly CONTACTER_CDAD: string
  readonly EMAIL_DROIT_PLURIEL_ZERO_RESULTAT: string
  readonly TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT: string
  readonly LANCER_L_ITINERAIRE: string
  readonly LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS: (nom: string) => string
  readonly PLUS_D_INFORMATIONS: string
  readonly PLUS_D_INFORMATIONS_SUR: (nom: string) => string
  readonly PAGINATION: string
  readonly PREMIERE_PAGE: string
  readonly DERNIERE_PAGE: string
  readonly PAGE: (numero: number) => string
  readonly PERMANENCE_JURIDIQUE: string
  readonly VOTRE_AVIS: string
  readonly DONNEZ_NOUS_VOTRE_AVIS: string

  // Resultats par plan
  readonly TITLE_PAGE_RESULTATS_PAR_PLAN: string
  readonly TITRE_MARKER_POSITION: string

  // Lieu
  readonly TITLE_PAGE_LIEU: (nom: string) => string
  readonly RETOUR_AUX_RESULTATS: string
  readonly ACCESSIBILITE_DU_LIEU: string
  readonly HORAIRES_ET_JOURS_D_OUVERTURE: string
  readonly CONTACT_ET_SITE_INTERNET: string
  readonly CONSULTER_LE_SITE_INTERNET: string
  readonly KILOMETRES: string
  readonly APPELER_LE_NUMERO: (nom: string, numero: string) => string
  readonly ENVOYER_UN_EMAIL_A: string

  // Nos critères d'accessibilité
  readonly TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE: string
  readonly TITLE_HANDICAP_MOTEUR_TOTAL: string
  readonly DESCRIPTION_HANDICAP_MOTEUR_TOTAL: string
  readonly TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE: string
  readonly DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE: string
  readonly TITLE_HANDICAP_VISUEL: string
  readonly DESCRIPTION_HANDICAP_VISUEL: string
  readonly TITLE_LANGUE_DES_SIGNES_FRANCAISE: string
  readonly DESCRIPTION_LANGUE_DES_SIGNES_FRANCAISE: string
  readonly TITLE_BOUCLE_A_INDUCTION: string
  readonly DESCRIPTION_BOUCLE_A_INDUCTION: string
  readonly TITLE_ENVIRONNEMENT_CALME: string
  readonly DESCRIPTION_ENVIRONNEMENT_CALME: string
  readonly TITLE_PERSONNEL_FORME: string
  readonly DESCRIPTION_PERSONNEL_FORME: string

  // Politique de gestion des données
  readonly TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES: string

  // Foire aux questions
  readonly TITLE_FOIRE_AUX_QUESTIONS: string
  readonly QUESTION_JE_NE_TROUVE_AUCUN_LIEU: string
  readonly REPONSE_JE_NE_TROUVE_AUCUN_LIEU: string[]
  readonly QUESTION_EST_CE_QUE_AIDE_GRATUITE: string
  readonly REPONSE_EST_CE_QUE_AIDE_GRATUITE: string
  readonly QUESTION_QUI_VA_ME_RECEVOIR: string
  readonly REPONSE_QUI_VA_ME_RECEVOIR: string
  readonly QUESTION_EST_CE_QUE_L_AVOCAT: string
  readonly REPONSE_EST_CE_QUE_L_AVOCAT: string
  readonly QUESTION_JE_SUIS_ALLEE_SUR_PLACE: string
  readonly REPONSE_JE_SUIS_ALLEE_SUR_PLACE: string
  readonly QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT: string
  readonly REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT: string

  // Mentions légales
  readonly TITLE_PAGE_MENTIONS_LEGALES: string

  // Header
  readonly ACCUEIL: string
  readonly MENU: string
  readonly NAVIGATION_DESKTOP: string
  readonly NAVIGATION_MOBILE: string
  readonly FERMER: string
  readonly MODE_SOMBRE: string

  // Footer
  readonly INFORMATIONS: string
  readonly RECHERCHER_UNE_AIDE_JURIDIQUE: string
  readonly NOS_CRITERES_D_ACCESSIBILITE: string
  readonly POLITIQUE_DE_GESTION_DES_DONNEES: string
  readonly FOIRE_AUX_QUESTIONS: string
  readonly MENTIONS_LEGALES: string
  readonly QUALITE_DE_SERVICE: string
  readonly ACCESSIBILITE: string
  readonly COPYRIGHT: (annee: number) => string
}
