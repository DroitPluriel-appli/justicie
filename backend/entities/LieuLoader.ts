import { Lieu } from './Lieu'

export interface LieuLoader {
  recupereUnLieu(id: number, latitude?: number, longitude?: number): Promise<Lieu[]>
  recupereDesLieux(
    latitude: number,
    longitude: number,
    page?: number,
    nombreDeLieuxAffichesParPage?: number,
    accessibilites?: { name: string, value: boolean }[]
  ): Promise<Lieu[]>
}
