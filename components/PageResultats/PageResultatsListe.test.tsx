import { screen, within } from '@testing-library/react'

import PageResultatsListe from './PageResultatsListe'
import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import { fakeFrontDependencies, fakeNavigation, renderFakeComponent, textMatcher } from '../../configuration/testHelper'

describe('page des résultats de recherche affichés en liste', () => {
  const { paths, wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'
  const bim = 'on'

  beforeEach(() => {
    vi.stubGlobal('dataLayer', { push: vi.fn() })
  })

  it('affiche les liens de navigation et le filtre', () => {
    // GIVEN
    const searchParams = [
      { name: 'bim', value: bim },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={0}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const modifierLAdresse = screen.getByRole('link', { name: wording.MODIFIER_L_ADRESSE })
    expect(modifierLAdresse).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)

    const navigation = screen.getByRole('navigation')
    const itemsDeNavigation = within(navigation).getAllByRole('listitem')
    const vueListe = within(itemsDeNavigation[0]).getByRole('link', { name: wording.LISTE })
    expect(vueListe).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}`)
    expect(vueListe).toHaveAttribute('title', wording.AFFICHEZ_RESULTATS_EN_LISTE)
    const vuePlan = within(itemsDeNavigation[1]).getByRole('link', { name: wording.PLAN })
    expect(vuePlan).toHaveAttribute('href', `${paths.RESULTATS_PLAN}?bim=${bim}&lat=${lat}&lon=${lon}`)
    expect(vuePlan).toHaveAttribute('title', wording.AFFICHEZ_RESULTATS_EN_PLAN)

    const modifierAccessibilite = screen.getByRole('link', { name: wording.BESOINS_D_ACCESSIBILITE + '1' })
    expect(modifierAccessibilite).toHaveAttribute('href', `${paths.RECHERCHER_PAR_HANDICAP}?bim=${bim}&lat=${lat}&lon=${lon}`)
    expect(modifierAccessibilite).toHaveAttribute('title', wording.MODIFIER_VOTRE_BESOIN_D_ACCESSIBILITE)
  })

  it('affiche une phrase du nombre de lieu trouvé', () => {
    // GIVEN
    const nombreDeResultat = 1
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[lieu]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const titre = screen.getByText(wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(nombreDeResultat, Infinity), { selector: 'p' })
    expect(titre).toBeVisible()
  })

  it('affiche une phrase quand aucun lieu n’a été trouvé', () => {
    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={0}
      />
    )

    // THEN
    const aucunLieu = screen.getByText(wording.AUCUN_LIEU_NE_CORRESPOND_A_VOTRE_RECHERCHE(Infinity), { selector: 'p' })
    expect(aucunLieu).toBeVisible()
    const permanence = screen.getByText(textMatcher(wording.CONTACTER_LA_PERMANENCE), { selector: 'p' })
    expect(permanence).toBeVisible()

    const coordonneesDroitPluriel = screen.getByText(
      textMatcher(`${wording.EMAIL_DROIT_PLURIEL_ZERO_RESULTAT}${wording.TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT}`), { selector: 'address' }
    )

    const eMail = within(coordonneesDroitPluriel).getByRole('link', { name: wording.EMAIL_DROIT_PLURIEL_ZERO_RESULTAT })
    expect(eMail).toHaveAttribute('href', 'mailto:' + wording.EMAIL_DROIT_PLURIEL_ZERO_RESULTAT)
    expect(eMail).toHaveAttribute('title', wording.ENVOYER_UN_EMAIL_A + wording.EMAIL_DROIT_PLURIEL_ZERO_RESULTAT)

    const telephone = within(coordonneesDroitPluriel).getByRole('link', { name: wording.TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT })
    expect(telephone).toHaveAttribute('href', 'tel:' + wording.TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT.replaceAll(' ', ''))
    expect(telephone).toHaveAttribute('title', wording.APPELER_LE_NUMERO(wording.PERMANENCE_JURIDIQUE, wording.TELEPHONE_DROIT_PLURIEL_ZERO_RESULTAT))

    const contacterCDAD = screen.getByText(wording.CONTACTER_CDAD, { selector: 'p' })
    expect(contacterCDAD).toBeVisible()
  })

  it('affiche les cartes des lieux', () => {
    // GIVEN
    const lieuA = Lieu.cree({
      adresse: '12 rue du Lieu',
      criteres: {
        bim: true,
        calme: false,
        forme: true,
        lsf: true,
        pmr: true,
        pmr_assiste: true,
        visuel: true,
      },
      id: 1,
      latitude: -0.09,
      longitude: 51.50,
      nom: 'LieuA',
    })
    const lieuB = Lieu.cree({
      criteres: {
        bim: true,
        calme: false,
        forme: false,
        lsf: true,
        pmr: true,
        pmr_assiste: true,
        visuel: true,
      },
      id: 2,
      nom: 'Lieu B',
    })
    const searchParams = [
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[lieuA, lieuB]}
        nombreDeResultat={2}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const lists = screen.getAllByRole('list')
    const cartesLieux = within(lists[2]).getAllByRole('article')

    const champsCarteLieuA = [
      within(cartesLieux[0]).getByText(lieuA.nom),
      within(cartesLieux[0]).getByText(textMatcher(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      within(cartesLieux[0]).getByRole('link', { name: lieuA.telephone }),
      within(cartesLieux[0]).getByText(textMatcher(`${lieuA.distance} km`), { selector: 'p' }),
      within(cartesLieux[0]).getByText('km', { selector: 'abbr' }),
      within(cartesLieux[0]).getByRole('link', { name: wording.LANCER_L_ITINERAIRE }),
      within(cartesLieux[0]).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(cartesLieux[0]).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(cartesLieux[0]).getByTitle(wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE),
      within(cartesLieux[0]).getByTitle(wording.TITLE_BOUCLE_A_INDUCTION),
      within(cartesLieux[0]).getByTitle(wording.TITLE_PERSONNEL_FORME),
    ]
    champsCarteLieuA.forEach((champ) => expect(champ).toBeVisible())

    expect(champsCarteLieuA[2]).toHaveAttribute('href', 'tel:' + lieuA.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuA[2]).toHaveAttribute('title', wording.APPELER_LE_NUMERO(lieuA.nom, lieuA.telephone))
    expect(champsCarteLieuA[4]).toHaveAttribute('title', wording.KILOMETRES)
    expect(champsCarteLieuA[6]).toHaveAttribute('href', `${paths.LIEU}/1?lat=48.844928&lon=2.31016`)
    expect(champsCarteLieuA[6]).toHaveAttribute('title', wording.PLUS_D_INFORMATIONS_SUR(lieuA.nom))
    expect(champsCarteLieuA[5]).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&origin=48.844928%2C2.31016&destination=12%2Brue%2Bdu%2BLieu%2B1000%2BBourg%2BEn%2BBresse')
    expect(champsCarteLieuA[5]).toHaveAttribute('title', wording.LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS(lieuA.nom) + wording.NOUVELLE_FENETRE)

    const champsCarteLieuB = [
      within(cartesLieux[1]).getByText(lieuB.nom),
      within(cartesLieux[1]).getByText(textMatcher(lieuB.adresse + lieuB.codePostal + ' ' + lieuB.ville)),
      within(cartesLieux[1]).getByRole('link', { name: lieuA.telephone }),
      within(cartesLieux[1]).getByText(textMatcher(`${lieuA.distance} km`), { selector: 'p' }),
      within(cartesLieux[1]).getByText('km', { selector: 'abbr' }),
      within(cartesLieux[1]).getByRole('link', { name: wording.LANCER_L_ITINERAIRE }),
      within(cartesLieux[1]).getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_VISUEL),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      within(cartesLieux[1]).getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
    ]
    champsCarteLieuB.forEach((champ) => expect(champ).toBeVisible())

    expect(champsCarteLieuB[2]).toHaveAttribute('href', 'tel:' + lieuB.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuB[2]).toHaveAttribute('title', wording.APPELER_LE_NUMERO(lieuB.nom, lieuB.telephone))
    expect(champsCarteLieuB[4]).toHaveAttribute('title', wording.KILOMETRES)
    expect(champsCarteLieuB[6]).toHaveAttribute('href', `${paths.LIEU}/2?lat=48.844928&lon=2.31016`)
    expect(champsCarteLieuB[6]).toHaveAttribute('title', wording.PLUS_D_INFORMATIONS_SUR(lieuB.nom))
    expect(champsCarteLieuB[5]).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&origin=48.844928%2C2.31016&destination=34%2Bcours%2Bde%2BVerdun%2B1000%2BBourg%2BEn%2BBresse')
    expect(champsCarteLieuB[5]).toHaveAttribute('title', wording.LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS(lieuB.nom) + wording.NOUVELLE_FENETRE)
  })

  it('n’affiche pas la pagination quand il y a qu’une seule page', () => {
    // GIVEN
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
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
    const searchParams = [
      { name: 'bim', value: bim },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]
    const nombreDeResultat = 11

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })

    const page1 = within(navigation).getByText(1)
    expect(page1).toHaveAttribute('aria-current', 'page')

    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=1`)
    expect(links[0]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[0].textContent).toBe('2')

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=1`)
    expect(within(links[1]).getByLabelText(wording.DERNIERE_PAGE)).toBeVisible()
  })

  it('affiche la pagination à la page 2 quand il y a deux pages', () => {
    // GIVEN
    const searchParams = [
      { name: 'bim', value: bim },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
      { name: 'page', value: '1' },
    ]
    const nombreDeResultat = 19

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const modifierAccessibilite = screen.getByRole('link', { name: wording.BESOINS_D_ACCESSIBILITE + '1' })
    expect(modifierAccessibilite).toHaveAttribute('href', `${paths.RECHERCHER_PAR_HANDICAP}?bim=${bim}&lat=${lat}&lon=${lon}&page=1`)
    expect(modifierAccessibilite).toHaveAttribute('title', wording.MODIFIER_VOTRE_BESOIN_D_ACCESSIBILITE)

    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(2)

    expect(links[0]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=0`)
    expect(within(links[0]).getByLabelText(wording.PREMIERE_PAGE)).toBeVisible()

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=0`)
    expect(links[1].textContent).toBe('1')

    const page2 = within(navigation).getByText(2)
    expect(page2).toHaveAttribute('aria-current', 'page')
  })

  it('affiche la pagination à la page 1 quand il y a six pages', () => {
    // GIVEN
    const searchParams = [
      { name: 'bim', value: bim },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]
    const nombreDeResultat = 56

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(5)

    const page1 = within(navigation).getByText(1)
    expect(page1).toHaveAttribute('aria-current', 'page')

    expect(links[0]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=1`)
    expect(links[0]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[0].textContent).toBe('2')

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=2`)
    expect(links[1]).toHaveAttribute('title', wording.PAGE(3))
    expect(links[1].textContent).toBe('3')

    expect(links[2]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=3`)
    expect(links[2]).toHaveAttribute('title', wording.PAGE(4))
    expect(links[2].textContent).toBe('4')

    expect(links[3]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=4`)
    expect(links[3]).toHaveAttribute('title', wording.PAGE(5))
    expect(links[3].textContent).toBe('5')

    expect(links[4]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=5`)
    expect(within(links[4]).getByLabelText(wording.DERNIERE_PAGE)).toBeVisible()
  })

  it('affiche la pagination à la page 4 quand il y a six pages', () => {
    // GIVEN
    const searchParams = [
      { name: 'bim', value: bim },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
      { name: 'page', value: '3' },
    ]
    const nombreDeResultat = 56

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(6)

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=1`)
    expect(links[1]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[1].textContent).toBe('2')

    expect(links[2]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=2`)
    expect(links[2]).toHaveAttribute('title', wording.PAGE(3))
    expect(links[2].textContent).toBe('3')

    const page4 = within(navigation).getByText(4)
    expect(page4).toHaveAttribute('aria-current', 'page')

    expect(links[3]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=4`)
    expect(links[3]).toHaveAttribute('title', wording.PAGE(5))
    expect(links[3].textContent).toBe('5')

    expect(links[4]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=5`)
    expect(links[4]).toHaveAttribute('title', wording.PAGE(6))
    expect(links[4].textContent).toBe('6')

    expect(links[5]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=5`)
    expect(within(links[5]).getByLabelText(wording.DERNIERE_PAGE)).toBeVisible()
  })

  it('affiche la pagination à la page 6 quand il y a six pages', () => {
    // GIVEN
    const searchParams = [
      { name: 'bim', value: bim },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
      { name: 'page', value: '5' },
    ]
    const nombreDeResultat = 56

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={nombreDeResultat}
      />,
      fakeNavigation(searchParams)
    )

    // THEN
    const navigation = screen.getByRole('navigation', { name: wording.PAGINATION })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(5)

    expect(links[1]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=1`)
    expect(links[1]).toHaveAttribute('title', wording.PAGE(2))
    expect(links[1].textContent).toBe('2')

    expect(links[2]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=2`)
    expect(links[2]).toHaveAttribute('title', wording.PAGE(3))
    expect(links[2].textContent).toBe('3')

    expect(links[3]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=3`)
    expect(links[3]).toHaveAttribute('title', wording.PAGE(4))
    expect(links[3].textContent).toBe('4')

    expect(links[4]).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?bim=${bim}&lat=${lat}&lon=${lon}&page=4`)
    expect(links[4]).toHaveAttribute('title', wording.PAGE(5))
    expect(links[4].textContent).toBe('5')

    const page6 = within(navigation).getByText(6)
    expect(page6).toHaveAttribute('aria-current', 'page')
  })

  it('affiche le lien pour donner son avis quand il y a des résultats', () => {
    // GIVEN
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[lieu]}
        nombreDeResultat={1}
      />
    )

    // THEN
    const links = screen.getByRole('link', { name: wording.VOTRE_AVIS })
    expect(links).toHaveAttribute('href', 'https://docs.google.com/forms/d/1sA-EWWn5LNXc2G3WWDIEcFhl5RBZYsMMbGWN2FHnndE/viewform')
    expect(links).toHaveAttribute('title', wording.DONNEZ_NOUS_VOTRE_AVIS + wording.NOUVELLE_FENETRE)
  })

  it('n’affiche le lien pour donner son avis quand il n’y a pas de résultat', () => {
    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={0}
      />
    )

    // THEN
    const links = screen.queryByRole('link', { name: wording.DONNEZ_NOUS_VOTRE_AVIS + wording.NOUVELLE_FENETRE })
    expect(links).not.toBeInTheDocument()
  })

  it('envoie le type d’affichage des résultats, le nombre de résultats et les critères d’accessibilité sélectionnés à Google Analytics', () => {
    // GIVEN
    const criteresDAccessibiliteSelectionnes: Critere[] = ['pmr', 'visuel']
    const nombreDeResultats = 0

    // WHEN
    renderFakeComponent(
      <PageResultatsListe
        criteresDAccessibiliteSelectionnes={criteresDAccessibiliteSelectionnes}
        lieux={[]}
        nombreDeResultat={nombreDeResultats}
      />
    )

    // THEN
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/unbound-method
    expect(window.dataLayer.push).toHaveBeenNthCalledWith(1, expect.objectContaining({
      criteresDAccessibiliteSelectionnes,
      event: 'resultatsDeRecherche',
      nombreDeResultats: nombreDeResultats,
      typeDAffichage: 'liste',
    }))
  })
})
