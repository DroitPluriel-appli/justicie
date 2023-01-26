import { Wording } from './Wording'

export class WordingFr implements Wording {
  readonly JUSTICE_PLURIELLE: string = 'Justice Plurielle'
  readonly SUFFIXE_TITLE: string = ' - ' + this.JUSTICE_PLURIELLE

  // Navigation pages
  readonly RETOUR_EN_HAUT_DE_PAGE: string = 'Retour en haut de page'
  readonly ACCES_RAPIDE: string = 'Accès rapide'
  readonly EVITEMENT_ALLER_AU_CONTENU: string = 'Aller au contenu'
  readonly NOUVELLE_FENETRE: string = ' - Nouvelle fenêtre'

  // Accueil
  readonly TITLE_PAGE_ACCUEIL: string = 'Accueil' + this.SUFFIXE_TITLE
  readonly VOUS_AVEZ_UN_PROBLEME_DE_DROIT: string = 'Vous avez un problème de droit ?'
  readonly TROUVEZ_UN_CONSEIL_JURIDIQUE: string = 'Trouvez une aide juridique près de chez vous, gratuite et accessible.'
  readonly VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS: string = 'Vous avez une question de droit (travail, divorce, logement...).'
  readonly VOUS_ETES_VICTIME: string = 'Vous êtes victime (violence, viol, vol...).'
  readonly VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE: string = 'Vous voulez faire une action en justice (comment trouver un avocat, à qui vous adresser...).'
  readonly VOUS_AVEZ_RECU_UNE_DECISION: string = 'Vous avez reçu une décision de justice et vous voulez savoir comment faire (faire appel, faire respecter cette décision...).'
  readonly RECHERCHER_UNE_AIDE_JURIDIQUE_GRATUITE_ET_ACCESSIBLE: string = 'Rechercher une aide juridique gratuite et accessible'
  readonly DECOUVRIR_NOS_CRITERES: string = 'Découvrir nos critères d’accessiblité'
  readonly TITLE_A_PROPOS_DE_DROIT_PLURIEL: string = 'À propos de Justice Plurielle'
  readonly DROIT_PLURIEL_EST_UNE_ASSOCIATION: string = 'Justice Plurielle est un service gratuit d’orientation vers les lieux d’accès au droit, à l’initiative de Droit Pluriel, association qui défend une justice accessible à tous et toutes, et notamment aux personnes en situation de handicap.'
  readonly RETROUVEZ_PLUS_D_INFOS: string = 'Retrouvez plus d’information sur notre site internet : '
  readonly TITLE_NOUS_CONTACTER: string = 'Nous contacter'
  readonly SITE_DROIT_PLURIEL: string = 'https://droitpluriel.fr'
  readonly TITRE_LIEN_SITE_DROIT_PLURIEL: string = 'droitpluriel.fr'
  readonly PAR_EMAIL: string = 'Par e-mail : '
  readonly EMAIL_DROIT_PLURIEL: string = 'contact@droitpluriel.fr'
  readonly PAR_TELEPHONE: string = 'Par téléphone : '
  readonly TELEPHONE_DROIT_PLURIEL: string = '01 84 80 46 14'
  readonly TITLE_SUIVEZ_NOS_ACTUALITES: string = 'Suivez nos actualités'
  readonly LIEN_FACEBOOK: string = 'https://www.facebook.com/droitpluriel/'
  readonly TITRE_LIEN_FACEBOOK: string = 'Page Facebook Droit Pluriel'
  readonly LIEN_TWITTER: string = 'https://twitter.com/droit_pluriel'
  readonly TITRE_LIEN_TWITTER: string = 'Compte Twitter Droit Pluriel'
  readonly LIEN_YOUTUBE: string = 'https://www.youtube.com/channel/UC_S7-zSxU7WGXwHq2g-542A'
  readonly TITRE_LIEN_YOUTUBE: string = 'Chaîne Youtube de Droit Pluriel'
  readonly LIEN_LINKEDIN: string = 'https://www.linkedin.com/company/droit-pluriel/'
  readonly TITRE_LIEN_LINKEDIN: string = 'Page Linkedin de Droit Pluriel'
  readonly LIEN_INSTAGRAM: string = 'https://www.instagram.com/droitpluriel/'
  readonly TITRE_LIEN_INSTAGRAM: string = 'Page Instagram de Droit Pluriel'

