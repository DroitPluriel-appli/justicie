import { ReactElement } from 'react'

import styles from './VotreAvis.module.css'
import { frontDependencies } from '../../../configuration/frontDependencies'
import ExternalLink from '../ExternalLink/ExternalLink'

export default function VotreAvis(): ReactElement {
  return (
    <ExternalLink
      className={`${styles.votreAvis} votre-avis`}
      href="https://docs.google.com/forms/d/1sA-EWWn5LNXc2G3WWDIEcFhl5RBZYsMMbGWN2FHnndE/viewform"
      title={frontDependencies.wording.DONNEZ_NOUS_VOTRE_AVIS}
    >
      {frontDependencies.wording.VOTRE_AVIS}
    </ExternalLink>
  )
}
