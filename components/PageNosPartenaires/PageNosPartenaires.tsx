import Image from 'next/image'
import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import ExternalLink from '../common/ExternalLink/ExternalLink'
import Title from '../common/Title/Title'
import LogoCNCAH from './logo-cncah.png'
import LogoFPA from './logo-fpa.png'
import LogoFFT from './LogoFFT'
import LogoOcto from './LogoOcto'
import LogoSeineSaintDenis from './LogoSeineSaintDenis'
import LogoShareIt from './LogoShareIt'
import LogoWavestone from './LogoWavestone'
import styles from './PageNosPartenaires.module.css'

export default function PageNosPartenaires(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_NOS_PARTENAIRES}
      </Title>
      <h2 className={styles.titre2}>
        {wording.NOS_PARTENAIRES}
      </h2>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://www.ccah.fr/"
          title="Comité national Coordination Action Handicap"
        >
          <Image
            alt="Comité national Coordination Action Handicap"
            height="103"
            src={LogoCNCAH}
            width="370"
          />
        </ExternalLink>
        <br />
        {'Le Comité national Coordination Action Handicap et ses membres accompagnent les porteurs de projets du secteur du handicap dans l’objectif d’améliorer la vie quotidienne des personnes handicapées et de favoriser le vivre ensemble. Le CCAH est un partenaire régulier de notre association et s’est investi sur plusieurs missions menées par Droit Pluriel. En 2020, le CCAH a attribué le prix « Handicap et numérique » à l’association Droit Pluriel pour ce projet d’application recensant les permanences juridiques gratuites et leur accessibilité. Ce prix a permis à l’association Droit Pluriel de bénéficier de l’expertise et de l’accompagnement de Share It.'}
      </p>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://www.share-it.io/"
          title="Share it"
        >
          <LogoShareIt />
        </ExternalLink>
        <br />
        {'Share it a été initié avec Ashoka pour permettre aux entrepreneur.e.s sociaux de bénéficier des bienfaits du numérique. Depuis 2018, nous accompagnons gratuitement les associations en développant avec elles des solutions digitales au service de leur impact grâce à des équipes tech dédiées et de qualité. L’accompagnement de Share it auprès des associations est possible grâce au mécénat de compétences. Dans le cadre de ce projet, des équipes de Wavestone et d’Octo ont collaboré pour développer Justice Plurielle.'}
      </p>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://www.wavestone.com/fr/"
          title="Wavestone"
        >
          <LogoWavestone />
        </ExternalLink>
        <br />
        {'Wavestone, cabinet de conseil en transformation des entreprises, s’est donné pour mission d’accompagner les grandes entreprises et institutions publiques dans leurs transformations. Le cabinet propose une vision à 360° de ces transformations en conjuguant étroitement, sans couture, les meilleures compétences business, technologiques et développement durable. Wavestone rassemble près de 4 000 collaborateur.rice.s en Europe, aux Etats-Unis et en Asie.'}
      </p>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://www.octo.com/"
          title="OCTO Technologie"
        >
          <LogoOcto />
        </ExternalLink>
        <br />
        {'De la startup à la multinationale, OCTO intervient partout où l’informatique joue un rôle déterminant dans la transformation des sociétés. OCTO est un acteur de la transformation numérique, notre mission est d’accompagner nos clients sur ces chemins, et de le faire de la manière la plus raisonnée et éclairée possible, d’un point de vue environnemental et social.'}
      </p>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://seinesaintdenis.fr/"
          title="Seine-Saint-Denis"
        >
          <LogoSeineSaintDenis />
        </ExternalLink>
        <br />
        {'La Seine-Saint-Denis est un département français situé au nord-est de l’agglomération parisienne, appartenant à la petite couronne de la région Île-de-France. Le conseil départemental du 93 est partenaire de l’association Droit Pluriel. Il soutient ce projet d’application recensant l’accessibilité des permanences juridiques gratuites dans le département 93.'}
      </p>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://www.fftelecoms.org/"
          title="Fédération Française des Télécoms"
        >
          <LogoFFT />
        </ExternalLink>
        <br />
        {'L’association est lauréate du prix Télécoms Innovations 2022. La Fédération française des Télécoms, Google et Samsung soutiennent ainsi le projet grâce à l’attribution d’une dotation financière.'}
      </p>
      <br />
      <p>
        {'À propos de la Fédération Française des Télécoms :'}
        <br />
        {'Créée le 24 septembre 2007, la Fédération Française des Télécoms (FFTélécoms) réunit les opérateurs de communications électroniques en France. Elle a pour mission de promouvoir une industrie responsable et innovante au regard de la société, de l’environnement, des personnes et des entreprises, de défendre les intérêts économiques du secteur et de valoriser l’image de ses membres et de la profession au niveau national et international. Pour réaliser ses missions, la Fédération organise dans l’intérêt de ses membres, un dialogue structuré et constant avec l’ensemble des parties prenantes du secteur et de son environnement institutionnel et privé.'}
        <br />
        {'Elle assure de façon exigeante la représentation du secteur sur les questions d’intérêt commun dans le respect absolu des règles de la concurrence en vigueur.'}
        <br />
        <br />
        {'À propos de Google :'}
        <br />
        {'La mission de Google est d’organiser les informations à l’échelle mondiale pour les rendre accessibles et utiles à tous. Google est une filiale d’Alphabet Inc. et opère en France depuis plus de 18 ans. Google en France représente plus de 1200 collaborateurs qui travaillent chaque jour pour mettre à disposition des produits utiles aux français dans leur vie quotidienne comme YouTube, Chrome ou Android –'}
        <br />
        {'et utiles aux entreprises de toutes tailles pour développer leur activité en ligne.'}
        <br />
        <br />
        {'À propos de Samsung :'}
        <br />
        {'Samsung inspire le monde et façonne l’avenir grâce à ses idées et technologies innovantes. L’entreprise réinvente ainsi le monde de la télévision, des smartphones, des objets connectés, des tablettes, de l’électroménager, des réseaux, du stockage, des systèmes LSI, de la fonderie et des LED.'}
      </p>
      <p>
        <ExternalLink
          className={styles.media}
          href="https://www.fondationpourlaudition.org/"
          title="Fondation Pour l’Audition"
        >
          <Image
            alt="Fondation Pour l’Audition"
            height="191"
            src={LogoFPA}
            width="191"
          />
        </ExternalLink>
        <br />
        {'Reconnue d’utilité publique depuis 2015, la Fondation Pour l’Audition a pour ambition de fédérer les talents dans le but de faire progresser la cause de l’audition et d’aider les personnes sourdes, malentendantes ou acouphéniques à mieux vivre au quotidien. La Fondation Pour l’Audition soutient le projet d’application recensant les permanences juridiques gratuites accessibles pour les personnes sourdes et malentendantes.'}
      </p>
    </>
  )
}
