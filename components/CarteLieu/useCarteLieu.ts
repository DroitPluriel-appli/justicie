import { useDependencies } from '../../configuration/useDependencies'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'

export function useCarteLieu() {
  const { criteres } = useDependencies()

  const getCriteresImgSrcFromLieu = (lieu: LieuModel) => {
    return criteres.map((critere) => {
      const { name } = critere
      return lieu[name as keyof LieuModel] ? critere : null
    }).filter((critere) => critere !== null)
  }

  const nomToGoogleMapLink = (nom: string): string => {
    return `https://www.google.com/maps/search/?api=1&query=${nom.replaceAll(' ', '+')}`
  }

  return { getCriteresImgSrcFromLieu, nomToGoogleMapLink }
}
