import { screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { LieuBuilder } from '../../backend/entities/LieuBuilder'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import PageLieu from './PageLieu'

describe('page d’un lieu', () => {
  const { wording } = fakeFrontDependencies
  const lat = '48.844928'
  const lon = '2.31016'

  it('affiche le titre de l’onglet', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({ nom: 'La maison de justice de Paris' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_LIEU(lieu.nom))
  })

  it('affiche sa description', () => {
    // GIVEN
    mockRouter.query = {
      lat,
      lon,
    }
    const lieu = LieuBuilder.cree({
      adresse: '34 cours de Verdun',
      codePostal: '1000',
      distance: 2,
      nom: 'La maison de justice de Paris',
      ville: 'Bourg En Bresse',
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const retourAuxResultats = screen.getByRole('button', { name: wording.RETOUR_AUX_RESULTATS })
    expect(retourAuxResultats).toBeInTheDocument()
    const nom = screen.getByRole('heading', { level: 2, name: lieu.nom })
    expect(nom).toBeInTheDocument()
    const distance = screen.getByText(textMatch(`${lieu.distance} km`), { selector: 'p' })
    expect(distance).toBeInTheDocument()
    const kilometre = screen.getByText('km', { selector: 'abbr' })
    expect(kilometre).toHaveAttribute('title', wording.KILOMETRES)
    const adresse = screen.getByText(textMatch(lieu.adresse + lieu.codePostal + ' ' + lieu.ville), { selector: 'p' })
    expect(adresse).toBeInTheDocument()
    const itineraire = screen.getByRole('link', { name: `${wording.LANCER_L_ITINERAIRE_SUR_GOOGLE_MAPS(lieu.nom)}${wording.NOUVELLE_FENETRE}` })
    const googleMapUrlLieu = new URL('https://www.google.com/maps/dir/')
    googleMapUrlLieu.searchParams.append('api', '1')
    googleMapUrlLieu.searchParams.append('origin', `${lat},${lon}`)
    googleMapUrlLieu.searchParams.append('destination', 'La+maison+de+justice+de+Paris+34+cours+de+Verdun+1000+Bourg+En+Bresse')
    expect(itineraire).toHaveAttribute('href', googleMapUrlLieu.toString())
    expect(itineraire.textContent).toBe(wording.LANCER_L_ITINERAIRE)
  })

  it('affiche son accessibilité', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({
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
    expect(titre).toBeInTheDocument()
    const pmr = screen.getByAltText(wording.TITLE_HANDICAP_MOTEUR_TOTAL)
    expect(pmr).toBeInTheDocument()
    const calme = screen.getByAltText(wording.TITLE_ENVIRONNEMENT_CALME)
    expect(calme).toBeInTheDocument()
    const pmrAssiste = screen.getByAltText(wording.TITLE_HANDICAP_MOTEUR_AVEC_ASSISTANCE)
    expect(pmrAssiste).toBeInTheDocument()
    const visuel = screen.getByAltText(wording.TITLE_HANDICAP_VISUEL)
    expect(visuel).toBeInTheDocument()
  })

  it('affiche ses horaires et jours d’ouverture', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({
      horaire: 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00',
      priseDeRendezVous: 'OUI\nou pas',
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.HORAIRES_ET_JOURS_D_OUVERTURE })
    expect(titre).toBeInTheDocument()
    const priseDeRendezVous = screen.getByText(textMatch(lieu.priseDeRendezVous), { selector: 'pre' })
    expect(priseDeRendezVous).toBeInTheDocument()
    const horaire = screen.getByText(textMatch(lieu.horaire), { selector: 'pre' })
    expect(horaire).toBeInTheDocument()
  })

  it('affiche plus d’informations', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({ commentaire: 'En partie\nformé' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.PLUS_D_INFORMATIONS })
    expect(titre).toBeInTheDocument()
    const commentaire = screen.getByText(textMatch(lieu.commentaire), { selector: 'pre' })
    expect(commentaire).toBeInTheDocument()
  })

  it('indique à l’utilisateur quand il n’y a pas d’informations', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({ commentaire: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const commentaire = screen.getByText(wording.PAS_D_INFORMATIONS_SUPPLEMENTAIRES, { selector: 'pre' })
    expect(commentaire).toBeInTheDocument()
  })

  it('affiche son contact et site internet', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({
      eMail: 'mjd.bourg-en-bresse@example.com',
      siteInternet: 'https://www.ain.gouv.fr/',
      telephone: '06 01 02 03 04',
    })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const titre = screen.getByRole('heading', { level: 2, name: wording.CONTACT_ET_SITE_INTERNET })
    expect(titre).toBeInTheDocument()
    const eMail = screen.getByRole('link', { name: wording.ENVOYER_UN_EMAIL_A + lieu.eMail })
    expect(eMail).toHaveAttribute('href', `mailto:${lieu.eMail}`)
    expect(eMail.textContent).toBe(lieu.eMail)
    const telephone = screen.getByRole('link', { name: wording.APPELER_LE_NUMERO(lieu.nom, lieu.telephone) })
    expect(telephone).toHaveAttribute('href', `tel:${lieu.telephone.replaceAll(' ', '')}`)
    expect(telephone.textContent).toBe(lieu.telephone)
    const siteInternet = screen.getByRole('link', { name: wording.CONSULTER_LE_SITE_INTERNET + wording.NOUVELLE_FENETRE })
    expect(siteInternet).toHaveAttribute('href', lieu.siteInternet)
    expect(siteInternet).toHaveAttribute('target', '_blank')
    expect(siteInternet).toHaveAttribute('rel', 'external noopener noreferrer')
    expect(siteInternet.textContent).toBe(wording.CONSULTER_LE_SITE_INTERNET)
  })

  it('indique à l’utilisateur quand il n’y a pas d’e-mail', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({ eMail: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const eMail = screen.getByText(wording.PAS_D_E_MAIL)
    expect(eMail).toBeInTheDocument()
  })

  it('indique à l’utilisateur quand il n’y a pas de site internet', () => {
    // GIVEN
    const lieu = LieuBuilder.cree({ siteInternet: '' })

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const siteInternet = screen.getByText(wording.PAS_DE_SITE_INTERNET)
    expect(siteInternet).toBeInTheDocument()
  })

  it('affiche l’ancre pour revenir en haut de page', () => {
    // GIVEN
    const lieu = LieuBuilder.cree()

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })

  it('affiche le lien pour donner son avis', () => {
    // GIVEN
    const lieu = LieuBuilder.cree()

    // WHEN
    renderFakeComponent(<PageLieu lieu={lieu} />)

    // THEN
    const links = screen.getByRole('link', { name: wording.DONNEZ_NOUS_VOTRE_AVIS + wording.NOUVELLE_FENETRE })
    expect(links).toHaveAttribute('href', 'https://docs.google.com/forms/d/1sA-EWWn5LNXc2G3WWDIEcFhl5RBZYsMMbGWN2FHnndE/viewform')
    expect(links.textContent).toBe(wording.VOTRE_AVIS)
  })
})
