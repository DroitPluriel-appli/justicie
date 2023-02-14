import { Critere } from '../../backend/entities/Critere'

declare global {
  interface Window {
    dataLayer: Record<string, string | Critere[] | number>[];
  }
}

export const tagResultatsDeRecherche = (typeDAffichage: 'liste' | 'plan', nombreDeResultats: number, criteresDAccessibiliteSelectionnes: Critere[]) => {
  // garder le '?' pour le cas où les cookies sont refusés
  window.dataLayer?.push({
    criteresDAccessibiliteSelectionnes,
    event: 'resultatsDeRecherche',
    nombreDeResultats,
    typeDAffichage,
  })
}
