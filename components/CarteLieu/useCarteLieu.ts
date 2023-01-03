import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'

export function useCarteLieu() {
  const { criteres } = useDependencies()

  const getCriteresImgSrcFromLieu = (lieu: Lieu) => {
    return criteres.map((critere) => {
      const { name } = critere
      return lieu[name as keyof Lieu] ? critere : null
    }).filter((critere) => critere !== null)
  }

  const lieuToGoogleMapLink = (lieu: Lieu): string => {
    const parser = (text: string) => text.replaceAll(' ', '+')
    return 'https://www.google.com/maps/search/?api=1&query=' + parser(`${lieu.nom}+${lieu.adresse}+${lieu.codePostal}+${lieu.ville}`)
  }

  return { getCriteresImgSrcFromLieu, nomToGoogleMapLink: lieuToGoogleMapLink }
}
