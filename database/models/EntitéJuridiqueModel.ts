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
  public e_mail!: string

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
}
