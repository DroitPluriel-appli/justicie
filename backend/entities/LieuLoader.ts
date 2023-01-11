import { Critere } from '../../configuration/criteres'
import { Lieu } from './Lieu'

export interface LieuLoader {
  recupereUnLieu(id: number, latitude?: number, longitude?: number): Promise<Lieu[]>
  recupereDesLieux(
    latitude: number,
    longitude: number,
    page?: number,
    nombreDeLieuxAffichesParPage?: number,
    accessibilites?: keyof Critere['name'][] | []
  ): Promise<{ lieux: Lieu[], nombreDeResultat: number }>
}