  // Rechercher une aide juridique
  readonly TITLE_PAGE_RECHERCHER_UNE_AIDE_JURIDIQUE: string = 'Rechercher une aide juridique' + this.SUFFIXE_TITLE
  readonly RETOUR_A_L_ACCUEIL: string = 'Retour à l’accueil'
  readonly OU_RECHERCHEZ_VOUS: string = 'Où recherchez-vous une aide juridique ?'
  readonly OBLIGATOIRE: string = '(obligatoire)'
  readonly UTILISER_MA_POSITION_ACTUELLE: string = 'Utiliser ma position actuelle'
  readonly CHARGEMENT: string = 'Chargement...'
  readonly GEOLOCALISATION_DESACTIVEE: string = 'La géolocalisation est désactivée sur votre téléphone. Modifiez vos paramètres pour utiliser la géolocalisation.'
  readonly OU: string = 'ou'
  readonly RENSEIGNER_UNE_ADRESSE: string = 'Renseigner une adresse'

  // Renseigner une adresse
  readonly TITLE_PAGE_RENSEIGNER_UNE_ADRESSE: string = this.RENSEIGNER_UNE_ADRESSE + this.SUFFIXE_TITLE
  readonly EFFACER_L_ADRESSE: string = 'Effacer l’adresse'
  readonly NOTICE_DES_RESULTATS: string = 'Lorsque les résultats de la saisie semi-automatique sont disponibles, utilisez les flèches haut et bas pour les vérifier et la touche Entrée pour les sélectionner. Utilisateurs d’appareils tactiles, explorez par le toucher ou par des gestes de balayage.'
  readonly VALIDER_L_ADRESSE: string = 'Valider l’adresse'
  readonly API_ADRESSE_NE_REPOND_PLUS: string = 'Oups, il y a un problème. Vous pouvez réessayer plus tard ou activer la géolocalisation.'

  // Rechercher par handicap
  readonly TITLE_PAGE_RECHERCHER_PAR_HANDICAP: string = 'Rechercher par handicap' + this.SUFFIXE_TITLE
  readonly RECOMMENCER_PARCOURS: string = 'Veuillez recommencer le parcours en entier.'
  readonly MODIFIER_L_ADRESSE: string = 'Modifier l’adresse'
  readonly PASSER: string = 'Passer'
  readonly BESOIN_EN_ACCESSIBILITE: string = 'Quels sont vos besoins en accessibilité ?'
  readonly FACULTATIF: string = '(facultatif)'
  readonly SUIVANT: string = 'Suivant'

  // Résultats de la recherche en vue liste
  readonly TITLE_PAGE_ADRESSE_LISTE: string = 'Résultats de recherche en vue liste' + this.SUFFIXE_TITLE
  readonly LISTE: string = 'Liste'
  readonly AFFICHEZ_RESULTATS_EN_LISTE: string = 'Affichez les résultats en liste'
  readonly PLAN: string = 'Plan'
  readonly AFFICHEZ_RESULTATS_EN_PLAN: string = 'Affichez les résultats sur une carte'
  readonly BESOINS_D_ACCESSIBILITE: string = 'Besoins d’accessibilité '
  readonly MODIFIER_VOTRE_BESOIN_D_ACCESSIBILITE: string = 'Modifier votre besoin d’accessibilité'
  readonly LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE: (nombre: number) => string = (nombre: number): string => nombre > 1 ? `${nombre} lieux correspondent à votre recherche` : `${nombre} lieu correspond à votre recherche`
  readonly AUCUN_LIEU_NE_CORRESPOND_A_VOTRE_RECHERCHE: string = 'Aucun lieu ne correspond à votre recherche. Si vous êtes en situation de handicap, vous pouvez contacter la permanence juridique de Droit Pluriel :'
  readonly CONTACTER_CDAD: string = 'Vous n’êtes pas en situation de handicap ? Contactez le conseil départemental d’accès au droit de votre département (CDAD).'
  readonly EMAIL_DROIT_PLURIEL_ZERO_RESULTAT: string = 'agir@droitpluriel.fr'
  readonly TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT: string = '09 80 80 01 49'
  readonly LANCER_L_ITINERAIRE: string = 'Lancer l’itinéraire'
  readonly LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS: (nom: string) => string = (lieu: string): string => `Lancer l’itinéraire vers ${lieu} sur Google Maps`
  readonly PLUS_D_INFORMATIONS: string = 'Plus d’informations'
  readonly PLUS_D_INFORMATIONS_SUR: (nom: string) => string = (lieu: string): string => `Plus d’informations sur ${lieu}`
  readonly PAGINATION: string = 'Pagination'
  readonly PREMIERE_PAGE: string = 'Première page'
  readonly DERNIERE_PAGE: string = 'Dernière page'
  readonly PAGE: (numero: number) => string = (numero: number): string => `Page ${numero}`
  readonly PERMANENCE_JURIDIQUE: string = 'la permanence juridique de Droit Pluriel'
  readonly VOTRE_AVIS: string = 'Votre avis'
  readonly DONNEZ_NOUS_VOTRE_AVIS: string = 'Aidez-nous à évaluer la plateforme en répondant à ce court questionnaire'

