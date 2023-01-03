import { screen, within } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { LieuBuilder } from '../../backend/entities/LieuBuilder'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import ResultatsListe from './ResultatsListe'

describe('résultats de recherche affichés en liste', () => {
  const { paths, wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'
  const moteurTotal = 'on'

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_ADRESSE_LISTE)
  })

  it('affiche les liens de navigation et le titre', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
      'moteur-total': moteurTotal,
    }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

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

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans latitude', () => {
    // GIVEN
    mockRouter.query = { lon }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans longitude', () => {
    // GIVEN
    mockRouter.query = { lat }

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={[]} />)

    // THEN
    const recommencer = screen.getByText(wording.RECOMMENCER_PARCOURS, { selector: 'p' })
    expect(recommencer).toBeInTheDocument()
  })

  it('affiche les cartes des lieux', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }

    const lieuA = LieuBuilder.cree({ adresse: '12 rue du Lieu', bim: true, forme: true, id: 1, latitude: -0.09, longitude: 51.50, lsf: true, nom: 'LieuA' })
    const lieuB = LieuBuilder.cree({ forme: false, id: 2, nom: 'Lieu B' })
    const lieux = [lieuA, lieuB]

    // WHEN
    renderFakeComponent(<ResultatsListe lieux={lieux} />)
    const main = screen.getByRole('main')
    const cartesLieux = within(main).getAllByRole('article')

    // THEN
    const champsCarteLieuA = [
      within(cartesLieux[0]).getByRole('heading', { level: 1, name: lieuA.nom }),
      within(cartesLieux[0]).getByText(textMatch(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      within(cartesLieux[0]).getByText(new RegExp(lieuA.telephone)),
      within(cartesLieux[0]).getByRole('link', { name: wording.LANCER_L_ITINERAIRE + wording.NOUVELLE_FENETRE }),
      within(cartesLieux[0]).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(cartesLieux[0]).getByTitle(wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE),
      within(cartesLieux[0]).getByTitle(wording.TITLE_BOUCLE_A_INDUCTION),
      within(cartesLieux[0]).getByTitle(wording.TITLE_ENVIRONNEMENT_CALME),
      within(cartesLieux[0]).getByTitle(wording.TITLE_PERSONNEL_FORME),
    ]
    champsCarteLieuA.forEach((champ) => expect(champ).toBeInTheDocument())

    const googleMapUrlLieuA = new URL('https://www.google.com/maps/search/')
    googleMapUrlLieuA.searchParams.append('api', '1')
    googleMapUrlLieuA.searchParams.append('query', 'LieuA+12+rue+du+Lieu+1000+Bourg+En+Bresse')

    expect(champsCarteLieuA[3]).toHaveAttribute('href', googleMapUrlLieuA.toString())

    const champsCarteLieuB = [
      within(cartesLieux[1]).getByRole('heading', { level: 1, name: lieuB.nom }),
      within(cartesLieux[1]).getByText(textMatch(lieuB.adresse + lieuB.codePostal + ' ' + lieuB.ville)),
      within(cartesLieux[1]).getByText(new RegExp(lieuB.telephone)),
      within(cartesLieux[1]).getByRole('link', { name: wording.LANCER_L_ITINERAIRE + wording.NOUVELLE_FENETRE }),
      within(cartesLieux[1]).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(cartesLieux[1]).getByTitle(wording.TITLE_ENVIRONNEMENT_CALME),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
    ]
    champsCarteLieuB.forEach((champ) => expect(champ).toBeInTheDocument())

    const googleMapUrlLieuB = new URL('https://www.google.com/maps/search/')
    googleMapUrlLieuB.searchParams.append('api', '1')
    googleMapUrlLieuB.searchParams.append('query', 'Lieu+B+34+cours+de+Verdun+1000+Bourg+En+Bresse')

    expect(champsCarteLieuB[3]).toHaveAttribute('href', googleMapUrlLieuB.toString())
  })
})
