import { screen, within } from '@testing-library/react'

import PageAccueil from './PageAccueil'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'

describe('page d’accueil', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le contenu', () => {
    // WHEN
    renderFakeComponent(<PageAccueil />)

    // THEN
    const justicie = screen.getByRole('heading', { level: 1, name: wording.JUSTICIE })
    expect(justicie).toBeVisible()

    const problemeDeDroit = screen.getByRole('heading', { level: 2, name: wording.VOUS_AVEZ_UN_PROBLEME_DE_DROIT })
    expect(problemeDeDroit).toBeVisible()
    const trouvezUnConseil = screen.getByText(wording.TROUVEZ_UN_CONSEIL_JURIDIQUE, { selector: 'p' })
    expect(trouvezUnConseil).toBeVisible()

    const description = screen.getByText(textMatch(wording.VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS + wording.VOUS_ETES_VICTIME + wording.VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE + wording.VOUS_AVEZ_RECU_UNE_DECISION), { selector: 'p' })
    expect(description).toBeVisible()

    const rechercherUneAide = screen.getByRole('link', { name: wording.RECHERCHER_UNE_AIDE_JURIDIQUE_GRATUITE_ET_ACCESSIBLE })
    expect(rechercherUneAide).toHaveAttribute('href', paths.RECHERCHER_UNE_AIDE_JURIDIQUE)

    const decouvrirNosCriteres = screen.getByRole('link', { name: wording.DECOUVRIR_NOS_CRITERES })
    expect(decouvrirNosCriteres).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const aPropos = screen.getByRole('heading', { level: 2, name: wording.TITLE_A_PROPOS_DE_DROIT_PLURIEL })
    expect(aPropos).toBeVisible()
    const droitPlurielEstUneAssociation = screen.getByText(wording.DROIT_PLURIEL_EST_UNE_ASSOCIATION, { selector: 'p' })
    expect(droitPlurielEstUneAssociation).toBeVisible()

    const retrouvezSurNotreSite = screen.getByText(textMatch(wording.RETROUVEZ_PLUS_D_INFOS + wording.SITE_DROIT_PLURIEL), { selector: 'p' })
    const lienSiteDroitPluriel = within(retrouvezSurNotreSite).getByRole('link', { name: wording.SITE_DROIT_PLURIEL })
    expect(lienSiteDroitPluriel).toHaveAttribute('href', wording.SITE_DROIT_PLURIEL)
    expect(lienSiteDroitPluriel).toHaveAttribute('target', '_blank')
    expect(lienSiteDroitPluriel).toHaveAttribute('rel', 'external noopener noreferrer')
    expect(lienSiteDroitPluriel).toHaveAttribute('title', wording.TITRE_LIEN_SITE_DROIT_PLURIEL + wording.NOUVELLE_FENETRE)

    const nousContacter = screen.getByRole('heading', { level: 2, name: wording.TITLE_NOUS_CONTACTER })
    expect(nousContacter).toBeVisible()

    const coordonneesDroitPluriel = screen.getByText(
      textMatch(`${wording.PAR_EMAIL}${wording.EMAIL_DROIT_PLURIEL}${wording.PAR_TELEPHONE}${wording.TELEPHONE_DROIT_PLURIEL}`), { selector: 'address' }
    )

    const lienMail = within(coordonneesDroitPluriel).getByRole('link', { name: wording.EMAIL_DROIT_PLURIEL })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.EMAIL_DROIT_PLURIEL)
    expect(lienMail).toHaveAttribute('title', wording.ENVOYER_UN_EMAIL_A + wording.EMAIL_DROIT_PLURIEL)

    const lienTelephone = within(coordonneesDroitPluriel).getByRole('link', { name: wording.TELEPHONE_DROIT_PLURIEL })
    expect(lienTelephone).toHaveAttribute('href', 'tel:' + wording.TELEPHONE_DROIT_PLURIEL.replaceAll(' ', ''))
    expect(lienTelephone).toHaveAttribute('title', wording.APPELER_LE_NUMERO(wording.JUSTICIE, wording.TELEPHONE_DROIT_PLURIEL))
    const nosActualites = screen.getByRole('heading', { level: 2, name: wording.TITLE_SUIVEZ_NOS_ACTUALITES })
    expect(nosActualites).toBeVisible()

    const lienFacebook = screen.getByRole('link', { name: wording.TITRE_LIEN_FACEBOOK + wording.NOUVELLE_FENETRE })
    expect(lienFacebook).toHaveAttribute('href', wording.LIEN_FACEBOOK)
    expect(lienFacebook).toHaveAttribute('target', '_blank')
    expect(lienFacebook).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienTwitter = screen.getByRole('link', { name: wording.TITRE_LIEN_TWITTER + wording.NOUVELLE_FENETRE })
    expect(lienTwitter).toHaveAttribute('href', wording.LIEN_TWITTER)
    expect(lienTwitter).toHaveAttribute('target', '_blank')
    expect(lienTwitter).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienYoutube = screen.getByRole('link', { name: wording.TITRE_LIEN_YOUTUBE + wording.NOUVELLE_FENETRE })
    expect(lienYoutube).toHaveAttribute('href', wording.LIEN_YOUTUBE)
    expect(lienYoutube).toHaveAttribute('target', '_blank')
    expect(lienYoutube).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienLinkedIn = screen.getByRole('link', { name: wording.TITRE_LIEN_LINKEDIN + wording.NOUVELLE_FENETRE })
    expect(lienLinkedIn).toHaveAttribute('href', wording.LIEN_LINKEDIN)
    expect(lienLinkedIn).toHaveAttribute('target', '_blank')
    expect(lienLinkedIn).toHaveAttribute('rel', 'external noopener noreferrer')

    const lienInstagram = screen.getByRole('link', { name: wording.TITRE_LIEN_INSTAGRAM + wording.NOUVELLE_FENETRE })
    expect(lienInstagram).toHaveAttribute('href', wording.LIEN_INSTAGRAM)
    expect(lienInstagram).toHaveAttribute('target', '_blank')
    expect(lienInstagram).toHaveAttribute('rel', 'external noopener noreferrer')

    const retourHautDePage = screen.getByRole('link', { name: wording.RETOUR_EN_HAUT_DE_PAGE })
    expect(retourHautDePage).toHaveAttribute('href', '#evitement')
  })
})