  // Resultats par plan
  readonly TITLE_PAGE_RESULTATS_PAR_PLAN: string = 'Résultats par plan' + this.SUFFIXE_TITLE
  readonly TITRE_MARKER_POSITION: string = 'Votre position'

  // Lieu
  readonly TITLE_PAGE_LIEU: (nom: string) => string = (nom: string): string => nom + this.SUFFIXE_TITLE
  readonly RETOUR_AUX_RESULTATS: string = 'Retour aux résultats'
  readonly ACCESSIBILITE_DU_LIEU: string = 'Accessibilité du lieu'
  readonly HORAIRES_ET_JOURS_D_OUVERTURE: string = 'Horaires et jours d’ouverture'
  readonly CONTACT_ET_SITE_INTERNET: string = 'Contact et site internet'
  readonly CONSULTER_LE_SITE_INTERNET: string = 'Consulter le site internet'
  readonly KILOMETRES: string = 'kilomètres'
  readonly APPELER_LE_NUMERO: (nom: string, numero: string) => string = (nom: string, numero: string): string => `Appeler ${nom} au ${numero}`
  readonly ENVOYER_UN_EMAIL_A: string = 'Envoyer un e-mail à '

  // Nos critères d’accessibilité
  readonly TITLE_PAGE_NOS_CRITERES_D_ACCESSIBILITE: string = 'Nos critères d’accessibilité' + this.SUFFIXE_TITLE
  readonly TITLE_HANDICAP_MOTEUR_TOTAL: string = 'Accessibilité handicap moteur total'
  readonly DESCRIPTION_HANDICAP_MOTEUR_TOTAL: string = 'Le lieu permet un accès total à toute situation de handicap moteur.'
  readonly TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE: string = 'Accessibilité handicap moteur avec assistance'
  readonly DESCRIPTION_HANDICAP_MOTEUR_AVEC_ASSISTANCE: string = 'Le lieu permet un accès à toute situation de handicap moteur à la condition qu’un tiers intervienne (pour ouvrir une porte...).'
  readonly TITLE_HANDICAP_VISUEL: string = 'Accessibilité handicap visuel'
  readonly DESCRIPTION_HANDICAP_VISUEL: string = 'Le guidage au sein du lieu est simple : bande de guidage, accueil dès l’entrée...'
  readonly TITLE_LANGUE_DES_SIGNES_FRANCAISE: string = 'Langue des signes française'
  readonly DESCRIPTION_LANGUE_DES_SIGNES_FRANCAISE: string = 'Le lieu propose une consultation en langue des signes française (sur place ou en visio).'
  readonly TITLE_BOUCLE_A_INDUCTION: string = 'Boucle à induction magnétique'
  readonly DESCRIPTION_BOUCLE_A_INDUCTION: string = 'Le lieu est équipé d’une boucle à induction magnétique en état de fonctionnement.'
  readonly TITLE_ENVIRONNEMENT_CALME: string = 'Environnement calme'
  readonly DESCRIPTION_ENVIRONNEMENT_CALME: string = 'La consultation se déroule dans un environnement calme (espace isolé).'
  readonly TITLE_PERSONNEL_FORME: string = 'Personnel formé'
  readonly DESCRIPTION_PERSONNEL_FORME: string = 'Les professionnels (accueil et aide juridique) sont sensibilisés aux situations de handicap et à l’accessibilité.'

