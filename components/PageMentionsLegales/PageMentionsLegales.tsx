import { ReactElement } from 'react'

import { useDependencies } from '../../configuration/useDependencies'
import Email from '../common/Email/Email'
import ExternalLink from '../common/ExternalLink/ExternalLink'
import Telephone from '../common/Telephone/Telephone'
import Title from '../common/Title/Title'
import styles from './PageMentionsLegales.module.css'

export default function PageMentionsLegales(): ReactElement {
  const { wording } = useDependencies()

  return (
    <>
      <Title>
        {wording.TITLE_PAGE_MENTIONS_LEGALES}
      </Title>
      <h2 className={styles.titre2}>
        {wording.MENTIONS_LEGALES}
      </h2>
      <p>
        {'Merci de lire avec attention les différentes modalités d’utilisation du présent site avant d’y parcourir ses pages. En vous connectant sur ce site, vous acceptez sans réserve les présentes modalités. Aussi, conformément à l’article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l’économie numérique, les responsables du présent site internet '}
        <ExternalLink
          href="https://www.droitpluriel.fr"
          title="Droit Pluriel"
        >
          {'www.droitpluriel.fr'}
        </ExternalLink>
        {' sont :'}
      </p>
      <h3>
        {'Éditeur du Site :'}
      </h3>
      <p>
        {'Droit Pluriel'}
        <br />
        {'Numéro de SIRET : 82092976800027'}
        <br />
        {'Responsable éditorial : Anne-Sarah Kertudo'}
        <br />
        {'Adresse : 47 avenue Pasteur, 93100, Montreuil'}
        <br />
        {'Téléphone : '}
        <Telephone
          nomDuLieu="Droit Pluriel"
          url="01 84 80 46 14"
        >
          {'01 84 80 46 14'}
        </Telephone>
        <br />
        {'E-mail : '}
        <Email url="justicie@droitpluriel.fr">
          {'justicie@droitpluriel.fr'}
        </Email>
        <br />
        {'Site web : '}
        <ExternalLink
          href="https://www.droitpluriel.fr"
          title="Droit Pluriel"
        >
          {'www.droitpluriel.fr'}
        </ExternalLink>
      </p>
      <h3>
        {'Contact :'}
      </h3>
      <p>
        {'Nous vous offrons la possibilité de communiquer avec nous. Vous pouvez vous adresser à '}
        <Email url="justicie@droitpluriel.fr">
          {'justicie@droitpluriel.fr'}
        </Email>
        {' pour toute demande, en indiquant l’objet de votre demande et vos coordonnées.'}
      </p>
      <h3>
        {'Hébergement :'}
      </h3>
      <p>
        {'Hébergeur : '}
        <ExternalLink
          href="https://scalingo.com/fr"
          title="Scalingo"
        >
          {'Scalingo'}
        </ExternalLink>
        <br />
        {'Adresse : Scalingo SAS – 3 place de Haguenau, 67000, Strasbourg'}
      </p>
      <h3>
        {'Respect des lois en vigueur :'}
      </h3>
      <p>
        {'Le site '}
        <ExternalLink
          href="https://www.justicie.fr/"
          title="Justicie"
        >
          {'Justicie'}
        </ExternalLink>
        {' respecte la vie privée de l’internaute et se conforme strictement aux lois en vigueur sur la protection de la vie privée et des libertés individuelles. Aucune information personnelle n’est collectée à votre insu. Aucune information personnelle n’est cédée à des tiers. Les courriels, les adresses électroniques ou autres informations nominatives dont ce site est destinataire ne font l’objet d’aucune exploitation et ne sont conservés que pour la durée nécessaire à leur traitement. Vous pouvez vous référer à notre Politique de confidentialité pour plus d’informations.'}
      </p>
      <h3>
        {'Conditions d’utilisation :'}
      </h3>
      <p>
        {'Ce site ('}
        <ExternalLink
          href="https://www.justicie.fr/"
          title="Justicie"
        >
          {'Justicie'}
        </ExternalLink>
        {') est proposé en différents langages web (HTML, JavaScript, CSS, etc…) pour un meilleur confort d’utilisation et un graphisme plus agréable, nous vous recommandons de recourir à des navigateurs modernes comme Firefox, Google Chrome, etc…  Droit Pluriel met en œuvre tous les moyens dont elle dispose, pour assurer une information fiable et une mise à jour fiable de ses sites internet. Toutefois, des erreurs ou omissions peuvent survenir. L’internaute devra donc s’assurer de l’exactitude des informations auprès de Droit Pluriel, et signaler toutes modifications du site qu’il jugerait utile. Droit Pluriel n’est en aucun cas responsable de l’utilisation faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.'}
      </p>
      <h3>
        {'Liens hypertextes :'}
      </h3>
      <p>
        {'Les sites internet peuvent offrir des liens vers d’autres sites internet ou d’autres ressources disponibles sur Internet. Droit Pluriel ne dispose d’aucun moyen pour contrôler les sites en connexion avec ses sites internet. Droit Pluriel ne répond pas de la disponibilité de tels sites et sources externes, ni ne la garantit. Elle ne peut être tenue pour responsable de tout dommage, de quelque nature que ce soit, résultant du contenu de ces sites ou sources externes, et notamment des informations, produits ou services qu’ils proposent, ou de tout usage qui peut être fait de ces éléments. Les risques liés à cette utilisation incombent pleinement à l’internaute, qui doit se conformer à leurs conditions d’utilisation. Les utilisateurs, les abonnés et les visiteurs des sites internet de Droit Pluriel ne peuvent mettre en place un hyperlien en direction de ce site sans l’autorisation expresse et préalable de Droit Pluriel. Dans l’hypothèse où un utilisateur ou visiteur souhaiterait mettre en place un hyperlien en direction du ou d’un des sites internet de Droit Pluriel, il lui appartiendra d’adresser un e-mail accessible sur le site afin de formuler sa demande de mise en place d’un hyperlien. Droit Pluriel se réserve le droit d’accepter ou de refuser un hyperlien sans avoir à en justifier sa décision.'}
      </p>
      <h3>
        {'Services fournis :'}
      </h3>
      <p>
        {'L’ensemble des activités de l’association ainsi que ses informations sont présentés sur notre site '}
        <ExternalLink
          href="https://www.droitpluriel.fr"
          title="Droit Pluriel"
        >
          {'Droit Pluriel'}
        </ExternalLink>
        {'. Droit Pluriel s’efforce de fournir sur le site '}
        <ExternalLink
          href="https://www.justicie.fr/"
          title="Justicie"
        >
          {'Justicie'}
        </ExternalLink>
        {' des informations aussi précises que possible. Les renseignements figurant sur le site '}
        <ExternalLink
          href="https://www.justicie.fr/"
          title="Justicie"
        >
          {'Justicie'}
        </ExternalLink>
        {' ne sont pas exhaustifs et les photos non contractuelles. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne. Par ailleurs, toutes les informations indiquées sur le site '}
        {' sont données à titre indicatif, et sont susceptibles de changer ou d’évoluer sans préavis.'}
      </p>
      <h3>
        {'Limitation contractuelle sur les données :'}
      </h3>
      <p>
        {'Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l’année, mais peuvent toutefois contenir des inexactitudes ou des omissions. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par e-mail, à l’adresse '}
        <Email url="justicie@droitpluriel.fr">
          {'justicie@droitpluriel.fr'}
        </Email>
        {', en décrivant le problème de la manière la plus précise possible (page posant problème, type d’ordinateur et de navigateur utilisé…).  Tout contenu téléchargé se fait aux risques et périls de l’utilisateur et sous sa seule responsabilité. En conséquence, Droit Pluriel ne saurait être tenue responsable d’un quelconque dommage subi par l’appareil de l’utilisateur ou d’une quelconque perte de données consécutives au téléchargement. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour. Les liens hypertextes mis en place dans le cadre du présent site internet en direction d’autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de Droit Pluriel.'}
      </p>
      <h3>
        {'Propriété intellectuelle :'}
      </h3>
      <p>
        {'Tout le contenu présent sur le site '}
        <ExternalLink
          href="https://www.justicie.fr/"
          title="Justicie"
        >
          {'Justicie'}
        </ExternalLink>
        {' incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de l’association à l’exception des marques, logos ou contenus appartenant à d’autres associations, sociétés, partenaires ou auteurs. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l’accord exprès par écrit de Droit Pluriel. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle. Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité civile et pénale du contrefacteur. En outre, les propriétaires des contenus copiés pourraient intenter une action en justice à votre encontre.'}
      </p>
      <h3>
        {'Litiges :'}
      </h3>
      <p>
        {'Les présentes conditions du site '}
        <ExternalLink
          href="https://www.justicie.fr/"
          title="Justicie"
        >
          {'Justicie'}
        </ExternalLink>
        {' sont régies par les lois françaises et toutes contestations ou litiges qui pourraient naître de l’interprétation ou de l’exécution de celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de l’association. La langue de référence, pour le règlement de contentieux éventuels, est le français.'}
      </p>
    </>
  )
}
