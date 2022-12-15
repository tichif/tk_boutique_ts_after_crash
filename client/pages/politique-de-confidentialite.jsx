import Link from 'next/link';
import { Col } from 'react-bootstrap';

import Layout from '../components/Layout';

const Politics = () => {
  const style = {
    fontWeight: '900',
  };

  return (
    <Layout title='Politique de confidentialité'>
      <Col>
        <h1>Politique de Confidentialité</h1>
        <Link href='/creer-compte' className='btn btn-primary mb-5'>
          <i className='fas fa-chevron-left'></i> Retour
        </Link>
        <p>Mise à jour: 24 novembre 2022</p>
        <p>
          TK Boutique est une entreprise dont ses activitées s'étendent
          exclusivement en Haïti selon les loi et prescrits haïtiennes.
        </p>
        <p>
          Cette politique de confidentialité décrit nos politiques et procédures
          sur la collecte, l’utilisation et la divulgation de vos informations
          lorsque Vous utilisez site TK Boutique et vous informe de vos droits à
          la vie privée et de la façon dont la loi vous protège.
        </p>
        <p>
          Nous utilisons vos données personnelles pour fournir et améliorer le
          Service. En utilisant le service, vous acceptez la collecte et
          l’utilisation des informations conformément à la présente Politique de
          confidentialité.
        </p>
        <h2>Interprétation and Définitions</h2>
        <h3>Interprétation</h3>
        <p>
          Les mots dont la lettre initiale est majuscule ont un sens défini dans
          les conditions suivantes. Les définitions suivantes ont le même sens,
          qu’elles apparaissent au singulier ou au pluriel
        </p>
        <h3>Définitions</h3>
        <p>Aux fins de la présente Politique de confidentialité :</p>
        <ul>
          <li>
            <p>
              <strong style={style}>Compte</strong> désigne un compte unique
              créé pour vous permettre d’accéder à notre Service ou à des
              parties de notre Service.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Compagnie </strong>
              (désignée sou le nom 'La compagnie', 'Nous', 'nous', 'Notre')
              désigne TK Boutique, 32, rue Saint-Preux, Péguy-Ville.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Cookies</strong> sont de petits fichiers qui
              sont placés sur votre ordinateur, appareil mobile ou tout autre
              appareil par un site Web, contenant les détails de votre
              historique de navigation sur ce site Web parmi ses nombreuses
              utilisations.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pays</strong> désigne Haïti
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Appareils</strong> désigne tout dispositif
              pouvant accéder au Service tel qu’un ordinateur, un téléphone
              portable ou une tablette numérique.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Données personnelles</strong> désigne tout
              renseignement se rapportant à une personne identifiée ou
              identifiable.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Services</strong> désigne ce site web
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Fournisseur de service</strong> désigne
              toute personne physique ou morale qui traite les données pour le
              compte de la Société. Il s’agit de sociétés tierces ou de
              personnes employées par la Société pour faciliter le Service, pour
              fournir le Service au nom de la Société, pour fournir des services
              liés au Service ou pour aider la Société à analyser la façon dont
              le Service est utilisé.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Données d'utilisation</strong> désigne les
              données collectées automatiquement, soit générées par
              l’utilisation du Service, soit à partir de l’infrastructure du
              Service elle-même (par exemple, la durée d’une visite de page).
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Site web</strong> désigne la Boutique TK,
              accessible depuis{' '}
              <a
                href='https://www.tkboutiquehaiti.com'
                target='_blank'
                rel='noreferrer'
              >
                https://www.tkboutiquehaiti.com
              </a>
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Vous</strong> désigne la personne qui accède
              ou utilise le Service, ou la société, ou toute autre personne
              morale pour le compte de laquelle cette personne accède ou utilise
              le Service, selon le cas.
            </p>
          </li>
        </ul>
        <h2>Collecte et de l'utilisation de vos données personnelles</h2>
        <h3>Type de données collectées</h3>
        <h4>Données personnelles</h4>
        <p>
          Lors de l’utilisation de notre Service, nous pouvons vous demander de
          nous fournir certaines informations personnellement identifiables qui
          peuvent être utilisées pour vous contacter ou vous identifier. Les
          renseignements personnels identifiables peuvent comprendre, sans
          toutefois s’y limiter :
        </p>
        <ul>
          <li>
            <p>Addresse Email</p>
          </li>
          <li>
            <p>Nom et Prénom</p>
          </li>
          <li>
            <p>Numéro de téléphone</p>
          </li>
        </ul>
        <h4>Données d'utilisation</h4>
        <p>
          Les données d’utilisation sont collectées automatiquement lors de
          l’utilisation du Service.
        </p>
        <p>
          Les données d’utilisation peuvent inclure des informations telles que
          l’adresse de protocole Internet de votre appareil (par ex. adresse
          IP), le type de navigateur, la version du navigateur, les pages de
          notre Service que vous visitez, l’heure et la date de votre visite, le
          temps passé sur ces pages, identificateurs uniques de dispositifs et
          autres données diagnostiques.
        </p>
        <p>
          Lorsque Vous accédez au Service par ou via un appareil mobile, Nous
          pouvons collecter certaines informations automatiquement, y compris,
          mais sans s’y limiter, le type d’appareil mobile que Vous utilisez,
          Votre ID unique de l’appareil mobile, l’adresse IP de Votre appareil
          mobile, Votre système d’exploitation mobile, le type de navigateur
          Internet mobile que vous utilisez, les identifiants uniques des
          appareils et d’autres données de diagnostic.
        </p>
        <p>
          Nous pouvons également recueillir des informations que votre
          navigateur envoie chaque fois que vous visitez notre Service ou
          lorsque vous accédez au Service par ou via un appareil mobile.
        </p>
        <h4>Technologies de suivi et de cookies</h4>
        <p>
          Nous utilisons des cookies et des technologies de suivi similaires
          pour suivre l’activité sur notre Service et stocker certaines
          informations. Les technologies de suivi utilisées sont des balises,
          des étiquettes et des scripts pour collecter et suivre l’information
          et pour améliorer et analyser Notre Service. Les technologies que nous
          utilisons peuvent comprendre :
        </p>
        <ul>
          <li>
            <p>
              <strong style={style}>Cookies ou cookies du navigateur.</strong>{' '}
              Un cookie est un petit fichier placé sur votre appareil. Vous
              pouvez demander à votre navigateur de refuser tous les cookies ou
              d’indiquer quand un cookie est envoyé. Toutefois, si vous
              n’acceptez pas les cookies, il se peut que vous ne puissiez pas
              utiliser certaines parties de notre Service. Sauf si vous avez
              ajusté les paramètres de votre navigateur afin qu’il refuse les
              cookies, notre Service peut utiliser des cookies.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Flash Cookies.</strong> Certaines
              fonctionnalités de notre Service peuvent utiliser des objets
              stockés localement (ou des Cookies Flash) pour collecter et
              stocker des informations sur Vos préférences ou Votre activité sur
              notre Service. Les cookies Flash ne sont pas gérés par les mêmes
              paramètres de navigateur que ceux utilisés pour les cookies du
              navigateur. Pour plus d’informations sur la façon dont vous pouvez
              supprimer les cookies Flash, s’il vous plaît lire &quot;Where can
              I change the settings for disabling, or deleting local shared
              objects?&quot; disponible sur{' '}
              <a
                href='https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_'
                rel='noreferrer'
                target='_blank'
              >
                https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
              </a>
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Web Beacons.</strong> Certaines sections de
              notre Service et de nos e-mails peuvent contenir de petits
              fichiers électroniques connus sous le nom de balises Web
              (également appelés gifs clairs, pixels et gifs simples) qui
              permettent à la Société, par exemple, pour compter les
              utilisateurs qui ont visité ces pages ou ouvert un courriel et
              pour d’autres statistiques liées au site Web (par exemple,
              enregistrer la popularité d’une certaine section et vérifier
              l’intégrité du système et du serveur).
            </p>
          </li>
        </ul>
        <p>
          Les cookies peuvent être des cookies "Persistants" ou "Session". Les
          cookies persistants restent sur votre ordinateur personnel ou votre
          appareil mobile lorsque vous vous déconnectez, tandis que les cookies
          de session sont supprimés dès que vous fermez votre navigateur Web. En
          savoir plus sur les cookies :{' '}
          <a
            href='https://www.privacypolicies.com/blog/cookies/'
            target='_blank'
            rel='noreferrer'
          >
            What Are Cookies?
          </a>
          .
        </p>
        <p>
          Nous utilisons à la fois des cookies de session et des cookies
          persistants aux fins indiquées ci-dessous :
        </p>
        <p>
          <strong style={style}>Cookies nécessaires/essentiels</strong>
        </p>
        <p>Type: Session Cookie</p>
        <p>Administré par nous</p>
        <p>
          But : Ces Cookies sont essentiels pour Vous fournir les services
          disponibles sur le Site et Vous permettre d’utiliser certaines de ses
          fonctionnalités. Ils aident à authentifier les utilisateurs et à
          prévenir l’utilisation frauduleuse des comptes d’utilisateurs. Sans
          ces Cookies, les services que Vous avez demandés ne peuvent pas être
          fournis, et Nous n’utilisons ces Cookies que pour vous fournir ces
          services.
        </p>
        <p>
          Pour plus d’informations sur les cookies que nous utilisons et vos
          choix concernant les cookies, veuillez consulter notre Politique de
          cookies ou la section Cookies de notre Politique de confidentialité.
        </p>
        <h3>Utilisation de vos données personnelles</h3>
        <p>
          La Société peut utiliser les Données à caractère personnel aux fins
          suivantes :
        </p>
        <ul>
          <li>
            <p>
              <strong style={style}>Fournir et maintenir notre service</strong>,
              y compris pour surveiller l’utilisation de notre Service
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour gérer votre compte :</strong> pour
              gérer votre inscription en tant qu’utilisateur du Service. Les
              données personnelles que vous fournissez peuvent vous donner accès
              aux différentes fonctionnalités du Service qui sont disponibles
              pour vous en tant qu’utilisateur enregistré.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour l’exécution d’un contrat :</strong> le
              développement, la conformité et l’engagement du contrat d’achat
              pour les produits, articles ou services que vous avez achetés ou
              de tout autre contrat avec nous par l’intermédiaire du service.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour vous contacter :</strong> Pour
              communiquer avec vous par courriel, par téléphone, par SMS ou par
              d’autres formes équivalentes de communication électronique, comme
              les notifications push d’une application mobile concernant les
              mises à jour ou les communications informatives liées aux
              fonctionnalités, produits ou services contractuels, y compris les
              mises à jour de sécurité, lorsque cela est nécessaire ou
              raisonnable pour leur mise en œuvre.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour vous fournir </strong> avec des
              nouvelles, des offres spéciales et des informations générales sur
              d’autres biens, services et événements que nous offrons qui sont
              similaires à ceux que vous avez déjà acheté ou demandé, sauf si
              vous avez choisi de ne pas recevoir ces informations.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour gérer vos demandes : </strong> pour
              assister et gérer vos demandes.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour les transferts d’entreprise : </strong>{' '}
              Nous pouvons utiliser Vos informations pour évaluer ou effectuer
              une fusion, un dessaisissement, une restructuration, une
              réorganisation, une dissolution ou une autre vente ou transfert de
              tout ou partie de Nos actifs, que ce soit dans le cadre d’une
              entreprise en exploitation ou dans le cadre d’une procédure de
              faillite, de liquidation ou similaire, dans lequel les Données
              personnelles détenues par Nous concernant nos utilisateurs du
              Service figurent parmi les actifs transférés.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour d'autres fins : </strong> Nous pouvons
              utiliser Vos informations à d’autres fins, telles que l’analyse
              des données, l’identification des tendances d’utilisation, la
              détermination de l’efficacité de nos campagnes promotionnelles et
              pour évaluer et améliorer notre Service, produits, services,
              marketing et votre expérience.
            </p>
          </li>
        </ul>
        <p>
          Nous pouvons partager vos informations personnelles dans les
          situations suivantes :
        </p>
        <ul>
          <li>
            <p>
              <strong style={style}>
                Avec les fournisseurs de services :{' '}
              </strong>{' '}
              Nous pouvons partager vos informations personnelles avec les
              fournisseurs de services pour surveiller et analyser l’utilisation
              de notre service, pour vous contacter.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Pour les transferts d’entreprise : </strong>{' '}
              Nous pouvons partager ou transférer Vos informations personnelles
              dans le cadre ou lors de négociations de toute fusion, vente
              d’actifs de la Société, financement ou acquisition de tout ou
              partie de Nos activités à une autre société.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Avec les sociétés affiliées : </strong>Nous
              pouvons partager vos informations avec nos sociétés affiliées,
              auquel cas nous exigerons que ces sociétés affiliées respectent
              cette politique de confidentialité. Les sociétés affiliées
              comprennent Notre société mère et toute autre filiale,
              coentreprise partenaire ou autre société que Nous contrôlons ou
              qui sont sous contrôle commun avec Nous.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Avec des partenaires commerciaux : </strong>
              Nous pouvons partager Vos informations avec Nos partenaires
              commerciaux pour vous offrir certains produits, services ou
              promotions.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Avec d'autres partenaires : </strong>lorsque
              vous partagez des renseignements personnels ou interagissez d’une
              autre façon dans les aires publiques avec d’autres utilisateurs,
              ces renseignements peuvent être consultés par tous les
              utilisateurs et peuvent être distribués publiquement à
              l’extérieur.
            </p>
          </li>
          <li>
            <p>
              <strong style={style}>Avec Votre consentement: </strong>Nous
              pouvons divulguer vos renseignements personnels à toute autre fin
              avec votre consentement.
            </p>
          </li>
        </ul>
        <h3>Conservation de vos données personnelles </h3>
        <p>
          La Société ne conservera vos Données personnelles que pendant la durée
          nécessaire aux fins énoncées dans la présente Politique de
          confidentialité. Nous conserverons et utiliserons vos données
          personnelles dans la mesure nécessaire pour nous conformer à nos
          obligations légales (par exemple, si nous sommes tenus de conserver
          vos données pour respecter les lois applicables), résoudre les litiges
          et appliquer nos accords et politiques juridiques.
        </p>
        <p>
          L’entreprise conservera également les données d’utilisation à des fins
          d’analyse interne. L'utilisation des données sont généralement
          conservées pour une période plus courte, sauf lorsque ces données sont
          utilisées pour renforcer la sécurité ou améliorer la fonctionnalité de
          Notre Service, ou Nous sommes légalement tenus de conserver ces
          données pour des périodes plus longues.
        </p>
        <h3>Transfert de vos données personnelles</h3>
        <p>
          Vos informations, y compris les données personnelles, sont traitées
          dans les bureaux d’exploitation de la Société et dans tout autre
          endroit où se trouvent les parties impliquées dans le traitement. Cela
          signifie que ces informations peuvent être transférées et conservées
          sur des ordinateurs situés en dehors de votre État, province, pays ou
          autre juridiction gouvernementale où les lois sur la protection des
          données peuvent différer de celles de votre juridiction.
        </p>
        <p>
          Votre consentement à la présente Politique de confidentialité suivie
          de votre soumission de ces informations représente votre accord à ce
          transfert.
        </p>
        <p>
          La Société prendra toutes les mesures raisonnablement nécessaires pour
          s’assurer que vos données sont traitées en toute sécurité et
          conformément à la présente Politique de confidentialité et qu’aucun
          transfert de vos données personnelles n’aura lieu vers une
          organisation ou un pays sauf si des contrôles adéquats sont en place,
          y compris le la sécurité de vos données et autres informations
          personnelles.
        </p>
        <h3>Divulgation de vos données personnelles</h3>
        <h4>Opérations commerciales</h4>
        <p>
          Si la Société est impliquée dans une fusion, une acquisition ou une
          vente d’actifs, vos données personnelles peuvent être transférées.
          Nous vous informerons avant que vos données personnelles ne soient
          transférées et ne soient soumises à une autre politique de
          confidentialité.
        </p>
        <h4>Agents d’exécution de la loi</h4>
        <p>
          Dans certaines circonstances, la Société peut être tenue de divulguer
          vos données personnelles si cela est requis par la loi ou en réponse à
          des demandes valides des autorités publiques (par ex. un tribunal ou
          un organisme gouvernemental).
        </p>
        <h4>Autres exigences juridiques </h4>
        <p>
          La Société peut divulguer vos données personnelles dans la conviction
          de bonne foi qu’une telle action est nécessaire pour :
        </p>
        <ul>
          <li>
            <p>Répondre à une obligation légale.</p>
          </li>
          <li>
            <p>Protéger et défendre les droits ou les biens de la Compagnie</p>
          </li>
          <li>
            <p>
              Prévenir ou enquêter sur d’éventuels actes répréhensibles en lien
              avec le Service
            </p>
          </li>
          <li>
            <p>
              Protéger la sécurité personnelle des utilisateurs du Service ou du
              public
            </p>
          </li>
          <li>
            <p>Protection contre la responsabilité juridique</p>
          </li>
        </ul>
        <h3>Sécurité de vos données personnelles</h3>
        <p>
          La sécurité de vos données personnelles est importante pour nous, mais
          n’oubliez pas qu’aucune méthode de transmission sur Internet ou de
          stockage électronique n’est 100% sécurisée. Alors que nous nous
          efforçons d’utiliser des moyens commercialement acceptables pour
          protéger vos données personnelles, nous ne pouvons pas garantir leur
          sécurité absolue.
        </p>
        <h2>Données relatives aux enfants</h2>
        <p>
          Notre Service ne s’adresse pas aux personnes de moins de 13 ans. Nous
          ne recueillons pas sciemment de renseignements personnels
          identifiables auprès de personnes de moins de 13 ans. Si vous êtes un
          parent ou un tuteur et que vous savez que votre enfant nous a fourni
          des données personnelles, veuillez nous contacter. Si Nous apprenons
          que Nous avons recueilli des Données personnelles de personnes de
          moins de 13 ans sans vérification du consentement parental, Nous
          prenons des mesures pour supprimer ces informations de nos serveurs.
        </p>
        <p>
          Si nous devons nous appuyer sur le consentement comme base juridique
          pour traiter vos informations et votre pays exige le consentement d’un
          parent, nous pouvons exiger le consentement de votre parent avant de
          recueillir et d’utiliser ces informations.
        </p>
        <h2>Liens vers d'autres sites</h2>
        <p>
          Notre Service peut contenir des liens vers d’autres sites Web qui ne
          sont pas exploités par Nous. Si vous cliquez sur un lien tiers, vous
          serez dirigé vers le site de ce tiers par exemple le site paiement
          Moncash. Nous vous conseillons fortement de consulter la Politique de
          confidentialité de chaque site que vous visitez.
        </p>
        <p>
          Nous n’avons aucun contrôle et n’assumons aucune responsabilité pour
          le contenu, les politiques de confidentialité ou les pratiques de tout
          site ou service tiers.
        </p>
        <h2>Commandes et Paiements</h2>
        <p>
          Notre Service utlise comme paiement en ligne, les service Moncash et
          Stripe. Lorsque vous payez, vous êtes soit redirigés sur le site
          Moncash qui ensuite vous redirigera vers notre site ou soit authorisés
          à payer directement sur notre site avec Stripe.
        </p>
        <p>
          Nous ne sommes pas responsables comme cité précedemment pas du
          comportement des service Moncash et Stripe.
        </p>
        <p>
          Après le paiement de votre commande, un courriel électronique vous
          sera parvenu à votre adresse électronique.
        </p>
        <h2>Compte et message électronique</h2>
        <p>
          Lors de votre inscription, un courriel électronique vous sera parvenu
          pour vérifier la validité de l'adresse électronique indiquée.
        </p>
        <p>
          Cette adresse électronique sera utilisé pour l'émission des factures
          de paiements ou pour tous contenus dédiés à TK Boutique.
        </p>
        <p>
          Vous ne recevrez plus de messages que{' '}
          <strong style={style}>si et seulement si</strong> votre compte est
          supprimé de nos serveurs.
        </p>
        <p>Nous nous réservons le droit de supprimer votre compte en cas :</p>
        <ul>
          <li>
            <p>De fraude</p>
          </li>
          <li>
            <p>De l'inactivité pendant une période de temps</p>
          </li>
          <li>
            <p>non respect de notre Politique de confidentialité</p>
          </li>
        </ul>
        <h2>
          Modifications apportées à la présente politique de confidentialité
        </h2>
        <p>
          Nous pouvons mettre à jour notre politique de confidentialité de temps
          à autre. Nous vous informerons de tout changement en affichant la
          nouvelle politique de confidentialité sur cette page.
        </p>
        <p>
          Nous vous le ferons savoir par courriel et/ou un avis bien en vue sur
          notre Service, avant que le changement ne prenne effet et mettrons à
          jour la date de la « Dernière mise à jour » en haut de la présente
          Politique de confidentialité.
        </p>
        <p>
          Nous vous conseillons de consulter régulièrement cette Politique de
          confidentialité pour tout changement. Les modifications apportées à la
          présente Politique de confidentialité entrent en vigueur lorsqu’elles
          sont affichées sur cette page.
        </p>
        <h2>Contactez nous</h2>
        <p>
          Si vous avez des questions sur cette politique de confidentialité,
          vous pouvez nous contacter :
        </p>
        <p>
          En visitant cette page sur notre site :{' '}
          <a
            href='https://www.tkboutquehaiti.com/contact'
            rel='noreferrer'
            target='_blank'
          >
            https://www.tkboutquehaiti.com/contact
          </a>
        </p>
      </Col>
    </Layout>
  );
};

export default Politics;
