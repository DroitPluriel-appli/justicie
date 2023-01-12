import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import Accueil from './Accueil'

describe('page d’accueil', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<Accueil />)

    // THEN
    expect(document.title).toBe(wording.TITLE_PAGE_ACCUEIL)
  })

  it('affiche le contenu', () => {
    // WHEN
    renderFakeComponent(<Accueil />)

    // THEN
    const main = screen.getByRole('main')
    const title = within(main).getByRole('heading', { level: 2, name: wording.VOUS_AVEZ_UN_PROBLEME_DE_DROIT })
    expect(title).toBeInTheDocument()
    const trouvezUnConseil = within(main).getByText(wording.TROUVEZ_UN_CONSEIL_JURIDIQUE, { selector: 'p' })
    expect(trouvezUnConseil).toBeInTheDocument()

    const description = within(main).getByText(textMatch(wording.VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS + wording.VOUS_ETES_VICTIME + wording.VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE + wording.VOUS_AVEZ_RECU_UNE_DECISION), { selector: 'p' })
    expect(description).toBeInTheDocument()

    const rechercherUneAide = within(main).getByRole('link', { name: wording.RECHERCHER_UNE_AIDE_JURIDIQUE_GRATUITE_ET_ACCESSIBLE })
    expect(rechercherUneAide).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)

    const decouvrirNosCriteres = within(main).getByRole('link', { name: wording.DECOUVRIR_NOS_CRITERES })
    expect(decouvrirNosCriteres).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const titleAPropos = within(main).getByRole('heading', { level: 2, name: wording.TITLE_A_PROPOS_DE_DROIT_PLURIEL })
    expect(titleAPropos).toBeInTheDocument()
    const droitPlurielEstUneAssociation = within(main).getByText(wording.DROIT_PLURIEL_EST_UNE_ASSOCIATION, { selector: 'p' })
    expect(droitPlurielEstUneAssociation).toBeInTheDocument()

    const retrouvezSurNotreSite = within(main).getByText(textMatch(wording.RETROUVEZ_PLUS_D_INFOS + wording.SITE_DROIT_PLURIEL), { selector: 'p' })
    const lienSiteDroitPluriel = within(retrouvezSurNotreSite).getByRole('link', { name: wording.TITRE_LIEN_SITE_DROIT_PLURIEL + wording.NOUVELLE_FENETRE })
    expect(lienSiteDroitPluriel).toHaveAttribute('href', wording.SITE_DROIT_PLURIEL)
    expect(lienSiteDroitPluriel).toHaveAttribute('target', '_blank')
    expect(lienSiteDroitPluriel).toHaveAttribute('rel', 'external noopener noreferrer')

    const titleNousContacter = within(main).getByRole('heading', { level: 2, name: wording.TITLE_NOUS_CONTACTER })
    expect(titleNousContacter).toBeInTheDocument()

    const coordonneesDroitPluriel = within(main).getByText(
      textMatch(`${wording.PAR_EMAIL}${wording.EMAIL_DROIT_PLURIEL}${wording.PAR_TELEPHONE}${wording.TELEPHONE_DROIT_PLURIEL}`), { selector: 'address' }
    )

    const lienMail = within(coordonneesDroitPluriel).getByRole('link', { name: wording.ENVOYER_UN_EMAIL_A + wording.EMAIL_DROIT_PLURIEL })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.EMAIL_DROIT_PLURIEL)
    expect(lienMail.textContent).toBe(wording.EMAIL_DROIT_PLURIEL)

    const lienTelephone = within(coordonneesDroitPluriel).getByRole('link', { name: wording.APPELER_LE_NUMERO + wording.TELEPHONE_DROIT_PLURIEL })
    expect(lienTelephone).toHaveAttribute('href', 'tel:' + wording.TELEPHONE_DROIT_PLURIEL.replaceAll(' ', ''))
    expect(lienTelephone.textContent).toBe(wording.TELEPHONE_DROIT_PLURIEL)
    const titleNosActualites = within(main).getByRole('heading', { level: 2, name: wording.TITLE_SUIVEZ_NOS_ACTUALITES })
    expect(titleNosActualites).toBeInTheDocument()

    const lienFacebook = within(main).getByRole('link', { name: wording.TITRE_LIEN_FACEBOOK + wording.NOUVELLE_FENETRE })
    expect(lienFacebook).toHaveAttribute('href', wording.LIEN_FACEBOOK)
    expect(lienFacebook).toHaveAttribute('target', '_blank')
    expect(lienFacebook).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienTwitter = within(main).getByRole('link', { name: wording.TITRE_LIEN_TWITTER + wording.NOUVELLE_FENETRE })
    expect(lienTwitter).toHaveAttribute('href', wording.LIEN_TWITTER)
    expect(lienTwitter).toHaveAttribute('target', '_blank')
    expect(lienTwitter).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienYoutube = within(main).getByRole('link', { name: wording.TITRE_LIEN_YOUTUBE + wording.NOUVELLE_FENETRE })
    expect(lienYoutube).toHaveAttribute('href', wording.LIEN_YOUTUBE)
    expect(lienYoutube).toHaveAttribute('target', '_blank')
    expect(lienYoutube).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienLinkedIn = within(main).getByRole('link', { name: wording.TITRE_LIEN_LINKEDIN + wording.NOUVELLE_FENETRE })
    expect(lienLinkedIn).toHaveAttribute('href', wording.LIEN_LINKEDIN)
    expect(lienLinkedIn).toHaveAttribute('target', '_blank')
    expect(lienLinkedIn).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienInstagram = within(main).getByRole('link', { name: wording.TITRE_LIEN_INSTAGRAM + wording.NOUVELLE_FENETRE })
    expect(lienInstagram).toHaveAttribute('href', wording.LIEN_INSTAGRAM)
    expect(lienInstagram).toHaveAttribute('target', '_blank')
    expect(lienInstagram).toHaveAttribute('rel', 'external noopener noreferrer')

    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })
})
