import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import Email from '../common/Email/Email'
import ExternalLink from '../common/ExternalLink/ExternalLink'
import Title from '../common/Title/Title'
import styles from './PagePolitiqueDeConfidentialite.module.css'

export default function PagePolitiqueDeConfidentialite(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_POLITIQUE_DE_CONFIDENTIALITE}
      </Title>
      <h2 className={styles.titre2}>
        {'Politique de confidentialité'}
      </h2>
      <p>
        {'Le site « '}
        <ExternalLink
          href="https://justice-plurielle.osc-fr1.scalingo.io/"
          title="Justice Plurielle"
        >
          {'Justice Plurielle'}
        </ExternalLink>
        {' » (ci-après le Site) a pour objet de présenter les permanences juridiques gratuites existant en France et leur accessibilité référencées par l’association Droit Pluriel (ci-après « Droit Pluriel »). Il est accessible 7 jours sur 7, 24 heures sur 24, sous réserve des interruptions nécessaires aux opérations techniques de maintenance, d’entretien et de mise à jour que Droit Pluriel jugerait utile d’effectuer. Lors de votre première connexion sur le site web de Droit Pluriel, vous êtes avertis par un bandeau en bas de votre écran que des informations relatives à votre navigation sont susceptibles d’être enregistrées dans des fichiers dénommés « cookies ». Notre politique d’utilisation des cookies vous permet de mieux comprendre les dispositions que nous mettons en œuvre en matière de navigation sur notre site web. Elle vous informe notamment sur l’ensemble des cookies présents sur notre site web. (ARTICLE 2).'}
      </p>
      <h3>
        {'ARTICLE 1 – DONNÉES A CARACTÈRE PERSONNEL'}
      </h3>
      <h4>
        {'1. DÉFINITIONS'}
      </h4>
      <p>
        {'Donnée à caractère personnel : constitue une donnée à caractère personnel toute information relative à une personne physique identifiée ou qui peut être identifiée, directement ou indirectement, par référence à un numéro d’identification ou à un ou plusieurs éléments qui lui sont propres.'}
        <br />
        {'Traitement de données à caractère personnel : constitue un traitement de données à caractère personnel toute opération ou tout ensemble d’opérations portant sur de telles données, quel que soit le procédé utilisé, et notamment la collecte, l’enregistrement, l’organisation, la conservation, l’adaptation ou la modification, l’extraction, la consultation, l’utilisation, la communication par transmission, diffusion ou toute autre forme de mise à disposition, le rapprochement ou l’interconnexion, ainsi que le verrouillage, l’effacement ou la destruction.'}
        <br />
        {'Cookie : un cookie est une information déposée sur le disque dur d’un internaute par le serveur du site qu’il visite. Il contient plusieurs données : le nom du serveur qui l’a déposé, un identifiant sous forme de numéro unique, éventuellement une date d’expiration. Ces informations sont parfois stockées sur l’ordinateur dans un simple fichier texte auquel un serveur accède pour lire et enregistrer des informations.'}
      </p>
      <h4>
        {'1.2 RESPONSABLE DU TRAITEMENT'}
      </h4>
      <p>
        {'Le responsable du traitement des données personnelles visées aux présentes est l’association Droit Pluriel, dont le siège social est situé au 47 avenue Pasteur, 93100 Montreuil représentée par Madame Anne-Sarah KERTUDO .'}
        <br />
        {'Numéro de SIRET : 82092976800019.'}
      </p>
      <h4>
        {'1.3 DONNÉES COLLECTÉES SUR LE SITE'}
      </h4>
      <p>
        {'Lorsque l’utilisateur utilise le Site et fait une recherche de permanence juridique gratuite, Droit Pluriel collecte et traite les données suivantes :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Localisation'}
        </li>
        <li>
          {'Besoins en accessibilité exprimés'}
        </li>
      </ul>
      <p>
        {'Les données sont collectées automatiquement du fait des actions de l’utilisateur sur le site (voir le paragraphe relatif aux cookies).'}
      </p>
      <h4>
        {'1.4 DESTINATAIRES DES DONNÉES'}
      </h4>
      <p>
        {'Droit Pluriel s’engage à ne pas céder ni louer les données recueillies. La divulgation à des tiers des données à caractère personnel fournies ne pourra intervenir que dans les cas suivants : sur autorisation du titulaire des données, sur demande des autorités légalement compétentes, sur réquisition judiciaire, ou dans le cadre d’un contentieux judiciaire.'}
      </p>
      <h4>
        {'1.5 FINALITÉS – FONDEMENT JURIDIQUE DU TRAITEMENT'}
      </h4>
      <p>
        {'Le traitement des données à caractère personnel est nécessaire à l’exécution des missions de l’association Droit Pluriel. Il est fondé sur l’article 6, paragraphe 1, points a) et f) du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016. Les finalités sont les suivantes :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'La mesure d’impact du Site (KPI) ;'}
        </li>
        <li>
          {'Les actions de plaidoyer nécessaires au fonctionnement de l’association ;'}
        </li>
        <li>
          {'La mise en œuvre de la recherche de permanences juridiques gratuites.'}
        </li>
      </ul>
      <h4>
        {'1.6 DURÉE DE CONSERVATION DES DONNÉES'}
      </h4>
      <p>
        {'Les données relatives à la localisation et aux besoins en termes d’accessibilité sont conservées pendant deux ans. A l’issue de ces délais, sauf à recueillir votre consentement pour une durée plus longue, elles seront archivées pendant la durée légale de prescription avant destruction définitive.'}
      </p>
      <h4>
        {'1.7 DROITS DES TITULAIRES DES DONNÉES PERSONNELLES'}
      </h4>
      <p>
        {'Les personnes dont les données à caractère personnel sont collectées bénéficient d’un droit d’accès aux données à caractère personnel les concernant, la rectification ou l’effacement de celles-ci, une limitation du traitement, la portabilité des données ainsi que du droit de s’opposer au traitement. L’utilisateur est toutefois informé que les données à caractère personnel collectée sont nécessaires à l’exécution de la relation avec Droit Pluriel de sorte qu’en cas d’usage de son droit d’effacement desdites données, d’opposition ou de limitation des traitements, il pourra être mis un terme à la relation. Ces droits peuvent être exercés en utilisant les modèles proposés par la CNIL. Toute demande d’exercice de droits doit être accompagnée de la photocopie d’un justificatif d’identité signé (carte nationale d’identité délivrée par l’État français ou carte d’identité de l’Union Européenne ou passeport, carte de résident délivrée par l’État français, carte de séjour délivrée par l’État français ou livret de circulation délivré par l’État français). Droit Pluriel répond à la personne ayant fait l’usage d’un des droits susvisés dans un délai d’un mois à compter de la réception de la demande. Ce délai peut néanmoins être prolongé de deux mois, compte tenu de la complexité et du nombre de demandes. Dans cette hypothèse, Droit Pluriel informera la personne concernée de cette prolongation dans le délai d’un mois à compter de la réception de la demande. Lorsque la personne concernée formule sa demande sous une forme électronique, les informations sont fournies par voie électronique lorsque cela est possible et à moins qu’elle ne demande qu’il en soit autrement. En cas de refus du responsable du traitement de donner suite à la demande d’information formulée par la personne concernée, ce dernier précise les motifs de ce refus. La personne concernée a la possibilité d’introduire une réclamation auprès de la Commission Nationale de l’Informatique et des Libertés ou de l’autorité de contrôle de l’État membre de l’Union européenne dans lequel elle réside et de former un recours juridictionnel.'}
        <br />
        {'Droit d’accès : toute personne peut solliciter le responsable du traitement si des données à caractère personnel la concernant font l’objet d’un traitement. Dans l’affirmative, la personne concernée peut obtenir une copie des données à caractère personnel faisant l’objet d’un traitement ainsi que les informations suivantes.'}
        <br />
        {'Finalités du traitement :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Catégories de données à caractère personnel concernées ;'}
        </li>
        <li>
          {'Destinataires ou catégories de destinataires des données ;'}
        </li>
        <li>
          {'Lorsque cela est possible, la durée de conservation des données envisagée ou, lorsque ce n’est pas possible, les critères utilisés pour déterminer cette durée ;'}
        </li>
        <li>
          {'Lorsque les données à caractère personnel ne sont pas collectées auprès de la personne concernée, toute information disponible quant à leur source ;'}
        </li>
        <li>
          {'Le cas échéant, l’existence d’une prise de décision automatisée, y compris un profilage, et les informations utiles concernant la logique sous-jacente, ainsi que l’importance et les conséquences prévues de ce traitement pour la personne concernée.'}
        </li>
      </ul>
      <p>
        {'Droit de rectification : toute personne dont les données personnelles font l’objet d’un traitement bénéficie du droit d’obtenir la rectification des données à caractère personnel les concernant qui sont inexactes et que ces données soient complétées si la finalité du traitement l’exige le cas échéant.'}
        <br />
        {'Droit à l’effacement : toute personne dont les données personnelles font l’objet d’un traitement a le droit d’obtenir du responsable du traitement l’effacement desdites données dans les cas suivants :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Lorsque les données à caractère personnel ne sont plus nécessaires au regard des finalités pour lesquelles elles ont été collectées ou traitées d’une autre manière ;'}
        </li>
        <li>
          {'Lorsque la personne concernée a retiré le consentement sur lequel était fondé le traitement et qu’il n’existe pas d’autre fondement juridique au traitement ;'}
        </li>
        <li>
          {'Dans l’hypothèse où le traitement est fondé sur l’intérêt légitime du responsable du traitement, lorsque la personne concernée s’est opposée au traitement qu’il n’existe pas de motif légitime impérieux pour le traitement ;'}
        </li>
        <li>
          {'Dans l’hypothèse où le traitement a pour finalité la prospection ou le profilage lié à une telle prospection, lorsque la personne concernée s’est opposée au traitement ;'}
        </li>
        <li>
          {'Lorsque les données à caractère personnel ont fait l’objet d’un traitement illicite ;'}
        </li>
        <li>
          {'Lorsque les données à caractère personnel doivent être effacées pour respecter une obligation légale qui est prévue par le droit de l’Union ou par le droit de l’État membre auquel le responsable du traitement est soumis.'}
        </li>
      </ul>
      <p>
        {'Dans certains cas, le responsable du traitement pourra toutefois refuser d’effacer les données :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Pour respecter une obligation légale qui requiert le traitement prévu par le droit de l’Union ou par le droit français ;'}
        </li>
        <li>
          {'Lorsque le traitement a pour unique objet des fins statistiques ;'}
        </li>
        <li>
          {'Lorsque le traitement est nécessaire à la constatation, à l’exercice ou à la défense de droits en justice.'}
        </li>
      </ul>
      <p>
        {'Droit à la limitation : toute personne dont les données personnelles font l’objet d’un traitement peut demander au responsable du traitement la limitation du traitement dans les cas suivants :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Lorsqu’elle conteste l’exactitude de ses données à caractère personnel, pendant une durée permettant au responsable du traitement de vérifier l’exactitude desdites données ;'}
        </li>
        <li>
          {'Lorsque le traitement n’est pas conforme à la règlementation mais que le titulaire des données ne souhaite pas les effacer ;'}
        </li>
        <li>
          {'Lorsque le responsable du traitement n’a plus besoin des données à caractère personnel aux fins du traitement mais que celles-ci sont encore nécessaires à l’utilisateur pour la constatation, l’exercice ou la défense de droits en justice ;'}
        </li>
        <li>
          {'Lorsqu’elle s’est opposée au traitement, pendant la vérification portant sur le point de savoir si les motifs légitimes poursuivis par le responsable du traitement prévalent sur ceux de la personne concernée.'}
        </li>
      </ul>
      <p>
        {'Lorsque le traitement a été limité, à l’exception de la conservation, les données ne peuvent être traitées que dans les cas suivants :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Avec le consentement de la personne concernée ;'}
        </li>
        <li>
          {'Pour la constatation, l’exercice ou la défense de droits en justice ;'}
        </li>
        <li>
          {'Pour la protection des droits d’une autre personne physique ou morale, ou encore pour des motifs importants d’intérêt public de l’Union ou d’un État membre.'}
        </li>
      </ul>
      <p>
        {'Si la limitation devait ensuite être levée, le responsable du traitement en informerait au préalable la personne concernée.'}
        <br />
        {'Droit à la portabilité : toute personne dont les données personnelles font l’objet d’un traitement peut solliciter du responsable du traitement qu’il lui communique ces données ou les transmette à un autre responsable du traitement dans les cas suivants :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Lorsque le traitement a été mis en place pour donner suite au consentement de la personne concernée ;'}
        </li>
        <li>
          {'Lorsque le traitement est nécessaire à l’exécution d’un contrat auquel la personne concernée est partie ou à l’exécution de mesures précontractuelles prises à la demande de celle-ci ;'}
        </li>
        <li>
          {'Lorsque le traitement est effectué à l’aide de procédés automatisés.'}
        </li>
      </ul>
      <p>
        {'Droit d’opposition : toute personne dont les données personnelles font l’objet d’un traitement dispose d’un droit d’opposition à ce traitement dans les conditions suivantes :'}
      </p>
      <ul className={styles.liste}>
        <li>
          {'Lorsque le traitement fondé sur la satisfaction des intérêts légitimes poursuivis par le responsable du traitement ou par un tiers, pour des raisons tenant à sa situation particulière et si le responsable du traitement ne démontre pas qu’il existe des motifs légitimes et impérieux pour le traitement prévalant sur les intérêts et les droits et libertés de la personne concernée, ou pour la constatation, l’exercice ou la défense de droits en justice ;'}
        </li>
        <li>
          {'Lorsque le traitement est mis en œuvre à des fins de prospection ou de profilage lié à une telle prospection peut s’opposer à ce traitement, sans condition ;'}
        </li>
        <li>
          {'Lorsque le traitement est mis en œuvre à des fins statistiques, pour des raisons tenant à sa situation particulière.'}
        </li>
      </ul>
      <p>
        {'Pour toute demande d’exercice de vos droits, vous pouvez vous adresser à '}
        <Email url="contact@droitpluriel.fr">
          {'contact@droitpluriel.fr'}
        </Email>
        {'.'}
      </p>
      <h4>
        {'1.8 LIEU DE CONSERVATION DES DONNÉES'}
      </h4>
      <p>
        {'Les serveurs d’hébergement sur lesquels Droit Pluriel traite et stocke la base de données est exclusivement située au sein de l’Union Européenne, en France.'}
      </p>
      <h4>
        {'1.9 RÉCLAMATION AUPRÈS D’UNE AUTORITÉ DE CONTRÔLE'}
      </h4>
      <p>
        {'Toute personne dont les données à caractère personnel font l’objet d’un traitement peut introduire une réclamation relative au traitement des données la concernant auprès de la CNIL ou de l’autorité de contrôle de l’État membre de l’Union européenne dans lequel elle réside.'}
      </p>
      <h3>
        {'ARTICLE 2 – COOKIES'}
      </h3>
      <p>
        {'Le site utilise des cookies qui ont pour finalité de faciliter la navigation sur le site.'}
      </p>
      <h4>
        {'2.1 TYPES DE COOKIES UTILISÉS'}
      </h4>
      <p>
        {'Les cookies nécessaires à la navigation sur le site : ces cookies sont strictement nécessaires au fonctionnement du site. Leur suppression peut entrainer des difficultés de navigation.'}
        <br />
        {'Les cookies fonctionnels : ces cookies permettent de personnaliser l’expérience utilisateur. Les seuls cookies déployés sur le présent site internet sont ceux qui sont nécessaires à son fonctionnement. Aucune donnée personnelle n’est collectée.'}
      </p>
      <h4>
        {'2.2 GESTION DES COOKIES'}
      </h4>
      <p>
        {'Les utilisateurs ont la possibilité d’accepter ou de refuser les cookies au cas par cas ou de les refuser une fois pour toutes en paramétrant leur navigateur. Pour savoir de quelle manière modifier vos préférences en matière de cookies, vous trouverez ci-dessous les liens vers l’aide nécessaire pour accéder au menu de votre navigateur prévu à cet effet :'}
      </p>
      <ul className={styles.liste}>
        <li>
          <ExternalLink
            href="https://support.google.com/chrome/answer/95647?hl=fr"
            title="Supprimer, autoriser et gérer les cookies dans Chrome"
          >
            {'Google Chrome'}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur?redirectlocale=fr&redirectslug=activer-desactiver-cookies-preferences"
            title="Protection renforcée contre le pistage dans Firefox pour ordinateur"
          >
            {'Mozilla Firefox'}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
            title="Effacer les cookies dans Safari sur Mac"
          >
            {'Safari'}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://help.vivaldi.com/services/account/registration-and-log-in-issues/"
            title="Registration and login issues"
          >
            {'Vivaldi'}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href="https://support.microsoft.com/fr-fr/windows/microsoft-edge-donn%C3%A9es-de-navigation-et-confidentialit%C3%A9-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
            title="Microsoft Edge, données de navigation et confidentialité"
          >
            {'Edge'}
          </ExternalLink>
        </li>
      </ul>
      <p>
        {'Pour de plus amples informations concernant les outils de maîtrise des cookies, vous pouvez consulter le site internet de la CNIL : '}
        <ExternalLink
          href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-votre-navigateur"
          title="Les conseils de la CNIL pour maîtriser votre navigateur"
        >
          {'https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-votre-navigateur'}
        </ExternalLink>
        {'.'}
      </p>
      <h4>
        {'2.3 DURÉE DE VIE DES COOKIES'}
      </h4>
      <p>
        {'Les cookies sont déposés sur le terminal de l’utilisateur pour une durée maximum de 13 mois à compter de la manifestation du consentement de l’utilisateur. Passé ce délai, le consentement sera à nouveau recueilli.'}
      </p>
      <h4>
        {'ARTICLE 3 – RESPONSABILITÉ'}
      </h4>
      <p>
        {'L’association Droit Pluriel ne saurait garantir à l’utilisateur le secret de la correspondance des courriers électroniques ou de tout autre mode de communication utilisant le support du réseau Internet et pouvant être captés par un tiers, du fait du mode de circulation des données sur ce réseau. De plus, il appartient à chaque utilisateur de prendre toutes les mesures appropriées de façon à protéger ses propres données et/ou logiciels de la contamination d’éventuels virus circulant sur internet. L’association Droit Pluriel ne saurait être responsable des conséquences, directes ou indirectes, pouvant découler de vos erreurs de saisie de coordonnées ou de toute autre information incomplète ou erronée transmise par vos soins via le présent site.'}
      </p>
      <h4>
        {'ARTICLE 4 - CONTENU EMBARQUÉ DEPUIS D’AUTRE SITES'}
      </h4>
      <p>
        {'Les pages de ce site peuvent inclure des contenus intégrés (par exemple des images, liens…). Le contenu intégré depuis d’autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site. Ces sites web pourraient collecter des données sur vous, utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous disposez d’un compte connecté sur leur site web.'}
      </p>
    </>
  )
}
