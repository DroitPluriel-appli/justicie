/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Critere } from '../../backend/entities/Critere'

/* eslint-disable @typescript-eslint/no-unsafe-call */
export const tagResultatsDeRecherche = (isAffichageListe: boolean, nombreDeResultats: number, accessibilites: Critere[]) => {
  // @ts-ignore
  window.dataLayer?.push({
    criteresDAccessibiliteSelectionnes: accessibilites,
    event: 'resultatsDeRecherche',
    nombreDeResultats: nombreDeResultats,
    typeDAffichage: isAffichageListe ? 'liste' : 'plan',
  })
}
