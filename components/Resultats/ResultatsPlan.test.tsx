import { fireEvent, screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { LieuBuilder } from '../../backend/entities/LieuBuilder'
import usePlan from '../../components/Resultats/usePlan'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import PageResultatsParPlan from '../../pages/resultats-plan'
import Plan from './Plan'

describe('page résultats par plan', () => {
  const { wording, paths } = fakeFrontDependencies
  const { iconSizeDefault, iconSizeSelected } = usePlan()

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
  const viewCenter = { lat: 40.0, lon: 50.0 }

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(
      <Plan
        lieux={[]}
        origin={viewCenter}
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
      <Plan
        lieux={[]}
        origin={viewCenter}
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
      <Plan
        lieux={[]}
        origin={viewCenter}
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
      <Plan
        lieux={lieux}
        origin={viewCenter}
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
      <Plan
        lieux={lieux}
        origin={viewCenter}
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
      <Plan
        lieux={[lieu]}
        origin={viewCenter}
      />
    )
    const main = screen.getByRole('main')
    const markerLieuA = within(main).getByTitle(lieu.nom)
    fireEvent.click(markerLieuA)

    // THEN
    const champsCarteLieuA = [
      within(main).getByRole('heading', { level: 2, name: lieuA.nom }),
      within(main).getByText(textMatch(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      within(main).getByRole('link', { name: lieuA.telephone }),
      within(main).getByText(textMatch(lieuA.distance.toPrecision(2).toString() + ' km')),
      within(main).getByText(textMatch(' km'), { selector: 'abbr' }),
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

    expect(champsCarteLieuA[2]).toHaveAttribute('href', 'tel:' + lieuA.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuA[4]).toHaveAttribute('title', 'kilomètres')

    const googleMapUrlLieuA = new URL('https://www.google.com/maps/dir/')
    googleMapUrlLieuA.searchParams.append('api', '1')
    googleMapUrlLieuA.searchParams.append('origin', `${viewCenter.lat},${viewCenter.lon}`)
    googleMapUrlLieuA.searchParams.append('destination', 'LieuA+12+rue+du+Lieu+1000+Bourg+En+Bresse')

    expect(champsCarteLieuA[5]).toHaveAttribute('href', googleMapUrlLieuA.toString())
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
