import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import Accueil from './Accueil'

describe('page d’accueil', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<Accueil />)

    // THEN
    expect(document.title).toBe(wording.JUSTICE_PLURIELLE)
  })

  it('affiche le contenu', () => {
    // WHEN
    renderFakeComponent(<Accueil />)

    // THEN
    const main = screen.getByRole('main')
    const title = within(main).getByRole('heading', { level: 2, name: wording.VOUS_AVEZ_UN_PROBLEME_DE_DROIT })
    expect(title).toBeInTheDocument()

    const description = within(main).getByText(textMatch(wording.TROUVEZ_UN_CONSEIL_JURIDIQUE + wording.VOUS_AVEZ_UNE_QUESTION_SUR_VOS_DROITS + wording.VOUS_ETES_VICTIME + wording.VOUS_VOULEZ_FAIRE_UNE_ACTION_EN_JUSTICE + wording.VOUS_AVEZ_RECU_UNE_DECISION + wording.JUSTICE_PLURIELLE_VOUS_PERMET), { selector: 'p' })
    expect(description).toBeInTheDocument()

    const rechercherUneConsultation = within(main).getByRole('link', { name: wording.RECHERCHER_UNE_CONSULTATION_JURIDIQUE_GRATUITE_ET_ACCESSIBLE })
    expect(rechercherUneConsultation).toHaveAttribute('href', paths.RECHERCHER_UN_LIEU_DE_DROIT)

    const decouvrirNosCriteres = within(main).getByRole('link', { name: wording.DECOUVRIR_NOS_CRITERES })
    expect(decouvrirNosCriteres).toHaveAttribute('href', paths.NOS_CRITERES_D_ACCESSIBILITE)

    const aProposTitle = within(main).getByRole('heading', { level: 2, name: wording.TITLE_A_PROPOS_DE_DROIT_PLURIEL })
    expect(aProposTitle).toBeInTheDocument()

    const droitPlurielEstUneAssociation = within(main).getByText(textMatch(wording.DROIT_PLURIEL_EST_UNE_ASSOCIATION + wording.RETROUVEZ_PLUS_D_INFOS + paths.SITE_DROIT_PLURIEL), { selector: 'p' })
    const lienSiteDroitPluriel = within(droitPlurielEstUneAssociation).getByRole('link', { name: paths.SITE_DROIT_PLURIEL })
    expect(lienSiteDroitPluriel).toHaveAttribute('href', paths.SITE_DROIT_PLURIEL)

    const titleNousContacter = within(main).getByRole('heading', { level: 2, name: wording.TITLE_NOUS_CONTACTER })
    expect(titleNousContacter).toBeInTheDocument()

    // eslint-disable-next-line
    const coordonneesDroitPluriel = within(main).getByText(
      textMatch(`${wording.ADRESSE_NOM_DROIT_PLURIEL}${wording.ADRESSE_LIEU_DROIT_PLURIEL}${wording.PAR_EMAIL}${wording.EMAIL_DROIT_PLURIEL}${wording.TELEPHONE_DROIT_PLURIEL}`), { selector: 'address' }
    )

    const lienMail = within(coordonneesDroitPluriel).getByRole('link', { name: wording.EMAIL_DROIT_PLURIEL })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.EMAIL_DROIT_PLURIEL)
  })
})
