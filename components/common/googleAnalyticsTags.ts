import { Critere } from '../../backend/entities/Critere'

export const tagResultatsDeRecherche = (typeDAffichage: 'liste' | 'plan', nombreDeResultats: number, criteresDAccessibiliteSelectionnes: Critere[]) => {
  // garder le '?' pour le cas où les cookies sont refusés
  window.dataLayer?.push({
    criteresDAccessibiliteSelectionnes,
    event: 'resultatsDeRecherche',
    nombreDeResultats,
    typeDAffichage,
  })
}
