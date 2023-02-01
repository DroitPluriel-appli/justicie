import { Critere } from './Critere'
import { Lieu } from './Lieu'

export interface LieuLoader {
  recupereUnLieu(id: number, latitude?: number, longitude?: number): Promise<Lieu[]>
  recupereDesLieux(
    latitude: number,
    longitude: number,
    rayonDeRecherche?: number,
    page?: number,
    nombreDeLieuxAffichesParPage?: number,
    criteres?: Set<Critere>
  ): Promise<{ lieux: Lieu[], nombreDeResultat: number }>
}
