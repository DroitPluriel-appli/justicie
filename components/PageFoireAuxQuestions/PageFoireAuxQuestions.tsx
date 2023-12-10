'use client'

import { ReactElement } from 'react'

import styles from './PageFoireAuxQuestions.module.css'
import Question from './Question/Question'
import { useDependencies } from '../../configuration/useDependencies'
import Email from '../common/Email/Email'
import Telephone from '../common/Telephone/Telephone'

export default function PageFoireAuxQuestions(): ReactElement {
  const { wording } = useDependencies()

  return (
    <div className={styles.main}>
      <h1>
        {wording.FOIRE_AUX_QUESTIONS}
      </h1>
      <Question titre={wording.QUESTION_JE_NE_TROUVE_AUCUN_LIEU}>
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
      </Question>
      <Question titre={wording.QUESTION_EST_CE_QUE_AIDE_GRATUITE}>
        <p>
          {wording.REPONSE_EST_CE_QUE_AIDE_GRATUITE}
        </p>
      </Question>
      <Question titre={wording.QUESTION_QUI_VA_ME_RECEVOIR}>
        <p>
          {wording.REPONSE_QUI_VA_ME_RECEVOIR}
        </p>
      </Question>
      <Question titre={wording.QUESTION_EST_CE_QUE_L_AVOCAT}>
        <p>
          {wording.REPONSE_EST_CE_QUE_L_AVOCAT}
        </p>
      </Question>
      <Question titre={wording.QUESTION_JE_SUIS_ALLEE_SUR_PLACE}>
        <p>
          {wording.REPONSE_JE_SUIS_ALLEE_SUR_PLACE}
          <Email url={wording.EMAIL_DROIT_PLURIEL}>
            {wording.EMAIL_DROIT_PLURIEL}
          </Email>
          {'.'}
        </p>
      </Question>
      <Question titre={wording.QUESTION_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT}>
        <p>
          {wording.REPONSE_EST_CE_QUE_TOUS_LES_LIEUX_APPARAISSENT}
          <Email url={wording.EMAIL_DROIT_PLURIEL}>
            {wording.EMAIL_DROIT_PLURIEL}
          </Email>
          {'.'}
        </p>
      </Question>
    </div>
  )
}
