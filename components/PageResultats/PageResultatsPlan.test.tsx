import { fireEvent, screen, within } from '@testing-library/react'
import L from 'leaflet'

import PageResultatsPlan from './PageResultatsPlan'
import Plan from './Plan/Plan'
import { Critere } from '../../backend/entities/Critere'
import { Lieu } from '../../backend/entities/Lieu'
import { fakeFrontDependencies, fakeNavigation, renderFakeComponent, textMatcher } from '../../configuration/testHelper'

describe('page des résultats de recherche affichés sur une carte', () => {
  const { paths, wording } = fakeFrontDependencies

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
      forme: true,
      lsf: true,
      pmr: true,
      pmr_assiste: true,
      visuel: true,
    },
    id: 1,
    latitude: -0.09,
    longitude: 51.50,
    nom: 'LieuB',
  })

  const lieuC = Lieu.cree({
    id: 1,
    latitude: -0.09,
    longitude: 51.50,
    nom: 'LieuC',
  })

  const lat = '48.844928'
  const lon = '2.31016'
  const moteurTotal = 'on'
  const rayonDeRecherche = 250

  beforeEach(() => {
    // spyOn continue d'appeller la fonction initiale, or ici elle provoque une erreur
    // car jsdom ne sait pas gérer la création de svg induite par la création du cercle par leaflet
    // eslint-disable-next-line vitest/prefer-spy-on
    L.Circle.prototype.addTo = vi.fn()

    vi.stubGlobal('dataLayer', { push: vi.fn() })
  })

  it('affiche les liens de navigation et le filtre', () => {
    // GIVEN
    const searchParams = [
      { name: 'moteur-total', value: moteurTotal },
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]

    // WHEN
    renderFakeComponent(
      <PageResultatsPlan
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
    expect(vueListe).toHaveAttribute('href', `${paths.RESULTATS_LISTE}?moteur-total=${moteurTotal}&lat=${lat}&lon=${lon}`)
    expect(vueListe).toHaveAttribute('title', wording.AFFICHEZ_RESULTATS_EN_LISTE)
    const vuePlan = within(itemsDeNavigation[1]).getByRole('link', { name: wording.PLAN })
    expect(vuePlan).toHaveAttribute('href', `${paths.RESULTATS_PLAN}?moteur-total=${moteurTotal}&lat=${lat}&lon=${lon}`)
    expect(vuePlan).toHaveAttribute('title', wording.AFFICHEZ_RESULTATS_EN_PLAN)

    const modifierAccessibilite = screen.getByRole('link', { name: wording.BESOINS_D_ACCESSIBILITE + '1' })
    expect(modifierAccessibilite).toHaveAttribute('href', `${paths.RECHERCHER_PAR_HANDICAP}?moteur-total=${moteurTotal}&lat=${lat}&lon=${lon}`)
    expect(modifierAccessibilite).toHaveAttribute('title', wording.MODIFIER_VOTRE_BESOIN_D_ACCESSIBILITE)
  })

  it('affiche une phrase du nombre de lieu trouvé', () => {
    // GIVEN
    const nombreDeResultat = 1
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(
      <PageResultatsPlan
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[lieu]}
        nombreDeResultat={nombreDeResultat}
      />
    )

    // THEN
    const titre = screen.getByText(wording.LIEUX_CORRESPONDENT_A_VOTRE_RECHERCHE(nombreDeResultat, rayonDeRecherche), { selector: 'p' })
    expect(titre).toBeVisible()
  })

  it('affiche une phrase quand aucun lieu n’a été trouvé', () => {
    // WHEN
    renderFakeComponent(
      <PageResultatsPlan
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={0}
      />
    )

    // THEN
    const aucunLieu = screen.getByText(wording.AUCUN_LIEU_NE_CORRESPOND_A_VOTRE_RECHERCHE(rayonDeRecherche), { selector: 'p' })
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

  it('affiche un marker bleu à la position choisie', () => {
    // GIVEN
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(<Plan lieux={[lieu]} />)

    // THEN
    const positionMarker = screen.getByTitle(wording.TITRE_MARKER_POSITION)

    expect(positionMarker).toBeVisible()
  })

  it('affiche plusieurs markers de lieux', () => {
    // GIVEN
    const lieux = [lieuA, lieuB, lieuC]

    // WHEN
    renderFakeComponent(<Plan lieux={lieux} />)

    // THEN
    lieux.forEach((lieu) => {
      const markerLieu = screen.getByTitle(lieu.nom)
      expect(markerLieu.tagName).toBe('IMG')
      expect(markerLieu).toHaveAttribute('src', 'marker-lieu.svg')
      expect(markerLieu).toHaveStyle({
        height: '24px',
        width: '24px',
      })
    })
  })

  it('change le marker lieu en rouge et + grand au clic et le reset si clic ailleurs', () => {
    // GIVEN
    const lieux = [lieuA, lieuB]
    renderFakeComponent(<Plan lieux={lieux} />)
    const markerLieuA = screen.getByTitle(lieuA.nom)
    const markerLieuB = screen.getByTitle(lieuB.nom)

    // WHEN
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

  it('affiche la carte du lieu dans la popup au clic sur un marker', () => {
    // GIVEN
    const searchParams = [
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]
    renderFakeComponent(<Plan lieux={[lieuA]} />, fakeNavigation(searchParams))

    // WHEN
    afficherLaCarteDuLieu(lieuA.nom)

    // THEN
    const champsCarteLieuA = [
      screen.getByText(lieuA.nom),
      screen.getByText(textMatcher(lieuA.adresse + lieuA.codePostal + ' ' + lieuA.ville)),
      screen.getByRole('link', { name: lieuA.telephone }),
      screen.getByText(textMatcher(`${lieuA.distance} km`), { selector: 'p' }),
      screen.getByText('km', { selector: 'abbr' }),
      screen.getByRole('link', { name: wording.LANCER_L_ITINERAIRE }),
      screen.getByRole('link', { name: wording.PLUS_D_INFORMATIONS }),
      screen.getByTitle(wording.TITLE_HANDICAP_MOTEUR_TOTAL),
      screen.getByTitle(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE),
      screen.getByTitle(wording.TITLE_HANDICAP_VISUEL),
      screen.getByTitle(wording.TITLE_LANGUE_DES_SIGNES_FRANCAISE),
      screen.getByTitle(wording.TITLE_BOUCLE_A_INDUCTION),
      screen.getByTitle(wording.TITLE_PERSONNEL_FORME),
    ]
    champsCarteLieuA.forEach((champ) => expect(champ).toBeVisible())

    expect(champsCarteLieuA[2]).toHaveAttribute('href', 'tel:' + lieuA.telephone.replaceAll(' ', ''))
    expect(champsCarteLieuA[2]).toHaveAttribute('title', wording.APPELER_LE_NUMERO(lieuA.nom, lieuA.telephone))
    expect(champsCarteLieuA[4]).toHaveAttribute('title', wording.KILOMETRES)
    expect(champsCarteLieuA[6]).toHaveAttribute('href', `${paths.LIEU}/1?lat=${lat}&lon=${lon}`)
    expect(champsCarteLieuA[6]).toHaveAttribute('title', wording.PLUS_D_INFORMATIONS_SUR(lieuA.nom))
    expect(champsCarteLieuA[5]).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&origin=48.844928%2C2.31016&destination=12%2Brue%2Bdu%2BLieu%2B1000%2BBourg%2BEn%2BBresse')
    expect(champsCarteLieuA[5]).toHaveAttribute('title', wording.LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS(lieuA.nom) + wording.NOUVELLE_FENETRE)
  })

  it('affiche le lien pour donner son avis quand il y a des résultats', () => {
    // GIVEN
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(
      <PageResultatsPlan
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[lieu]}
        nombreDeResultat={1}
      />
    )

    // THEN
    const link = screen.getByRole('link', { name: wording.VOTRE_AVIS })
    expect(link).toHaveAttribute('href', 'https://docs.google.com/forms/d/1sA-EWWn5LNXc2G3WWDIEcFhl5RBZYsMMbGWN2FHnndE/viewform')
    expect(link).toHaveAttribute('title', wording.DONNEZ_NOUS_VOTRE_AVIS + wording.NOUVELLE_FENETRE)
  })

  it('n’affiche le lien pour donner son avis quand il n’y a pas de résultat', () => {
    // WHEN
    renderFakeComponent(
      <PageResultatsPlan
        criteresDAccessibiliteSelectionnes={[]}
        lieux={[]}
        nombreDeResultat={0}
      />
    )

    // THEN
    const link = screen.queryByRole('link', { name: wording.DONNEZ_NOUS_VOTRE_AVIS + wording.NOUVELLE_FENETRE })
    expect(link).not.toBeInTheDocument()
  })

  it('envoie le type d’affichage des résultats, le nombre de résultats et les critères d’accessibilité sélectionnés à Google Analytics', () => {
    // GIVEN
    const criteresDAccessibiliteSelectionnes: ReadonlyArray<Critere> = ['pmr', 'visuel']
    const nombreDeResultats = 0

    // WHEN
    renderFakeComponent(
      <PageResultatsPlan
        criteresDAccessibiliteSelectionnes={criteresDAccessibiliteSelectionnes}
        lieux={[]}
        nombreDeResultat={nombreDeResultats}
      />
    )

    // THEN
    expect(window.dataLayer.push).toHaveBeenNthCalledWith(1, expect.objectContaining({
      criteresDAccessibiliteSelectionnes,
      event: 'resultatsDeRecherche',
      nombreDeResultats: nombreDeResultats,
      typeDAffichage: 'plan',
    }))
  })
})

function afficherLaCarteDuLieu(nom: string) {
  const markerLieu = screen.getByTitle(nom)

  fireEvent.click(markerLieu)
}
