import { Critere } from './Critere'
import { Lieu } from './Lieu'

export interface LieuLoader {
  recupereUnLieu: (id: number, latitude: number, longitude: number) => Promise<ReadonlyArray<Lieu>>
  recupereDesLieux: (
    latitude: number,
    longitude: number,
    criteres: Set<Critere>,
    page?: number,
    nombreDeLieuxAffichesParPage?: number,
    rayonDeRecherche?: number
  ) => Promise<{ lieux: ReadonlyArray<Lieu>, nombreDeResultat: number }>
}
