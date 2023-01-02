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

  const lieuToGoogleMapLink = (lieu: LieuModel): string => {
    const parser = (text: string) => text.replaceAll(' ', '+')
    return 'https://www.google.com/maps/search/?api=1&query=' + parser(`${lieu.nom}+${lieu.adresse}+${lieu.codePostal}+${lieu.ville}`)
  }

  return { getCriteresImgSrcFromLieu, nomToGoogleMapLink: lieuToGoogleMapLink }
}
