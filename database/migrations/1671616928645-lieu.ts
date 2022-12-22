import { MigrationInterface, QueryRunner } from 'typeorm'

export class Lieu1671616928645 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE lieu (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        code_postal VARCHAR(5) NOT NULL,
        ville VARCHAR(255) NOT NULL,
        site_internet VARCHAR(255) NOT NULL,
        telephone VARCHAR(14) NOT NULL,
        prise_de_rendez_vous TEXT NOT NULL,
        domaine_de_droit TEXT NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        e_mail VARCHAR(255) NOT NULL,
        horaire TEXT NOT NULL,
        departement VARCHAR(255) NOT NULL,
        region VARCHAR(255) NOT NULL,
        pmr BOOLEAN NOT NULL,
        pmr_assiste BOOLEAN NOT NULL,
        visuel BOOLEAN NOT NULL,
        bim BOOLEAN NOT NULL,
        lsf BOOLEAN NOT NULL,
        calme BOOLEAN NOT NULL,
        forme BOOLEAN NOT NULL,
        commentaire TEXT NOT NULL
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE lieu;')
  }
}
