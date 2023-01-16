import { screen, within } from '@testing-library/react'

import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'
import FoireAuxQuestions from './FoireAuxQuestions'

describe('en-tête de page', () => {
  const { wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<FoireAuxQuestions />)

    // THEN
    expect(document.title).toBe(wording.TITLE_FOIRE_AUX_QUESTIONS)
  })

  it('affiche le contenu de la page', () => {
    // WHEN
    renderFakeComponent(<FoireAuxQuestions />)

    // THEN
    const main = screen.getByRole('main')
    const questionsEtReponses = [
      within(main).getByRole('heading', { level: 3, name: wording.QUESTION_JE_NE_TROUVE_AUCUN_LIEU }),
      within(main).getByText(textMatch(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU), { selector: 'p' }),

      within(main).getByRole('heading', { level: 3, name: wording.QUESTION_EST_CE_QUE_AIDE_GRATUITE }),
      within(main).getByText(textMatch(wording.REPONSE_EST_CE_QUE_AIDE_GRATUITE), { selector: 'p' }),

      within(main).getByRole('heading', { level: 3, name: wording.QUESTION_QUI_VA_ME_RECEVOIR }),
      within(main).getByText(textMatch(wording.REPONSE_QUI_VA_ME_RECEVOIR), { selector: 'p' }),

      within(main).getByRole('heading', { level: 3, name: wording.QUESTION_EST_CE_QUE_L_AVOCAT }),
      within(main).getByText(textMatch(wording.REPONSE_EST_CE_QUE_L_AVOCAT), { selector: 'p' }),

      within(main).getByRole('heading', { level: 3, name: wording.QUESTION_JE_SUIS_ALLEE_SUR_PLACE }),
      within(main).getByText(textMatch(wording.REPONSE_JE_SUIS_ALLEE_SUR_PLACE), { selector: 'p' }),

      within(main).getByRole('heading', { level: 3, name: wording.QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT }),
      within(main).getByText(textMatch(wording.REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT), { selector: 'p' }),
    ]

    questionsEtReponses.forEach((questionEtReponse) => expect(questionEtReponse).toBeInTheDocument())

  })
})
