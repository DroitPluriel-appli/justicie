import { Critere } from '../../backend/entities/Critere'

export const tagResultatsDeRecherche = (typeDAffichage: 'liste' | 'plan', nombreDeResultats: number, criteresDAccessibiliteSelectionnes: ReadonlyArray<Critere>): void => {
  // garder le '?' pour le cas où les cookies sont refusés
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.dataLayer?.push({
    criteresDAccessibiliteSelectionnes,
    event: 'resultatsDeRecherche',
    nombreDeResultats,
    typeDAffichage,
  })
}
