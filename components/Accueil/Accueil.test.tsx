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
  })
})
