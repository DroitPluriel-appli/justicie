import { fireEvent, screen, within } from '@testing-library/react'

import usePlan from '../../components/Plan/usePlan'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'
import Plan from './Plan'

describe('page résultats par plan', () => {
  const { wording } = fakeFrontDependencies
  const { iconSizeDefault, iconSizeSelected } = usePlan()

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

  const viewCenter: L.LatLngExpression = [51.505, -0.09]

  it('affiche un marker bleu à la position choisie', () => {
    // WHEN
    renderFakeComponent(
      <Plan
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
    const lieux = [lieuA, lieuB, lieuC]
    const viewCenter: L.LatLngExpression = [51.505, -0.09]

    // WHEN
    renderFakeComponent(
      <Plan
        lieux={lieux}
        viewCenter={viewCenter}
      />
    )

    // THEN
    const main = screen.getByRole('main')
    lieux.map((lieu) => {
      const markerLieu = within(main).getByTitle(lieu.nom)
      expect(markerLieu.tagName).toBe('IMG')
      expect(markerLieu).toHaveAttribute('src', 'marker-lieu.svg')
      expect(markerLieu).toHaveStyle({
        height: `${iconSizeDefault}px`,
        width: `${iconSizeDefault}px`,
      })
    })
  })

  // TESTS
  // [x] compléter tests markers pour vérifier img avec taille
  // [x] mocker click et tester changement de logo et de taille
  // [x] retour à la normal au click sur autre marker ?
  // [ ] tester affichage des infos dans popup au click sur marker

  it('change le marker lieu en rouge et + grand au click et le reset si click ailleur', () => {
    // GIVEN
    const lieux = [lieuA, lieuB]
    const viewCenter: L.LatLngExpression = [51.505, -0.09]

    // WHEN
    renderFakeComponent(
      <Plan
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
    const lieu = lieuA

    // WHEN
    renderFakeComponent(
      <Plan
        lieux={[lieu]}
        viewCenter={viewCenter}
      />
    )
    const main = screen.getByRole('main')
    const markerLieuA = within(main).getByTitle(lieu.nom)
    fireEvent.click(markerLieuA)

    // THEN
    const popupCarteLieu = [
      within(main).getByRole('heading', { level: 1, name: lieu.nom }),
      within(main).getByText(textMatch(lieu.adresse + lieu.codePostal + lieu.ville)),
      within(main).getByText(textMatch(lieu.telephone)),
    ]

    popupCarteLieu.map((champ) => expect(champ).toBeVisible())

    const lienLancerItineraire = within(main).getByRole('link', { name: wording.LANCER_L_ITINERAIRE })
    const lienPlusDInformations = within(main).getByRole('link', { name: wording.PLUS_D_INFORMATIONS })
    expect(lienLancerItineraire).toBeVisible()
    expect(lienPlusDInformations).toBeVisible()
  })

})
