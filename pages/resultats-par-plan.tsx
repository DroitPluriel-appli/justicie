import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import usePagePlan from '../components/Plan/usePagePlan'
import { LieuModel } from '../database/models/EntitéJuridiqueModel'

export default function PageResultatsParPlan(): ReactElement {

  const { query } = useRouter()
  const { getPosition } = usePagePlan()
  const planViewCenter = getPosition(query)

  const lieuA = new LieuModel()
  lieuA.id = 1234
  lieuA.latitude = 51.500
  lieuA.longitude = -0.09
  lieuA.nom = 'Lieu A'
  lieuA.adresse = '12 rue du Lieu A'
  lieuA.e_mail = 'contactLieuA@email.com'
  lieuA.ville = 'Paris-LieuA'
  lieuA.region = 'Ile-de-France'
  lieuA.horaire = 'Du lundi au vendredi de 8h à 20h'
  lieuA.telephone = '01 02 03 04 05'
  lieuA.departement = 'Seine-et-Marne'
  lieuA.priseDeRendezVous = 'Ce lieu est soumis à la prise de rendez-vous'
  lieuA.codePostal = '75002'
  lieuA.siteInternet = 'lieuA.fr'
  lieuA.bim = true
  lieuA.lsf = true
  lieuA.pmr = true
  lieuA.calme = true
  lieuA.forme = true
  lieuA.visuel = true
  lieuA.pmr_assiste = true
  lieuA.domaineDeDroit = 'Tout domaine'
  lieuA.commentaire = 'En partie formé'

  const lieuB = new LieuModel()
  lieuB.id = 1235
  lieuB.latitude = 51.580
  lieuB.longitude = -0.07
  lieuB.nom = 'Lieu B'
  lieuB.adresse = '34 Avenue de Lieu B'
  lieuB.e_mail = 'contactLieuB@email.com'
  lieuB.ville = 'StrasbourgB'
  lieuB.region = 'Alsace'
  lieuB.horaire = 'Lundi: 8h00 - 18h00\nMardi: 8h00-18h00\nMercredi: 8h00 - 18h00\nFermé les jeudis, vendredis, samedi et dimanche'
  lieuB.telephone = '11 22 33 44 55'
  lieuB.departement = 'Bas-Rhin'
  lieuB.priseDeRendezVous = "Ce lieu n'est pas soumis à la prise de rendez-vous"
  lieuB.codePostal = '67000'
  lieuB.siteInternet = 'siteWebDulieuC.fr'
  lieuB.bim = false
  lieuB.lsf = true
  lieuB.pmr = false
  lieuB.calme = true
  lieuB.forme = true
  lieuB.visuel = false
  lieuB.pmr_assiste = true
  lieuB.domaineDeDroit = 'Tout domaine'
  lieuB.commentaire = ''

  const lieuC = new LieuModel()
  lieuC.id = 1236
  lieuC.latitude = 51.530
  lieuC.longitude = -0.10
  lieuC.nom = 'Lieu C'
  lieuC.adresse = '13 rue du Lieu C'
  lieuC.e_mail = 'contactLieuB@email.com'
  lieuC.ville = 'Paris-LieuC'
  lieuC.region = 'Ile-de-France'
  lieuC.horaire = 'Du lundi au vendredi de 8h à 20h'
  lieuC.telephone = '01 02 03 04 05'
  lieuC.departement = 'Seine-et-Marne'
  lieuC.priseDeRendezVous = 'Ce lieu est soumis à la prise de rendez-vous'
  lieuC.codePostal = '75002'
  lieuC.siteInternet = 'lieuC.fr'
  lieuC.bim = false
  lieuC.lsf = false
  lieuC.pmr = false
  lieuC.calme = false
  lieuC.forme = false
  lieuC.visuel = false
  lieuC.pmr_assiste = true
  lieuC.domaineDeDroit = 'Domaine LieuC domaine'
  lieuC.commentaire = ''

  const Plan = dynamic(() => import('../components/Plan/Plan'), { ssr: false })
  if (planViewCenter !== undefined) {
    return (
      <Plan
        lieux={[lieuA, lieuB, lieuC]}
        viewCenter={planViewCenter}
      />
    )
  } else {
    return (
      <h2>
        {'Erreur : position invalide'}
      </h2>
    )
  }
}
