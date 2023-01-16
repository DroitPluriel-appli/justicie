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

  it('affiche question + reponse "Je ne trouve aucun lieu qui correspond à ma recherche', () => {
    // WHEN
    renderFakeComponent(<FoireAuxQuestions />)

    // THEN
    const main = screen.getByRole('main')
    const question = within(main).getByRole('heading', { level: 3, name: wording.QUESTION_JE_NE_TROUVE_AUCUN_LIEU })
    expect(question).toBeInTheDocument()

    const paragraphe2 = wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[1] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[2] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[5] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6]
    const reponse = [
      within(main).getByText(textMatch(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[0]), { selector: 'p' }),
      within(main).getByText(textMatch(paragraphe2), { selector: 'p' }),
      within(main).getByText(textMatch(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[7] + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[8]), { selector: 'p' }),
    ]
    reponse.forEach((paragraph) => expect(paragraph).toBeInTheDocument())

    const lienTelephone = within(main).getByRole('link', { name: wording.APPELER_LE_NUMERO(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[3], wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4]) })
    expect(lienTelephone).toHaveAttribute('href', 'tel:' + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4].replaceAll(' ', ''))

    const lienMail = within(main).getByRole('link', { name: wording.ENVOYER_UN_EMAIL_A + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6] })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6].replaceAll(' ', ''))
  })
})

// const questionsEtReponses = [
//   within(main).getByRole('heading', { level: 3, name: wording.QUESTION_EST_CE_QUE_AIDE_GRATUITE }),
//   within(main).getByText(textMatch(wording.REPONSE_EST_CE_QUE_AIDE_GRATUITE), { selector: 'p' }),
//
//   within(main).getByRole('heading', { level: 3, name: wording.QUESTION_QUI_VA_ME_RECEVOIR }),
//   within(main).getByText(textMatch(wording.REPONSE_QUI_VA_ME_RECEVOIR), { selector: 'p' }),
//
//   within(main).getByRole('heading', { level: 3, name: wording.QUESTION_EST_CE_QUE_L_AVOCAT }),
//   within(main).getByText(textMatch(wording.REPONSE_EST_CE_QUE_L_AVOCAT), { selector: 'p' }),
//
//   within(main).getByRole('heading', { level: 3, name: wording.QUESTION_JE_SUIS_ALLEE_SUR_PLACE }),
//   within(main).getByText(textMatch(wording.REPONSE_JE_SUIS_ALLEE_SUR_PLACE.join('')), { selector: 'p' }),
//
//   within(main).getByRole('heading', { level: 3, name: wording.QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT }),
//   within(main).getByText(textMatch(wording.REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT.join('')), { selector: 'p' }),
// ]
//
// questionsEtReponses.forEach((questionEtReponse) => expect(questionEtReponse).toBeInTheDocument())
//
