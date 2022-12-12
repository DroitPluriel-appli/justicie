import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import singletonRouter from 'next/router'

import { fakeFrontDependencies, FireEventOptions, renderFakeComponent } from '../../configuration/testHelper'
import RenseignerUneAdresse from './RenseignerUneAdresse'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock/async'))

describe('resneigner une adresse', () => {
  const { paths, wording } = fakeFrontDependencies

  it('affiche le formulaire', () => {
    // WHEN
    renderFakeComponent(<RenseignerUneAdresse />)

    // THEN
    const retourAlAccueil = screen.getByRole('link', { name: wording.RETOUR_A_L_ACCUEIL })
    expect(retourAlAccueil).toHaveAttribute('href', paths.ACCUEIL)

    const formulaire = screen.getByRole('search')
    expect(formulaire).toHaveAttribute('action', paths.RECHERCHER_PAR_HANDICAP)
    const renseignerUneAdresse = within(formulaire).getByLabelText(wording.RENSEIGNER_UNE_ADRESSE)
    expect(renseignerUneAdresse).toBeInTheDocument()
    const input = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    expect(input).toBeInTheDocument()
    const effacerLAdresse = within(formulaire).getByRole('button', { name: wording.EFFACER_L_ADRESSE })
    expect(effacerLAdresse).toBeInTheDocument()
    const notice = screen.getByText(wording.NOTICE_DES_RESULTATS, { selector: 'span' })
    expect(notice).toBeInTheDocument()
    const validerLAdresse = within(formulaire).getByRole('button', { name: wording.VALIDER_L_ADRESSE })
    expect(validerLAdresse).toHaveAttribute('type', 'submit')
    expect(validerLAdresse).toBeDisabled()
  })

  it('affiche des résultats quand il y a au moins 3 caractères renseignés', () => {
    // GIVEN
    renderFakeComponent(<RenseignerUneAdresse />)
    const formulaire = screen.getByRole('search')
    const renseignerUneAdresse = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    const event: FireEventOptions = { target: { value: 'france' } }

    // WHEN
    fireEvent.change(renseignerUneAdresse, event)

    // THEN
    const list = screen.getByRole('listbox')
    const resultats = within(list).getAllByRole('option')
    expect(resultats[0].textContent).toBe('france')
    expect(resultats[1].textContent).toBe('france')
  })

  it('n’affiche pas de résultats quand il y a moins de 3 caractères renseignés', () => {
    // GIVEN
    renderFakeComponent(<RenseignerUneAdresse />)
    const formulaire = screen.getByRole('search')
    const renseignerUneAdresse = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    const value: FireEventOptions = { target: { value: 'fr' } }

    // WHEN
    fireEvent.change(renseignerUneAdresse, value)

    // THEN
    const list = screen.getByRole('listbox')
    const resultats = within(list).queryAllByRole('option')
    expect(resultats).toHaveLength(0)
  })

  it.each([
    ['touchStart'],
    ['click'],
  ])('efface l’adresse quand on %s sur le bouton', (event) => {
    // GIVEN
    renderFakeComponent(<RenseignerUneAdresse />)
    const formulaire = screen.getByRole('search')
    const renseignerUneAdresse = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    const value: FireEventOptions = { target: { value: 'fr' } }
    fireEvent.change(renseignerUneAdresse, value)
    const effacerLAdresse = screen.getByRole('button', { name: wording.EFFACER_L_ADRESSE })

    // WHEN
    fireEvent[event as 'touchStart' | 'click'](effacerLAdresse)

    // THEN
    const adresseEffacee = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    expect(adresseEffacee).toHaveValue('')
  })

  it.each([
    ['Space'],
    ['Enter'],
  ])('efface l’adresse quand on appuie sur le bouton avec la touche %s', (code) => {
    // GIVEN
    renderFakeComponent(<RenseignerUneAdresse />)
    const formulaire = screen.getByRole('search')
    const renseignerUneAdresse = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    const value: FireEventOptions = { target: { value: 'fr' } }
    fireEvent.change(renseignerUneAdresse, value)
    const effacerLAdresse = screen.getByRole('button', { name: wording.EFFACER_L_ADRESSE })

    // WHEN
    fireEvent.keyDown(effacerLAdresse, { code })

    // THEN
    const adresseEffacee = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    expect(adresseEffacee).toHaveValue('')
  })

  it('va à l’étape 2 quand je soumets le formulaire avec une adresse valide', async () => {
    // GIVEN
    renderFakeComponent(<RenseignerUneAdresse />)
    const formulaire = screen.getByRole('search')
    const renseignerUneAdresse = within(formulaire).getByPlaceholderText(wording.RENSEIGNER_UNE_ADRESSE)
    const value: FireEventOptions = { target: { value: 'france' } }
    fireEvent.change(renseignerUneAdresse, value)
    const list = screen.getByRole('listbox')
    const resultats = within(list).getAllByRole('option')
    fireEvent.click(resultats[0])
    const validerLAdresse = within(formulaire).getByRole('button', { name: wording.VALIDER_L_ADRESSE })

    // WHEN
    fireEvent.submit(validerLAdresse)

    // THEN
    await waitFor(() => {
      expect(singletonRouter.asPath).toBe(`/${paths.RECHERCHER_PAR_HANDICAP}?lat=43.296482&lon=5.36978`)
    })
  })
})
