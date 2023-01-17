import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import ExternalLink from '../ExternalLink/ExternalLink'
import styles from './VotreAvis.module.css'

export default function VotreAvis(): ReactElement {
  const { wording } = useDependencies()

  return (
    <ExternalLink
      className={`${styles.votreAvis} votre-avis`}
      href="https://docs.google.com/forms/d/1sA-EWWn5LNXc2G3WWDIEcFhl5RBZYsMMbGWN2FHnndE/viewform"
      title={wording.DONNEZ_NOUS_VOTRE_AVIS}
    >
      {wording.VOTRE_AVIS}
    </ExternalLink>
  )
}
