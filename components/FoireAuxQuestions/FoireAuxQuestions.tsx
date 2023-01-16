import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import Title from '../Title/Title'

export default function FoireAuxQuestions(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_FOIRE_AUX_QUESTIONS}
      </Title>
      <h2>
        {wording.FOIRE_AUX_QUESTIONS}
      </h2>
      <h3>
        {wording.QUESTION_JE_NE_TROUVE_AUCUN_LIEU}
      </h3>
      <p>
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU}
      </p>
      <h3>
        {wording.QUESTION_EST_CE_QUE_AIDE_GRATUITE}
      </h3>
      <p>
        {wording.REPONSE_EST_CE_QUE_AIDE_GRATUITE}
      </p>
      <h3>
        {wording.QUESTION_QUI_VA_ME_RECEVOIR}
      </h3>
      <p>
        {wording.REPONSE_QUI_VA_ME_RECEVOIR}
      </p>
      <h3>
        {wording.QUESTION_EST_CE_QUE_L_AVOCAT}
      </h3>
      <p>
        {wording.REPONSE_EST_CE_QUE_L_AVOCAT}
      </p>
      <h3>
        {wording.QUESTION_JE_SUIS_ALLEE_SUR_PLACE}
      </h3>
      <p>
        {wording.REPONSE_JE_SUIS_ALLEE_SUR_PLACE}
      </p>
      <h3>
        {wording.QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT}
      </h3>
      <p>
        {wording.REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT}
      </p>
    </>
  )
}
