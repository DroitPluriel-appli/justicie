import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'lieu' })
export class LieuModel {
  @PrimaryColumn({ name: 'id', type: 'int' })
  declare id: number

  @Column({ length: 255, name: 'nom', type: 'varchar' })
  declare nom: string

  @Column({ length: 255, name: 'adresse', type: 'varchar' })
  declare adresse: string

  @Column({ length: 5, name: 'code_postal', type: 'varchar' })
  declare codePostal: string

  @Column({ length: 255, name: 'ville', type: 'varchar' })
  declare ville: string

  @Column({ length: 255, name: 'site_internet', type: 'varchar' })
  declare siteInternet: string

  @Column({ length: 14, name: 'telephone', type: 'varchar' })
  declare telephone: string

  @Column({ name: 'prise_de_rendez_vous', type: 'text' })
  declare priseDeRendezVous: string

  @Column({ name: 'domaine_de_droit', type: 'text' })
  declare domaineDeDroit: string

  @Column({ name: 'latitude', type: 'float' })
  declare latitude: number

  @Column({ name: 'longitude', type: 'float' })
  declare longitude: number

  @Column({ length: 255, name: 'e_mail', type: 'varchar' })
  declare eMail: string

  @Column({ name: 'horaire', type: 'text' })
  declare horaire: string

  @Column({ length: 255, name: 'departement', type: 'varchar' })
  declare departement: string

  @Column({ length: 255, name: 'region', type: 'varchar' })
  declare region: string

  @Column({ name: 'pmr', type: 'boolean' })
  declare pmr: boolean

  @Column({ name: 'pmr_assiste', type: 'boolean' })
  declare pmr_assiste: boolean

  @Column({ name: 'visuel', type: 'boolean' })
  declare visuel: boolean

  @Column({ name: 'bim', type: 'boolean' })
  declare bim: boolean

  @Column({ name: 'lsf', type: 'boolean' })
  declare lsf: boolean

  @Column({ name: 'calme', type: 'boolean' })
  declare calme: boolean

  @Column({ name: 'forme', type: 'boolean' })
  declare forme: boolean

  @Column({ name: 'commentaire', type: 'text' })
  declare commentaire: string

  public distance?: number

  public static cree(champsSurcharges?: Partial<LieuModel>): LieuModel {
    const lieu = new LieuModel()
    lieu.id = champsSurcharges?.id || 1
    lieu.nom = champsSurcharges?.nom || 'Maison de Justice et du Droit de Bourg en Bresse'
    lieu.adresse = champsSurcharges?.adresse || '34 cours de Verdun'
    lieu.codePostal = champsSurcharges?.codePostal || '1000'
    lieu.ville = champsSurcharges?.ville || 'Bourg En Bresse'
    lieu.siteInternet = champsSurcharges?.siteInternet || 'https://www.ain.gouv.fr/'
    lieu.telephone = champsSurcharges?.telephone || '04 74 14 01 40'
    lieu.priseDeRendezVous = champsSurcharges?.priseDeRendezVous || 'OUI\nmais pas le dimanche'
    lieu.domaineDeDroit = champsSurcharges?.domaineDeDroit || 'TOUT DOMAINES'
    lieu.latitude = champsSurcharges?.latitude || 46.2064358
    lieu.longitude = champsSurcharges?.longitude || 5.2272134
    lieu.eMail = champsSurcharges?.eMail || 'mjd.bourg-en-bresse@example.com'
    lieu.horaire = champsSurcharges?.horaire || 'Lundi 9h00 à 12h00 et de 13h30 à 17h00\nMardi 9h00 à 12h00 et de 13h30 à 17h00\nMercredi 9h00 à 12h00 et de 13h30 à 17h00\nJeudi 9h00 à 12h00 et de 13h30 à 17h00\nVendredi 9h00 à 12h00 et de 13h30 à 17h00'
    lieu.departement = champsSurcharges?.departement || 'Ain'
    lieu.region = champsSurcharges?.region || 'Auvergne-Rhône-Alpes'
    lieu.pmr = champsSurcharges?.pmr || true
    lieu.pmr_assiste = champsSurcharges?.pmr_assiste || true
    lieu.visuel = champsSurcharges?.visuel || true
    lieu.bim = champsSurcharges?.bim || false
    lieu.lsf = champsSurcharges?.lsf || false
    lieu.calme = champsSurcharges?.calme || false
    lieu.forme = champsSurcharges?.forme || false
    lieu.commentaire = champsSurcharges?.commentaire !== undefined ? champsSurcharges.commentaire : 'En partie\nformé'
    return lieu
  }
}
