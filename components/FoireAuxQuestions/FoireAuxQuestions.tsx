import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import Email from '../Email/Email'
import Telephone from '../Telephone/Telephone'
import Title from '../Title/Title'
import styles from './FoireAuxQuestions.module.css'

export default function FoireAuxQuestions(): ReactElement {
  const { wording } = useDependencies()

  return (
    <div className={styles.main}>
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
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[0]}
      </p>
      <p>
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[1]}
        <br />
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[2]}
        <Telephone
          nomDuLieu={wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[3]}
          url={wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4]}
        >
          {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[4]}
        </Telephone>
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[5]}
        <Email url={wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6]}>
          {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[6]}
        </Email>
        {'.'}
      </p>
      <p>
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[7]}
        <br />
        {wording.REPONSE_JE_NE_TROUVE_AUCUN_LIEU[8]}
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
        <Email url={wording.EMAIL_DROIT_PLURIEL}>
          {wording.EMAIL_DROIT_PLURIEL}
        </Email>
        {'.'}
      </p>
      <h3>
        {wording.QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT}
      </h3>
      <p>
        {wording.REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT}
        <Email url={wording.EMAIL_DROIT_PLURIEL}>
          {wording.EMAIL_DROIT_PLURIEL}
        </Email>
        {'.'}
      </p>
    </div >
  )
}
