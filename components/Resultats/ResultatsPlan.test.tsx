import { fireEvent, screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import useResultatsPlan from '../../components/Resultats/useResultatsPlan'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import { LieuModel } from '../../database/models/LieuModel'
import PageResultatsParPlan from '../../pages/resultats-plan'
import ResultatsPlan from './ResultatsPlan'

describe('page résultats par plan', () => {
  const { wording, paths } = fakeFrontDependencies
  const { iconSizeDefault, iconSizeSelected } = useResultatsPlan()

  const lieuA = new LieuModel()
  lieuA.id = 1234
  lieuA.latitude = -0.09
  lieuA.longitude = 51.500
  lieuA.nom = 'Lieu A'
  lieuA.adresse = '12 rue du Lieu A'
  lieuA.e_mail = 'contactLieuA@email.com'
  lieuA.ville = 'Paris-LieuA'
  lieuA.region = 'Ile-de-France'
  lieuA.horaire = 'Du lundi au vendredi de 8h à 20h'
  lieuA.telephone = '01 02 03 04 05'
  lieuA.departement = 'Seine-et-Marne'
  lieuA.priseDeRendezVous = 'Ce lieu est soumis à la prise de rendez-vous'
  lieuA.codePostal = '75002'
  lieuA.siteInternet = 'lieuA.fr'
  lieuA.bim = true
  lieuA.lsf = true
  lieuA.pmr = true
  lieuA.calme = true
  lieuA.forme = true
  lieuA.visuel = true
  lieuA.pmr_assiste = true
  lieuA.domaineDeDroit = 'Tout domaine'
  lieuA.commentaire = 'En partie formé'

  const lieuB = new LieuModel()
  lieuB.id = 1235
  lieuB.latitude = -0.07
  lieuB.longitude = 51.580
  lieuB.nom = 'Lieu B'
  lieuB.adresse = '34 Avenue de Lieu B'
  lieuB.e_mail = 'contactLieuB@email.com'
  lieuB.ville = 'StrasbourgB'
  lieuB.region = 'Alsace'
  lieuB.horaire = 'Lundi: 8h00 - 18h00\nMardi: 8h00-18h00\nMercredi: 8h00 - 18h00\nFermé les jeudis, vendredis, samedi et dimanche'
  lieuB.telephone = '11 22 33 44 55'
  lieuB.departement = 'Bas-Rhin'
  lieuB.priseDeRendezVous = "Ce lieu n'est pas soumis à la prise de rendez-vous"
  lieuB.codePostal = '67000'
  lieuB.siteInternet = 'siteWebDulieuC.fr'
  lieuB.bim = false
  lieuB.lsf = true
  lieuB.pmr = false
  lieuB.calme = true
  lieuB.forme = true
  lieuB.visuel = false
  lieuB.pmr_assiste = true
  lieuB.domaineDeDroit = 'Tout domaine'
  lieuB.commentaire = ''

  const lieuC = new LieuModel()
  lieuC.id = 1236
  lieuC.latitude = -0.10
  lieuC.longitude = 51.530
  lieuC.nom = 'Lieu C'
  lieuC.adresse = '13 rue du Lieu C'
  lieuC.e_mail = 'contactLieuB@email.com'
  lieuC.ville = 'Paris-LieuC'
  lieuC.region = 'Ile-de-France'
  lieuC.horaire = 'Du lundi au vendredi de 8h à 20h'
  lieuC.telephone = '01 02 03 04 05'
  lieuC.departement = 'Seine-et-Marne'
  lieuC.priseDeRendezVous = 'Ce lieu est soumis à la prise de rendez-vous'
  lieuC.codePostal = '75002'
  lieuC.siteInternet = 'lieuC.fr'
  lieuC.bim = false
  lieuC.lsf = false
  lieuC.pmr = false
  lieuC.calme = false
  lieuC.forme = false
  lieuC.visuel = false
  lieuC.pmr_assiste = true
  lieuC.domaineDeDroit = 'Domaine LieuC domaine'
  lieuC.commentaire = ''

  const lat = '48.844928'
  const lon = '2.31016'
  const moteurTotal = 'on'
  const viewCenter: L.LatLngExpression = [50, 50]

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={[]}
        viewCenter={viewCenter}
      />
    )

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_RESULTATS_PAR_PLAN)
  })

  it('affiche les liens de navigation et le titre', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
      'moteur-total': moteurTotal,
    }

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={[]}
        viewCenter={viewCenter}
      />
    )

    // THEN
    const modifierLAdresse = screen.getByRole('link', { name: wording.MODIFIER_L_ADRESSE })
    expect(modifierLAdresse).toHaveAttribute('href', paths.RECHERCHER_UNE_CONSULTATION_JURIDIQUE)
    const navigation = screen.getByRole('navigation')
    const itemsDeNavigation = within(navigation).getAllByRole('listitem')
    const vueListe = within(itemsDeNavigation[0]).getByRole('link', { name: wording.LISTE })
    expect(vueListe).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const vuePlan = within(itemsDeNavigation[1]).getByRole('link', { name: wording.PLAN })
    expect(vuePlan).toHaveAttribute('href', `${paths.RESULTATS_PLAN}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const modifierAccessibilite = screen.getByRole('link', { name: wording.BESOINS_D_ACCESSIBILITE(1) })
    expect(modifierAccessibilite).toHaveAttribute('href', `${paths.RECHERCHER_PAR_HANDICAP}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const titre = screen.getByText(wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(0), { selector: 'p' })
    expect(titre).toBeInTheDocument()
  })

  it('affiche un marker bleu à la position choisie', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={[]}
        viewCenter={viewCenter}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    const positionMarker = within(main).getByTitle(wording.TITRE_MARKER_POSITION)

    expect(positionMarker).toBeInTheDocument()
  })

  it('affiche plusieurs markers de lieux', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const lieux = [lieuA, lieuB, lieuC]

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={lieux}
        viewCenter={viewCenter}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    lieux.forEach((lieu) => {
      const markerLieu = within(main).getByTitle(lieu.nom)
      expect(markerLieu.tagName).toBe('IMG')
      expect(markerLieu).toHaveAttribute('src', 'marker-lieu.svg')
      expect(markerLieu).toHaveStyle({
        height: `${iconSizeDefault}px`,
        width: `${iconSizeDefault}px`,
      })
    })
  })

  it('change le marker lieu en rouge et + grand au click et le reset si click ailleur', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const lieux = [lieuA, lieuB]

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={lieux}
        viewCenter={viewCenter}
      />
    )

    const main = screen.getByRole('main')
    const markerLieuA = within(main).getByTitle(lieuA.nom)
    const markerLieuB = within(main).getByTitle(lieuB.nom)
    fireEvent.click(markerLieuA)

    // THEN
    expect(markerLieuA.tagName).toBe('IMG')
    expect(markerLieuA).toHaveAttribute('src', 'marker-lieu-selected.svg')
    expect(markerLieuA).toHaveStyle({
      height: `${iconSizeSelected}px`,
      width: `${iconSizeSelected}px`,
    })
    expect(markerLieuB.tagName).toBe('IMG')
    expect(markerLieuB).toHaveAttribute('src', 'marker-lieu.svg')
    expect(markerLieuB).toHaveStyle({
      height: `${iconSizeDefault}px`,
      width: `${iconSizeDefault}px`,
    })

    // WHEN
    fireEvent.click(markerLieuB)

    // THEN
    expect(markerLieuA.tagName).toBe('IMG')
    expect(markerLieuA).toHaveAttribute('src', 'marker-lieu.svg')
    expect(markerLieuA).toHaveStyle({
      height: `${iconSizeDefault}px`,
      width: `${iconSizeDefault}px`,
    })
    expect(markerLieuB.tagName).toBe('IMG')
    expect(markerLieuB).toHaveAttribute('src', 'marker-lieu-selected.svg')
    expect(markerLieuB).toHaveStyle({
      height: `${iconSizeSelected}px`,
      width: `${iconSizeSelected}px`,
    })
  })

  it('affiche la carte du lieu dans la popup au click sur un marker', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const lieu = lieuA

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={[lieu]}
        viewCenter={viewCenter}
      />
    )
    const main = screen.getByRole('main')
    const markerLieuA = within(main).getByTitle(lieu.nom)
    fireEvent.click(markerLieuA)

    // THEN
    const champsCarteLieuA = [
      within(main).getByRole('heading', { level: 1, name: lieuA.nom }),
      within(main).getByText(textMatch(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      within(main).getByText(new RegExp(lieuA.telephone)),
      within(main).getByRole('link', { name: wording.LANCER_L_ITINERAIRE + wording.NOUVELLE_FENETRE }),
      within(main).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(main).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
      within(main).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(main).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(main).getByTitle(wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE),
      within(main).getByTitle(wording.TITLE_BOUCLE_A_INDUCTION),
      within(main).getByTitle(wording.TITLE_ENVIRONNEMENT_CALME),
      within(main).getByTitle(wording.TITLE_PERSONNEL_FORME),
    ]
    champsCarteLieuA.forEach((champ) => expect(champ).toBeVisible())
    expect(champsCarteLieuA[3]).toHaveAttribute('href', `https://www.google.com/maps/search/?api=1&query=${lieuA.nom.replaceAll(' ', '+')}`)
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans latitude', () => {
    // GIVEN
    mockRouter.query = { lon }

    // WHEN
    renderFakeComponent(
      <PageResultatsParPlan lieux={[]} />
    )

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans longitude', () => {
    // GIVEN
    mockRouter.query = { lat }

    // WHEN
    renderFakeComponent(
      <PageResultatsParPlan lieux={[]} />
    )

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })

})
