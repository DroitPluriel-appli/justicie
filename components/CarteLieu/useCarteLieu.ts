// fonction qui prend tableau des criteres du lieu

import { useDependencies } from '../../configuration/useDependencies'
import { LieuModel } from '../../database/models/EntitéJuridiqueModel'

// et renvoie tableau de string ImgSrc
export function useCarteLieu() {
  const { criteres } = useDependencies()
  const getCriteresImgSrcFromLieu = (lieu: LieuModel) => {
    return criteres.map((critere) => {
      const { name } = critere
      if (lieu[name as keyof LieuModel]) {
        return critere
      } else {
        return null
      }
    }).filter((critere) => critere !== null)
  }

  const nomToGoogleMapLink = (nom: string): string => {
    return `https://www.google.com/maps/search/?api=1&query=${nom.replaceAll(' ', '+')}`
  }

  return { getCriteresImgSrcFromLieu, nomToGoogleMapLink }
}
