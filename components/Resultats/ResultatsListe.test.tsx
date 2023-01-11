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
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={0}
      />
    )

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
    const nombreDeResultat = 0

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
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

  it('affiche une phrase demandant de recommencer le parcours quand on arrive sans latitude', () => {
    // GIVEN
    mockRouter.query = { lon }

    // WHEN
    renderFakeComponent(
      <ResultatsListe
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
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={0}
      />
    )

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

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[lieuA, lieuB]}
        nombreDeResultat={2}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    const lists = within(main).getAllByRole('list')
    const cartesLieux = within(lists[2]).getAllByRole('article')

    const champsCarteLieuA = [
      within(cartesLieux[0]).getByText(lieuA.nom),
      within(cartesLieux[0]).getByText(textMatch(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      within(cartesLieux[0]).getByRole('link', { name: lieuA.telephone }),
      within(cartesLieux[0]).getByText(textMatch(`${lieuA.distance} km`), { selector: 'p' }),
      within(cartesLieux[0]).getByText('km', { selector: 'abbr' }),
      within(cartesLieux[0]).getByRole('link', { name: wording.LANCER_L_ITINERAIRE + wording.NOUVELLE_FENETRE }),
      within(cartesLieux[0]).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(cartesLieux[0]).getByTitle(wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE),
      within(cartesLieux[0]).getByTitle(wording.TITLE_BOUCLE_A_INDUCTION),
      within(cartesLieux[0]).getByTitle(wording.TITLE_PERSONNEL_FORME),
    ]
    champsCarteLieuA.forEach((champ) => expect(champ).toBeInTheDocument())

    expect(champsCarteLieuA[2]).toHaveAttribute('href', 'tel:' + lieuA.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuA[4]).toHaveAttribute('title', wording.KILOMETRES)
    expect(champsCarteLieuA[6]).toHaveAttribute('href', 'lieu/1?lat=48.844928&lon=2.31016')

    const googleMapUrlLieuA = new URL('https://www.google.com/maps/dir/')
    googleMapUrlLieuA.searchParams.append('api', '1')
    googleMapUrlLieuA.searchParams.append('origin', `${lat},${lon}`)
    googleMapUrlLieuA.searchParams.append('destination', 'LieuA+12+rue+du+Lieu+1000+Bourg+En+Bresse')

    expect(champsCarteLieuA[5]).toHaveAttribute('href', googleMapUrlLieuA.toString())

    const champsCarteLieuB = [
      within(cartesLieux[1]).getByText(lieuB.nom),
      within(cartesLieux[1]).getByText(textMatch(lieuB.adresse + lieuB.codePostal + ' ' + lieuB.ville)),
      within(cartesLieux[1]).getByRole('link', { name: lieuB.telephone }),
      within(cartesLieux[1]).getByText(textMatch(`${lieuA.distance} km`), { selector: 'p' }),
      within(cartesLieux[1]).getByText('km', { selector: 'abbr' }),
      within(cartesLieux[1]).getByRole('link', { name: wording.LANCER_L_ITINERAIRE + wording.NOUVELLE_FENETRE }),
      within(cartesLieux[1]).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
    ]
    champsCarteLieuB.forEach((champ) => expect(champ).toBeInTheDocument())

    expect(champsCarteLieuB[2]).toHaveAttribute('href', 'tel:' + lieuB.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuB[4]).toHaveAttribute('title', wording.KILOMETRES)
    expect(champsCarteLieuB[6]).toHaveAttribute('href', 'lieu/2?lat=48.844928&lon=2.31016')

    const googleMapUrlLieuB = new URL('https://www.google.com/maps/dir/')
    googleMapUrlLieuB.searchParams.append('api', '1')
    googleMapUrlLieuB.searchParams.append('origin', `${lat},${lon}`)
    googleMapUrlLieuB.searchParams.append('destination', 'Lieu+B+34+cours+de+Verdun+1000+Bourg+En+Bresse')

    expect(champsCarteLieuB[5]).toHaveAttribute('href', googleMapUrlLieuB.toString())
  })

  it('n’affiche pas la pagination quand il y a qu’une seule page', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const lieu = LieuBuilder.cree()

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[lieu]}
        nombreDeResultat={1}
      />
    )

    // THEN
    const navigation = screen.queryByRole('navigation', { name: wording.PAGINATION })
    expect(navigation).not.toBeInTheDocument()
  })

  it('affiche la pagination à la page 1 quand il y a deux pages', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const nombreDeResultat = 11

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })

    const page1 = within(navigation).getByText(1)
    expect(page1).toHaveAttribute('aria-current', 'page')

    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=1`)
    expect(links[0]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[0].textContent).toBe('2')

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=1`)
    expect(links[1].textContent).toBe(wording.DERNIERE_PAGE)
  })

  it('affiche la pagination à la page 2 quand il y a deux pages', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
      page: '1',
    }
    const nombreDeResultat = 19

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(2)

    expect(links[0]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=0`)
    expect(links[0].textContent).toBe(wording.PREMIERE_PAGE)

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=0`)
    expect(links[1].textContent).toBe('1')

    const page2 = within(navigation).getByText(2)
    expect(page2).toHaveAttribute('aria-current', 'page')
  })

  it('affiche la pagination à la page 1 quand il y a six pages', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const nombreDeResultat = 56

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(5)

    const page1 = within(navigation).getByText(1)
    expect(page1).toHaveAttribute('aria-current', 'page')

    expect(links[0]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=1`)
    expect(links[0]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[0].textContent).toBe('2')

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=2`)
    expect(links[1]).toHaveAttribute('title', wording.PAGE(3))
    expect(links[1].textContent).toBe('3')

    expect(links[2]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=3`)
    expect(links[2]).toHaveAttribute('title', wording.PAGE(4))
    expect(links[2].textContent).toBe('4')

    expect(links[3]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=4`)
    expect(links[3]).toHaveAttribute('title', wording.PAGE(5))
    expect(links[3].textContent).toBe('5')

    expect(links[4]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=5`)
    expect(links[4].textContent).toBe(wording.DERNIERE_PAGE)
  })

  it('affiche la pagination à la page 4 quand il y a six pages', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
      page: '3',
    }
    const nombreDeResultat = 56

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(6)

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=1`)
    expect(links[1]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[1].textContent).toBe('2')

    expect(links[2]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=2`)
    expect(links[2]).toHaveAttribute('title', wording.PAGE(3))
    expect(links[2].textContent).toBe('3')

    const page4 = within(navigation).getByText(4)
    expect(page4).toHaveAttribute('aria-current', 'page')

    expect(links[3]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=4`)
    expect(links[3]).toHaveAttribute('title', wording.PAGE(5))
    expect(links[3].textContent).toBe('5')

    expect(links[4]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=5`)
    expect(links[4]).toHaveAttribute('title', wording.PAGE(6))
    expect(links[4].textContent).toBe('6')

    expect(links[5]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=5`)
    expect(links[5].textContent).toBe(wording.DERNIERE_PAGE)
  })

  it('affiche la pagination à la page 6 quand il y a six pages', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
      page: '5',
    }
    const nombreDeResultat = 56

    // WHEN
    renderFakeComponent(
      <ResultatsListe
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(5)

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=1`)
    expect(links[1]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[1].textContent).toBe('2')

    expect(links[2]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=2`)
    expect(links[2]).toHaveAttribute('title', wording.PAGE(3))
    expect(links[2].textContent).toBe('3')

    expect(links[3]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=3`)
    expect(links[3]).toHaveAttribute('title', wording.PAGE(4))
    expect(links[3].textContent).toBe('4')

    expect(links[4]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?lat=${lat}&lon=${lon}&page=4`)
    expect(links[4]).toHaveAttribute('title', wording.PAGE(5))
    expect(links[4].textContent).toBe('5')

    const page6 = within(navigation).getByText(6)
    expect(page6).toHaveAttribute('aria-current', 'page')
  })
})