  // Politique de gestion des données
  readonly TITLE_PAGE_POLITIQUE_DE_GESTION_DES_DONNEES: string = 'Politique de gestion des données' + this.SUFFIXE_TITLE

  // Foire aux questions
  readonly TITLE_FOIRE_AUX_QUESTIONS: string = 'Foire aux questions' + this.SUFFIXE_TITLE
  readonly QUESTION_JE_NE_TROUVE_AUCUN_LIEU: string = 'Je ne trouve aucun lieu correspondant à ma recherche, comment faire ?'
  readonly REPONSE_JE_NE_TROUVE_AUCUN_LIEU: string[] = [
    'Aucun lieu ne correspond à votre recherche.',
    'Vous êtes en situation de handicap ?',
    'Contactez la permanence juridique « Agir Handicap » : ',
    'Permanence juridique « Agir Handicap »',
    '09 80 80 01 49',
    ' ou ',
    'agir@droitpluriel.fr',
    'Vous n’êtes pas en situation de handicap ?',
    'Contactez le conseil départemental d’accès au droit de votre département (CDAD).',
  ]
  readonly QUESTION_EST_CE_QUE_AIDE_GRATUITE: string = 'Est-ce que l’aide juridique apportée est entièrement gratuite ?'
  readonly REPONSE_EST_CE_QUE_AIDE_GRATUITE: string = 'Oui, tous les lieux proposés accueillent gratuitement le public.'
  readonly QUESTION_QUI_VA_ME_RECEVOIR: string = 'Qui va me recevoir dans les lieux référencés ?'
  readonly REPONSE_QUI_VA_ME_RECEVOIR: string = 'Des juristes et des avocats travaillent dans les lieux d’accès au droit. Il est conseillé dès la prise de rendez-vous d’indiquer la nature du problème (famille, logement, violences…). Vous pouvez aussi selon les lieux, avoir un rendez-vous avec un conciliateur (solution amiable des litiges).'
  readonly QUESTION_EST_CE_QUE_L_AVOCAT: string = 'Est-ce que l’avocat qui me reçoit pourra me défendre pendant toute la procédure ?'
  readonly REPONSE_EST_CE_QUE_L_AVOCAT: string = 'Non, les lieux d’accès au droit donnent une première information gratuite. Ils pourront vous conseiller pour la suite si vous avez besoin d’un avocat.'
  readonly QUESTION_JE_SUIS_ALLEE_SUR_PLACE: string = 'Je suis allée sur place, et l’accessibilité n’est pas celle annoncée. Que faire ?'
  readonly REPONSE_JE_SUIS_ALLEE_SUR_PLACE: string = 'La situation a pu changer depuis le référencement. Prévenez-nous à '
  readonly QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT: string = 'Est-ce que tous les lieux apparaissent ?'
  readonly REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT: string = 'Cette plateforme est un projet participatif. Vous pouvez nous signaler toute permanence non mentionnée à '

  // Mentions légales
  readonly TITLE_PAGE_MENTIONS_LEGALES: string = 'Mentions légales' + this.SUFFIXE_TITLE

  // Header
  readonly ACCUEIL: string = 'Accueil'
  readonly MENU: string = 'Menu'
  readonly NAVIGATION_DESKTOP: string = 'Navigation desktop'
  readonly NAVIGATION_MOBILE: string = 'Navigation mobile'
  readonly FERMER: string = 'Fermer'
  readonly MODE_SOMBRE: string = 'Mode sombre'

  // Footer
  readonly INFORMATIONS: string = 'Informations'
  readonly RECHERCHER_UNE_AIDE_JURIDIQUE: string = 'Rechercher une aide juridique'
  readonly NOS_CRITERES_D_ACCESSIBILITE: string = 'Nos critères d’accessibilité'
  readonly POLITIQUE_DE_GESTION_DES_DONNEES: string = 'Politique de gestion des données'
  readonly FOIRE_AUX_QUESTIONS: string = 'Foire aux questions'
  readonly MENTIONS_LEGALES: string = 'Mentions légales'
  readonly QUALITE_DE_SERVICE: string = 'Qualité du service'
  readonly ACCESSIBILITE: string = 'Accessibilité : partiellement conforme'
  readonly COPYRIGHT: (annee: number) => string = (annee: number): string => `© Droit Pluriel ${annee} - `
}
