import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'lieu' })
export class LieuModel {
  @PrimaryColumn({ name: 'id', type: 'int' })
  public id!: number

  @Column({ length: 255, name: 'nom', type: 'varchar' })
  public nom!: string

  @Column({ length: 255, name: 'adresse', type: 'varchar' })
  public adresse!: string

  @Column({ length: 5, name: 'code_postal', type: 'varchar' })
  public codePostal!: string

  @Column({ length: 255, name: 'ville', type: 'varchar' })
  public ville!: string

  @Column({ length: 255, name: 'site_internet', type: 'varchar' })
  public siteInternet!: string

  @Column({ length: 14, name: 'telephone', type: 'varchar' })
  public telephone!: string

  @Column({ name: 'prise_de_rendez_vous', type: 'text' })
  public priseDeRendezVous!: string

  @Column({ name: 'domaine_de_droit', type: 'text' })
  public domaineDeDroit!: string

  @Column({ name: 'latitude', type: 'float' })
  public latitude!: number

  @Column({ name: 'longitude', type: 'float' })
  public longitude!: number

  @Column({ length: 255, name: 'e_mail', type: 'varchar' })
  public eMail!: string

  @Column({ name: 'horaire', type: 'text' })
  public horaire!: string

  @Column({ length: 255, name: 'departement', type: 'varchar' })
  public departement!: string

  @Column({ length: 255, name: 'region', type: 'varchar' })
  public region!: string

  @Column({ name: 'pmr', type: 'boolean' })
  public pmr!: boolean

  @Column({ name: 'pmr_assiste', type: 'boolean' })
  public pmr_assiste!: boolean

  @Column({ name: 'visuel', type: 'boolean' })
  public visuel!: boolean

  @Column({ name: 'bim', type: 'boolean' })
  public bim!: boolean

  @Column({ name: 'lsf', type: 'boolean' })
  public lsf!: boolean

  @Column({ name: 'calme', type: 'boolean' })
  public calme!: boolean

  @Column({ name: 'forme', type: 'boolean' })
  public forme!: boolean

  @Column({ name: 'commentaire', type: 'text' })
  public commentaire!: string

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
