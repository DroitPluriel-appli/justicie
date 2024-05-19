import { screen } from '@testing-library/react'

import PageLieu from './PageLieu'
import { Lieu } from '../../backend/entities/Lieu'
import { fakeFrontDependencies, fakeNavigation, renderFakeComponent, textMatcher } from '../../configuration/testHelper'

describe('page d’un lieu', () => {
  const { wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'

  it('affiche sa description', () => {
    // GIVEN
    const searchParams = [
      { name: 'lat', value: lat },
      { name: 'lon', value: lon },
    ]
    const lieu = Lieu.cree({
      adresse: '34 cours de Verdun',
      codePostal: '1000',
      distance: 2,
      nom: 'La maison de justice de Paris',
      ville: 'Bourg En Bresse',
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />, fakeNavigation(searchParams))

    // THEN
    const retourAuxResultats = screen.getByRole('button', { name: wording.RETOUR_AUX_RESULTATS })
    expect(retourAuxResultats).toBeVisible()
    const nom = screen.getByRole('heading', { level: 1, name: lieu.nom })
    expect(nom).toBeVisible()
    const distance = screen.getByText(textMatcher(`${lieu.distance} km`), { selector: 'p' })
    expect(distance).toBeVisible()
    const kilometre = screen.getByText('km', { selector: 'abbr' })
    expect(kilometre).toHaveAttribute('title', wording.KILOMETRES)
    const adresse = screen.getByText(textMatcher(lieu.adresse + lieu.codePostal + ' ' + lieu.ville), { selector: 'p' })
    expect(adresse).toBeVisible()
    const itineraire = screen.getByRole('link', { name: wording.LANCER_L_ITINERAIRE })
    expect(itineraire).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&origin=48.844928%2C2.31016&destination=34%2Bcours%2Bde%2BVerdun%2B1000%2BBourg%2BEn%2BBresse')
    expect(itineraire).toHaveAttribute('title', `${wording.LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS(lieu.nom)}${wording.NOUVELLE_FENETRE}`)
  })

  it('affiche son accessibilité', () => {
    // GIVEN
    const lieu = Lieu.cree({
      criteres: {
        bim: false,
        calme: true,
        forme: false,
        lsf: false,
        pmr: true,
        pmr_assiste: true,
        visuel: true,
      },
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.ACCESSIBILITE_DU_LIEU })
    expect(titre).toBeVisible()
    const pmr = screen.getByAltText(wording.TITLE_HANDICAP_MOTEUR_TOTAL)
    expect(pmr).toBeVisible()
    const calme = screen.getByAltText(wording.TITLE_ENVIRONNEMENT_CALME)
    expect(calme).toBeVisible()
    const pmrAssiste = screen.getByAltText(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE)
    expect(pmrAssiste).toBeVisible()
    const visuel = screen.getByAltText(wording.TITLE_HANDICAP_VISUEL)
    expect(visuel).toBeVisible()
  })

  it('affiche ses horaires et jours d’ouverture', () => {
    // GIVEN
    const lieu = Lieu.cree({
      horaire: 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00',
      priseDeRendezVous: 'OUI\nou pas',
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.HORAIRES_ET_JOURS_D_OUVERTURE })
    expect(titre).toBeVisible()
    const priseDeRendezVous = screen.getByText(textMatcher(lieu.priseDeRendezVous), { selector: 'pre' })
    expect(priseDeRendezVous).toBeVisible()
    const horaire = screen.getByText(textMatcher(lieu.horaire), { selector: 'pre' })
    expect(horaire).toBeVisible()
  })

  it('affiche plus d’informations', () => {
    // GIVEN
    const lieu = Lieu.cree({ commentaire: 'En partie\nformé' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.PLUS_D_INFORMATIONS })
    expect(titre).toBeVisible()
    const commentaire = screen.getByText(textMatcher(lieu.commentaire), { selector: 'pre' })
    expect(commentaire).toBeVisible()
  })

  it('indique à l’utilisateur quand il n’y a pas d’informations', () => {
    // GIVEN
    const lieu = Lieu.cree({ commentaire: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const commentaire = screen.getByText(wording.PAS_D_INFORMATIONS_SUPPLEMENTAIRES, { selector: 'pre' })
    expect(commentaire).toBeVisible()
  })

  it('affiche son contact et site internet', () => {
    // GIVEN
    const lieu = Lieu.cree({
      eMail: 'mjd.bourg-en-bresse@example.com',
      siteInternet: 'https://www.ain.gouv.fr/',
      telephone: '06 01 02 03 04',
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.CONTACT_ET_SITE_INTERNET })
    expect(titre).toBeVisible()
    const eMail = screen.getByRole('link', { name: lieu.eMail })
    expect(eMail).toHaveAttribute('href', `mailto:${lieu.eMail}`)
    expect(eMail).toHaveAttribute('title', wording.ENVOYER_UN_EMAIL_A + lieu.eMail)
    const telephone = screen.getByRole('link', { name: lieu.telephone })
    expect(telephone).toHaveAttribute('href', `tel:${lieu.telephone.replaceAll(' ', '')}`)
    expect(telephone).toHaveAttribute('title', wording.APPELER_LE_NUMERO(lieu.nom, lieu.telephone))
    const siteInternet = screen.getByRole('link', { name: wording.CONSULTER_LE_SITE_INTERNET })
    expect(siteInternet).toHaveAttribute('href', lieu.siteInternet)
    expect(siteInternet).toHaveAttribute('target', '_blank')
    expect(siteInternet).toHaveAttribute('rel', 'external noopener noreferrer')
    expect(siteInternet).toHaveAttribute('title', wording.CONSULTER_LE_SITE_INTERNET + wording.NOUVELLE_FENETRE)
  })

  it('indique à l’utilisateur quand il n’y a pas d’e-mail', () => {
    // GIVEN
    const lieu = Lieu.cree({ eMail: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const eMail = screen.getByText(wording.PAS_D_E_MAIL)
    expect(eMail).toBeVisible()
  })

  it('indique à l’utilisateur quand il n’y a pas de site internet', () => {
    // GIVEN
    const lieu = Lieu.cree({ siteInternet: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const siteInternet = screen.getByText(wording.PAS_DE_SITE_INTERNET)
    expect(siteInternet).toBeVisible()
  })

  it('indique à l’utilisateur quand il n’y a pas de numéro de téléphone', () => {
    // GIVEN
    const lieu = Lieu.cree({ telephone: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const siteInternet = screen.getByText(wording.PAS_DE_TELEPHONE)
    expect(siteInternet).toBeVisible()
  })

  it('affiche l’ancre pour revenir en haut de page', () => {
    // GIVEN
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })

  it('affiche le lien pour donner son avis', () => {
    // GIVEN
    const lieu = Lieu.cree()

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const links = screen.getByRole('link', { name: wording.VOTRE_AVIS })
    expect(links).toHaveAttribute('href', 'https://docs.google.com/forms/d/1sA-EWWn5LNXc2G3WWDIEcFhl5RBZYsMMbGWN2FHnndE/viewform')
    expect(links).toHaveAttribute('title', wording.DONNEZ_NOUS_VOTRE_AVIS + wording.NOUVELLE_FENETRE)
  })
})
