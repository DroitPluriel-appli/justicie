import { fireEvent, screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { LieuBuilder } from '../../backend/entities/LieuBuilder'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import Plan from './Plan'
import ResultatsPlan from './ResultatsPlan'

describe('page résultats par plan', () => {
  const { wording, paths } = fakeFrontDependencies

  const lieuA = LieuBuilder.cree({
    adresse: '12 rue du Lieu',
    bim: true,
    forme: true,
    id: 1,
    latitude: -0.09,
    longitude: 51.50,
    lsf: true,
    nom: 'LieuA',
  })

  const lieuB = LieuBuilder.cree({
    bim: true,
    forme: true,
    id: 1,
    latitude: -0.09,
    longitude: 51.50,
    lsf: true,
    nom: 'LieuB',
  })

  const lieuC = LieuBuilder.cree({
    id: 1,
    latitude: -0.09,
    longitude: 51.50,
    nom: 'LieuC',
  })

  const lat = '48.844928'
  const lon = '2.31016'
  const moteurTotal = 'on'
  const latitude = 40.0
  const longitude = 50.0

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(
      <Plan
        latitude={latitude}
        lieux={[]}
        longitude={longitude}
        nombreDeResultat={0}
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
    const nombreDeResultat = 0

    // WHEN
    renderFakeComponent(
      <Plan
        latitude={latitude}
        lieux={[]}
        longitude={longitude}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const modifierLAdresse = screen.getByRole('link', { name: wording.MODIFIER_L_ADRESSE })
    expect(modifierLAdresse).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)
    const navigation = screen.getByRole('navigation')
    const itemsDeNavigation = within(navigation).getAllByRole('listitem')
    const vueListe = within(itemsDeNavigation[0]).getByRole('link', { name: wording.LISTE })
    expect(vueListe).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const vuePlan = within(itemsDeNavigation[1]).getByRole('link', { name: wording.PLAN })
    expect(vuePlan).toHaveAttribute('href', `${paths.RESULTATS_PLAN}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const modifierAccessibilite = screen.getByRole('link', { name: wording.BESOINS_D_ACCESSIBILITE(1) })
    expect(modifierAccessibilite).toHaveAttribute('href', `${paths.RECHERCHER_PAR_HANDICAP}?lat=${lat}&lon=${lon}&moteur-total=${moteurTotal}`)
    const titre = screen.getByText(wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(nombreDeResultat), { selector: 'p' })
    expect(titre).toBeInTheDocument()
  })

  it('affiche un marker bleu à la position choisie', () => {
    // WHEN
    renderFakeComponent(
      <Plan
        latitude={latitude}
        lieux={[]}
        longitude={longitude}
        nombreDeResultat={0}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    const positionMarker = within(main).getByTitle(wording.TITRE_MARKER_POSITION)

    expect(positionMarker).toBeInTheDocument()
  })

  it('affiche plusieurs markers de lieux', () => {
    // GIVEN
    const lieux = [lieuA, lieuB, lieuC]

    // WHEN
    renderFakeComponent(
      <Plan
        latitude={latitude}
        lieux={lieux}
        longitude={longitude}
        nombreDeResultat={3}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    lieux.forEach((lieu) => {
      const markerLieu = within(main).getByTitle(lieu.nom)
      expect(markerLieu.tagName).toBe('IMG')
      expect(markerLieu).toHaveAttribute('src', 'marker-lieu.svg')
      expect(markerLieu).toHaveStyle({
        height: '24px',
        width: '24px',
      })
    })
  })

  it('change le marker lieu en rouge et + grand au click et le reset si click ailleur', () => {
    // GIVEN
    const lieux = [lieuA, lieuB]

    // WHEN
    renderFakeComponent(
      <Plan
        latitude={latitude}
        lieux={lieux}
        longitude={longitude}
        nombreDeResultat={2}
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
      height: '38px',
      width: '38px',
    })
    expect(markerLieuB.tagName).toBe('IMG')
    expect(markerLieuB).toHaveAttribute('src', 'marker-lieu.svg')
    expect(markerLieuB).toHaveStyle({
      height: '24px',
      width: '24px',
    })

    // WHEN
    fireEvent.click(markerLieuB)

    // THEN
    expect(markerLieuA.tagName).toBe('IMG')
    expect(markerLieuA).toHaveAttribute('src', 'marker-lieu.svg')
    expect(markerLieuA).toHaveStyle({
      height: '24px',
      width: '24px',
    })
    expect(markerLieuB.tagName).toBe('IMG')
    expect(markerLieuB).toHaveAttribute('src', 'marker-lieu-selected.svg')
    expect(markerLieuB).toHaveStyle({
      height: '38px',
      width: '38px',
    })
  })

  it('affiche la carte du lieu dans la popup au click sur un marker', () => {
    // WHEN
    renderFakeComponent(
      <Plan
        latitude={latitude}
        lieux={[lieuA]}
        longitude={longitude}
        nombreDeResultat={1}
      />
    )
    const main = screen.getByRole('main')
    const markerLieuA = within(main).getByTitle(lieuA.nom)
    fireEvent.click(markerLieuA)

    // THEN
    const champsCarteLieuA = [
      within(main).getByRole('heading', { level: 2, name: lieuA.nom }),
      within(main).getByText(textMatch(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      within(main).getByRole('link', { name: lieuA.telephone }),
      within(main).getByText(textMatch(`${lieuA.distance} km`), { selector: 'p' }),
      within(main).getByText('km', { selector: 'abbr' }),
      within(main).getByRole('link', { name: wording.LANCER_L_ITINERAIRE + wording.NOUVELLE_FENETRE }),
      within(main).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(main).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
      within(main).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(main).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(main).getByTitle(wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE),
      within(main).getByTitle(wording.TITLE_BOUCLE_A_INDUCTION),
      within(main).getByTitle(wording.TITLE_PERSONNEL_FORME),
    ]
    champsCarteLieuA.forEach((champ) => expect(champ).toBeVisible())

    expect(champsCarteLieuA[2]).toHaveAttribute('href', 'tel:' + lieuA.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuA[4]).toHaveAttribute('title', wording.KILOMETRES)
    expect(champsCarteLieuA[6]).toHaveAttribute('href', 'lieu/1?lat=40&lon=50')

    const googleMapUrlLieuA = new URL('https://www.google.com/maps/dir/')
    googleMapUrlLieuA.searchParams.append('api', '1')
    googleMapUrlLieuA.searchParams.append('origin', `${latitude},${longitude}`)
    googleMapUrlLieuA.searchParams.append('destination', 'LieuA+12+rue+du+Lieu+1000+Bourg+En+Bresse')

    expect(champsCarteLieuA[5]).toHaveAttribute('href', googleMapUrlLieuA.toString())
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans latitude', () => {
    // GIVEN
    mockRouter.query = { lon }

    // WHEN
    renderFakeComponent(
      <ResultatsPlan
        lieux={[]}
        nombreDeResultat={0}
      />
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
      <ResultatsPlan
        lieux={[]}
        nombreDeResultat={0}
      />
    )

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })
})
