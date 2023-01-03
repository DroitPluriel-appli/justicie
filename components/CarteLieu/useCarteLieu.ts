import { Lieu } from '../../backend/entities/Lieu'
import { useDependencies } from '../../configuration/useDependencies'

export function useCarteLieu() {
  const { criteres } = useDependencies()

  const getCriteresImgSrcFromLieu = (lieu: Lieu) => {
    return criteres.filter((critere) => {
      const { name } = critere
      return (lieu[name as keyof Lieu])
    })
  }

  const lieuToGoogleMapLink = (lieu: Lieu): string => {
    const url = new URL('https://www.google.com/maps/search/')
    const lieuQueryString = `${lieu.nom}+${lieu.adresse}+${lieu.codePostal}+${lieu.ville}`
    url.searchParams.append('api', '1')
    url.searchParams.append('query', lieuQueryString.replaceAll(' ', '+'))
    return url.toString()
  }

  return { getCriteresImgSrcFromLieu, nomToGoogleMapLink: lieuToGoogleMapLink }
}
