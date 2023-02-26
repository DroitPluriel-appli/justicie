import { screen, within } from '@testing-library/react'

import PageFoireAuxQuestions from './PageFoireAuxQuestions'
import { fakeFrontDependencies, renderFakeComponent, textMatch } from '../../configuration/testHelper'

describe('page "Foire aux questions"', () => {
  const { wording } = fakeFrontDependencies

  it('affiche le titre de l’onglet', () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    expect(document.title).toBe(wording.TITLE_FOIRE_AUX_QUESTIONS)
  })

  it('affiche le titre', () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const titre = screen.getByRole('heading', { level: 1, name: wording.FOIRE_AUX_QUESTIONS })
    expect(titre).toBeInTheDocument()
  })

  it('affiche la question et la réponse permettant de savoir quoi faire si aucun lieu ne correspond à ma recherche', () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const question = screen.getByRole('heading', { level: 2, name: wording.QUESTION_JE_NE_TROUVE_AUCUN_LIEU })
    expect(question).toBeInTheDocument()

    const paragraphe2 = wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[1] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[2] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[5] +
      wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6] + '.'
    const reponse = [
      screen.getByText(textMatch(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[0]), { selector: 'p' }),
      screen.getByText(textMatch(paragraphe2), { selector: 'p' }),
      screen.getByText(textMatch(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[7] + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[8]), { selector: 'p' }),
    ]
    reponse.forEach((paragraph) => expect(paragraph).toBeInTheDocument())

    const lienTelephone = screen.getByRole('link', { name: wording.APPELER_LE_NUMERO(wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[3], wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4]) })
    expect(lienTelephone).toHaveAttribute('href', 'tel:' + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4].replaceAll(' ', ''))

    const lienMail = screen.getByRole('link', { name: wording.ENVOYER_UN_EMAIL_A + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6] })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6].replaceAll(' ', ''))
  })

  it("affiche la question et la réponse permettant de savoir si l'aide juridique est gratuite", () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const question = screen.getByRole('heading', { level: 2, name: wording.QUESTION_EST_CE_QUE_AIDE_GRATUITE })
    expect(question).toBeInTheDocument()
    const reponse = screen.getByText(wording.REPONSE_EST_CE_QUE_AIDE_GRATUITE, { selector: 'p' })
    expect(reponse).toBeInTheDocument()
  })

  it('affiche la question et la réponse permettant de savoir qui va me recevoir dans les lieux référencés', () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const question = screen.getByRole('heading', { level: 2, name: wording.QUESTION_QUI_VA_ME_RECEVOIR })
    expect(question).toBeInTheDocument()
    const reponse = screen.getByText(wording.REPONSE_QUI_VA_ME_RECEVOIR, { selector: 'p' })
    expect(reponse).toBeInTheDocument()
  })

  it("affiche la question et la réponse permettant de savoir si l'avocat qui me reçoit pourra me défendre pendant toute la procédure", () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const question = screen.getByRole('heading', { level: 2, name: wording.QUESTION_EST_CE_QUE_L_AVOCAT })
    expect(question).toBeInTheDocument()
    const reponse = screen.getByText(textMatch(wording.REPONSE_EST_CE_QUE_L_AVOCAT), { selector: 'p' })
    expect(reponse).toBeInTheDocument()
  })

  it("affiche la question et la réponse permettant de savoir que faire si je suis allée sur place et que l'accéssibilité n´est pas celle annoncée", () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const question = screen.getByRole('heading', { level: 2, name: wording.QUESTION_JE_SUIS_ALLEE_SUR_PLACE })
    expect(question).toBeInTheDocument()
    const reponse = screen.getByText(textMatch(wording.REPONSE_JE_SUIS_ALLEE_SUR_PLACE + wording.EMAIL_DROIT_PLURIEL + '.'), { selector: 'p' })
    expect(reponse).toBeInTheDocument()

    const lienMail = within(reponse).getByRole('link', { name: wording.ENVOYER_UN_EMAIL_A + wording.EMAIL_DROIT_PLURIEL })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.EMAIL_DROIT_PLURIEL)
  })

  it('affiche question et la réponse permettant de savoir si tous les lieux apparaissent', () => {
    // WHEN
    renderFakeComponent(<PageFoireAuxQuestions />)

    // THEN
    const question = screen.getByRole('heading', { level: 2, name: wording.QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT })
    expect(question).toBeInTheDocument()
    const reponse = screen.getByText(textMatch(wording.REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT + wording.EMAIL_DROIT_PLURIEL + '.'), { selector: 'p' })
    expect(reponse).toBeInTheDocument()

    const lienMail = within(reponse).getByRole('link', { name: wording.ENVOYER_UN_EMAIL_A + wording.EMAIL_DROIT_PLURIEL })
    expect(lienMail).toHaveAttribute('href', 'mailto:' + wording.EMAIL_DROIT_PLURIEL)
  })
})
