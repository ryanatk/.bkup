import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import {
  TypographyH2 as H2,
  TypographyH3 as H3,
  TypographyH3List as H3List,
} from '../../../components/pages/privacy-policy-oura-health/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  BodyLink,
  Box,
  Footer,
  Header,
  List,
  ListItem,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../../components/sormus';
import { useFeatureFlag } from '../../../queries/FeaturesConfig';
import pageStyles from '../PrivacyPolicyOuraHealth.module.scss';

const PrivacyPolicyOuraHealth = () => {
  const accordionWrapper = useRef(null);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const router = useRouter();
  const { enabled: featureFlagEnabled, isLoading: featureFlagLoading } =
    useFeatureFlag('new-privacy-policy-page');

  if (featureFlagLoading) return null;

  if (!featureFlagEnabled) {
    router.push('/privacy-policy');

    return null;
  }

  const handleAccordionClick = (e, index) => {
    setActiveAccordionIndex(index);
    e.preventDefault();
  };

  const handleAccordionChange = (index) => {
    setActiveAccordionIndex(index);

    if (window && accordionWrapper.current) {
      window.scrollTo({
        top: accordionWrapper.current.offsetTop - 105, // TODO: Use header ref from ECOMM-1270
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="tailwind">
      <div className="bg-white">
        <Header bordered />
        <PageContainer name="privacy-policy-oura-health-fr" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Déclaration de confidentialité Oura
              </Typography>
              <H2>À PROPOS DE CETTE DÉCLARATION DE CONFIDENTIALITÉ</H2>
              <Typography>
                Chez Oura, nous accordons une grande importance à la protection
                de vos données à caractère personnel. La présente déclaration de
                confidentialité concerne le traitement des données à caractère
                personnel par Oura Health Oy et Ouraring Inc. (collectivement, «
                Oura »).
              </Typography>
              <Typography>
                Nos produits, tels que l’anneau Oura, vous permettent de suivre
                votre mode de vie ainsi que la qualité de votre sommeil. Nous
                avons conscience que les données collectées ne sauraient être
                plus personnelles que cela, la protection de vos données à
                caractère personnel revêtant pour nous une importance capitale.
                Veuillez lire attentivement la présente déclaration.
              </Typography>
              <H2>
                À QUELLES FINS OURA TRAITE-T-ELLE VOS DONNÉES À CARACTÈRE
                PERSONNEL ?
              </H2>
              <Typography>
                En ouvrant les sections suivantes par un clic sur leur titre,
                vous accéderez à un descriptif des catégories de données à
                caractère personnel que nous collectons et traitons, ainsi
                qu’aux fins auxquelles nous le faisons, par exemple pour vous
                fournir des services lorsque vous visitez notre site Web,
                effectuez des achats sur notre site, et utilisez votre anneau et
                votre application. Vous trouverez également des informations sur
                la base juridique utilisée pour traiter vos données et nos
                sources de données.
              </Typography>
              <div
                className={pageStyles.AccordionWrapper}
                ref={accordionWrapper}
              >
                <Accordion
                  openAtIndex={activeAccordionIndex}
                  icon={<ArrowDownwardIcon className="text-helsinkiBlue" />}
                  onChange={handleAccordionChange}
                >
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Utilisateurs de l’appareil et de l’application
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        APPAREIL ET APPLICATION
                      </Typography>
                      <H2>FINALITÉS DU TRAITEMENT </H2>
                      <Typography>
                        Oura collecte et traite les données à caractère
                        personnel des utilisateurs de l’appareil et de
                        l’application (ci-après « les Utilisateurs ») uniquement
                        aux fins suivantes :
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Fourniture des services Oura</H3List>
                          <Typography>
                            Nous traitons vos données à caractère personnel dans
                            le cadre de la fourniture des services et des
                            fonctionnalités de l’application Oura, notamment
                            pour vous fournir des informations quotidiennes sur
                            votre niveau de préparation, votre sommeil et votre
                            activité.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Fourniture de services à la clientèle</H3List>
                          <Typography>
                            Nous traitons vos données à caractère personnel dans
                            le but de fournir des services à notre clientèle et
                            de gérer notre communication avec celle-ci. Si vous
                            contactez notre service d’assistance pour des
                            questions liées aux données de votre application,
                            nous sommes susceptibles d’utiliser les informations
                            fournies pour répondre à vos questions et régler vos
                            problèmes éventuels.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Développement de nos produits et services
                          </H3List>
                          <Typography>
                            Nous traitons vos données d’utilisation de l’anneau
                            et de la plate-forme Oura en vue d’améliorer nos
                            services et nos fonctionnalités, par exemple dans
                            l’application Oura. Lorsque cela est possible, nous
                            le ferons en recourant uniquement à des données sous
                            la forme de pseudonymes, de données agrégées ou de
                            données non personnelles.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Commercialisation de nos produits et services
                          </H3List>
                          <Typography>
                            Nous traitons des données à caractère marketing dans
                            le but de fournir de la publicité en ligne et des
                            communications marketing Oura. À titre d’exemple,
                            comme expliqué plus en détail dans notre Politique
                            en matière de cookies{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                Lien vers notre Politique en matière de cookies
                              </BodyLink>
                            </Link>
                            nous utilisons des cookies sur notre site Web pour
                            créer des publics cibles pour la publicité en ligne.
                            Vous pouvez à tout moment refuser de recevoir des
                            communications marketing. Vous ne recevrez notre
                            newsletter que si vous en avez fait la demande.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Permettre les intégrations tierces </H3List>
                          <Typography>
                            Nous traitons des données pour répondre aux besoins
                            des utilisateurs qui nous demandent de partager
                            leurs données avec certains tiers, tels que des
                            partenaires de recherche. Cette opération n’est
                            réalisée qu’avec votre consentement explicite.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Se conformer aux obligations légales</H3List>
                          <Typography>
                            Dans certains cas, nous sommes tenus de traiter
                            certaines données lorsque cela est exigé par les
                            lois et réglementations applicables. Ces obligations
                            réglementaires sont liées, par exemple, à des
                            exigences comptables et fiscales, à des réclamations
                            légales ou à d’autres obligations légales.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>BASE JURIDIQUE DU TRAITEMENT</H2>
                      <Typography>
                        La législation européenne sur la protection des données
                        exige une « base légale » pour la collecte et la
                        conservation d’informations personnelles auprès des
                        résidents de l’Espace économique européen (EEE). Les
                        bases légales sur lesquelles nous nous appuyons pour
                        traiter vos données dépendent des finalités
                        particulières de ce traitement, y compris :
                      </Typography>
                      <Typography>
                        <strong>Contrat :</strong> lorsque nous traitons des
                        données à caractère personnel dans le cadre de la
                        fourniture des services Oura, nous le faisons sur la
                        base d’un contrat d’utilisation, qui prend forme lorsque
                        vous créez votre compte et acceptez nos conditions
                        générales.
                      </Typography>
                      <Typography>
                        <strong>Consentement :</strong> nous traitons vos
                        données relatives à la santé uniquement sous réserve de
                        votre consentement. Dans certains cas, certaines de vos
                        actions vous permettent de nous fournir votre
                        consentement pour le traitement de vos données, par
                        exemple lorsque vous ajoutez des données relatives à la
                        santé dans vos notes ou des tags liés à la santé dans
                        l’application Oura.
                      </Typography>
                      <Typography>
                        <strong>Intérêts légitimes :</strong> nous traitons vos
                        données à caractère personnel conformément à nos
                        intérêts légitimes lorsque nous le faisons à des fins de
                        commercialisation de nos produits et services, de
                        service à la clientèle, et d’amélioration de nos
                        produits et services. Lorsque nous choisissons
                        d’utiliser vos données conformément à nos intérêts
                        légitimes, nous évaluons attentivement nos propres
                        intérêts par rapport à votre droit au respect de la vie
                        privée, conformément au droit applicable.
                      </Typography>
                      <Typography>
                        <strong>Obligation légale :</strong> Oura est tenue de
                        traiter certaines informations pour respecter des
                        obligations légales susceptibles de varier selon les
                        pays. Ces obligations peuvent, par exemple, concerner
                        les lois relatives à la protection du consommateur ou
                        les réglementations fiscales.
                      </Typography>
                      <H2>DONNÉES TRAITÉES ET SOURCE DES DONNÉES</H2>
                      <Typography>
                        Dans la plupart des cas, Oura collecte des données à
                        caractère personnel directement auprès de vous, par
                        exemple lorsque vous vous inscrivez pour créer un compte
                        ou utilisez votre anneau pour collecter des données de
                        mesure par le biais des fonctionnalités de suivi de
                        l’anneau Oura. Nous sommes également amenés à traiter
                        des données générées à partir des informations que vous
                        nous fournissez.
                      </Typography>
                      <Typography>
                        Oura traite les catégories de données à caractère
                        personnel suivantes relatives aux Utilisateurs de
                        l’appareil et de l’application :
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Les coordonnées</strong> telles que l’adresse
                          e-mail ou l’adresse postale
                        </ListItem>
                        <ListItem>
                          <strong>Les informations sur l’utilisateur</strong>{' '}
                          telles que le sexe, la taille et le poids,
                          l’identifiant de l’utilisateur ainsi que d’autres
                          informations que vous pourriez nous fournir sur
                          vous-même ou votre compte
                        </ListItem>
                        <ListItem>
                          <strong>Les informations sur l’appareil</strong>{' '}
                          telles que l’adresse IP et les données de localisation
                        </ListItem>
                        <ListItem>
                          <strong>
                            Les informations relatives à l’activité de
                            l’utilisateur et au contexte
                          </strong>{' '}
                          telles que les activités, les notes et les tags
                        </ListItem>
                        <ListItem>
                          <strong>Les données de mesure</strong> telles que la
                          fréquence cardiaque, les données de mouvement et les
                          données de température
                        </ListItem>
                        <ListItem>
                          <strong>
                            Les données calculées relatives à l’utilisateur, au
                            sommeil et à l’activité
                          </strong>
                          , telles que les différentes phases de sommeil
                          (profond, léger, paradoxal, éveil), les niveaux
                          d’activité au cours de la journée, le niveau de
                          préparation, l’indice de masse corporelle (calculé à
                          partir de la taille et du poids)
                        </ListItem>
                      </List>
                      <Typography>
                        Veuillez noter que certaines des données à caractère
                        personnel que nous traitons, y compris celles qui
                        concernent votre santé, sont considérées comme des
                        données à caractère personnel spéciales ou sensibles. En
                        vertu de la loi applicable, ces données ne sont traitées
                        que dans la mesure où vous y avez consenti. Si vous
                        accédez à l’un des services de localisation d’Oura ou
                        l’utilisez, par exemple en activant le suivi d’activité
                        par GPS par le biais de votre application, Oura peut
                        traiter la position approximative ou précise de votre
                        appareil pendant la durée d’activation du service. Ces
                        données s’obtiennent par le biais de l’ID de réseau, le
                        GPS et/ou les données Wi-Fi du fournisseur de services
                        de votre appareil. Oura ne traitera ces données de
                        localisation que si vous y consentez au préalable. Vous
                        pouvez désactiver cette fonctionnalité à tout moment en
                        configurant les paramètres d’autorisation de
                        localisation de votre appareil.
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Clients de la boutique en ligne et visiteurs du site Web
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        SITE WEB ET BOUTIQUE EN LIGNE
                      </Typography>
                      <H2>FINALITÉS DU TRAITEMENT</H2>
                      <Typography>
                        Lorsque vous visitez le site Web d’Oura ou que vous
                        passez une commande sur la boutique en ligne d’Oura,
                        nous traitons vos données à caractère personnel aux fins
                        suivantes :
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Achever et livrer votre commande</H3List>
                          <Typography>
                            Nous traitons les données à caractère personnel en
                            vue de traiter, gérer et livrer votre commande, et
                            de faciliter vos achats.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Fourniture de services à la clientèle</H3List>
                          <Typography>
                            Nous traitons vos données à caractère personnel dans
                            le but de fournir des services à notre clientèle et
                            de gérer notre communication avec celle-ci. Si vous
                            contactez notre service d’assistance pour des
                            questions liées à l’anneau Oura ou nos services,
                            nous utiliserons les informations fournies pour
                            répondre à vos questions et vous aider à résoudre
                            vos problèmes éventuels.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Développer et améliorer nos services</H3List>
                          <Typography>
                            Nous traitons les informations relatives à
                            l’utilisation de notre site par les visiteurs afin
                            d’améliorer la qualité de nos services en ligne.
                            Pour cela, nous pouvons utiliser les statistiques
                            Web et les tendances observées sur notre site Web et
                            dans notre boutique en ligne. Lorsque cela est
                            possible, nous n’utiliserons que des données
                            globales et anonymisées.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Faire la promotion de nos services et les
                            commercialiser
                          </H3List>
                          <Typography>
                            Nous traitons des données marketing dans le but de
                            fournir de la publicité en ligne et des
                            communications marketing Oura. Oura ne cible pas ses
                            clients par le biais de publicités en ligne reposant
                            sur leurs données de santé dans l’application Oura.
                            Comme expliqué plus en détail dans notre Politique
                            en matière de cookies{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                Lien vers notre Politique en matière de cookies
                              </BodyLink>
                            </Link>
                            , nous utilisons des cookies sur notre site Web pour
                            créer des publics cibles pour la publicité en ligne.
                            Vous pouvez à tout moment refuser de recevoir des
                            communications marketing. Vous ne recevrez notre
                            newsletter que si vous en avez fait la demande.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Se conformer aux obligations légales</H3List>
                          <Typography>
                            Dans certains cas, nous sommes tenus de traiter
                            certaines données lorsque cela est exigé par la
                            législation applicable. Ces obligations
                            réglementaires sont liées, par exemple, à des
                            exigences comptables et fiscales, à des réclamations
                            légales ou à d’autres obligations légales.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>BASE JURIDIQUE DU TRAITEMENT </H2>
                      <Typography>
                        La législation européenne sur la protection des données
                        exige une « base légale » pour la collecte et la
                        conservation d’informations personnelles auprès des
                        résidents de l’Espace économique européen (EEE). Les
                        bases légales sur lesquelles nous nous appuyons pour
                        traiter vos données dépendent des finalités
                        particulières de ce traitement, y compris :
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Contrat :</strong> lorsque nous traitons vos
                          données à caractère personnel pour gérer et livrer vos
                          achats, nous nous appuyons sur la base légale d’un
                          contrat d’utilisation, qui prend forme lorsque vous
                          passez votre commande.
                        </ListItem>
                        <ListItem>
                          <strong>Consentement :</strong> nous traitons vos
                          données à caractère personnel à des fins de marketing
                          direct par voie électronique si vous avez donné votre
                          consentement à cet égard.
                        </ListItem>
                        <ListItem>
                          <strong>Intérêts légitimes :</strong>lorsque nous
                          traitons vos données à caractère personnel pour le
                          service à la clientèle, le marketing et le
                          développement de nos produits, nous agissons
                          conformément à nos intérêts légitimes à gérer,
                          maintenir et développer notre activité et à créer et
                          maintenir des relations avec nos clients. Lorsque nous
                          choisissons d’utiliser vos données conformément à nos
                          intérêts légitimes, nous évaluons attentivement nos
                          propres intérêts par rapport à votre droit au respect
                          de la vie privée en vertu des lois applicables.
                        </ListItem>
                        <ListItem>
                          <strong>Obligation légale :</strong> Oura est tenue de
                          traiter certaines informations pour respecter des
                          obligations légales susceptibles de varier selon les
                          pays. Ces obligations peuvent, par exemple, concerner
                          les lois relatives à la protection du consommateur ou
                          la législation comptable.
                        </ListItem>
                      </List>
                      <H2>DONNÉES TRAITÉES ET SOURCE DES DONNÉES</H2>
                      <Typography>
                        Dans la plupart des cas, nous collectons des données à
                        caractère personnel directement auprès de vous si vous
                        choisissez de passer commande sur notre boutique en
                        ligne ou si vous nous contactez au sujet d’une question
                        ou d’une réclamation. Lorsque vous vous rendez sur le
                        site Web ou la boutique en ligne d’Oura, nous collectons
                        des données analytiques à votre sujet par le biais de
                        votre appareil et de votre navigateur au moyen de
                        cookies et de diverses autres technologies à des fins de
                        développement de nos services et de publicité.
                      </Typography>
                      <Typography>
                        Nous traitons les catégories de données à caractère
                        personnel suivantes concernant les visiteurs du site Web
                        et de la boutique en ligne :
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Les coordonnées</strong> telles que le nom,
                          l’adresse e-mail et l’adresse postale
                        </ListItem>
                        <ListItem>
                          <strong>Les informations de livraison</strong> telles
                          que vos commandes et le mode de paiement choisi
                        </ListItem>
                        <ListItem>
                          <strong>Les informations sur l’appareil</strong>{' '}
                          telles que l’adresse IP, l’heure de la visite et les
                          données de localisation
                        </ListItem>
                        <ListItem>
                          <strong>
                            Les informations relatives à l’activité de
                            l’utilisateur
                          </strong>{' '}
                          telles que les habitudes de navigation sur le site et
                          toute communication que vous avez établie avec nous.
                          with us.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Personnes résidant en Californie
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        Personnes résidant en Californie
                      </Typography>
                      <H2>
                        AVIS DE CONFIDENTIALITÉ CCPA À L’INTENTION DES
                        CONSOMMATEURS CALIFORNIENS
                      </H2>
                      <Typography>
                        Cet avis vient compléter les informations contenues dans
                        la présente Déclaration de confidentialité d’Oura et de
                        ses filiales (collectivement, « nous », « notre » ou «
                        nos ») et concerne uniquement l’ensemble des visiteurs,
                        utilisateurs et autres résidents de l’État de Californie
                        (« clients » ou « vous »), et qui accèdent au site Web
                        d’Oura ou aux services fournis par Oura. Cet avis
                        s’inscrit dans le cadre de la loi californienne de 2018
                        sur la protection des données à caractère personnel du
                        consommateur en Californie (« California Consumer
                        Privacy Act » ou « CCPA »). L’ensemble des termes
                        définis dans la CCPA ont le même sens lorsqu’ils sont
                        utilisés dans le présent avis.
                      </Typography>
                      <H2>COLLECTE, UTILISATION ET PARTAGE DES INFORMATIONS</H2>
                      <Typography>
                        Lorsqu’un client interagit avec les produits et/ou les
                        services d’Oura, cette dernière collecte des
                        informations qui identifient, concernent, décrivent,
                        font référence, sont raisonnablement susceptibles d’être
                        associées, ou pourraient raisonnablement être liées,
                        directement ou indirectement, à un consommateur ou un
                        appareil particulier (« Informations personnelles »).
                      </Typography>
                      <Typography>
                        Les informations relatives aux catégories d’informations
                        personnelles que nous collectons, aux fins pour
                        lesquelles ces informations sont traitées et à tout
                        partage de celles-ci figurent dans les sections
                        pertinentes de la présente Déclaration de
                        confidentialité ci-dessus :
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            Utilisateurs de l’appareil et de l’application :
                            catégories d’informations personnelles collectées et
                            finalités du traitement
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            Visiteurs du site Web et de la boutique en ligne :
                            catégories d’informations personnelles collectées et
                            finalités du traitement
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            Partage de données à caractère personnel
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        Au cours des douze (12) derniers mois, Oura n’a vendu
                        aucune Information personnelle à des tiers, y compris à
                        des agrégateurs de données.
                      </Typography>
                      <H2>DROITS DES CONSOMMATEURS CALIFORNIENS</H2>
                      <Typography>
                        Si vous résidez en Californie, vous disposez de certains
                        droits en vertu du CCPA :
                      </Typography>
                      <H3>
                        Droit de prendre connaissance des informations
                        personnelles que nous collectons et partageons
                      </H3>
                      <Typography>
                        Le CCPA vous donne le droit de nous demander de vous
                        fournir les informations personnelles que nous avons
                        collectées à votre sujet au cours des 12 derniers mois,
                        ce que nous faisons après avoir reçu et validé votre
                        demande. Une fois que nous avons reçu et confirmé votre
                        demande vérifiable du consommateur, nous vous
                        divulguerons :
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          les catégories d’informations personnelles que nous
                          avons collectées à votre sujet ;
                        </ListItem>
                        <ListItem>
                          les catégories d’informations personnelles que nous
                          avons divulguées à votre sujet (le cas échéant) ;
                        </ListItem>
                        <ListItem>
                          les catégories de sources pour les informations
                          personnelles que nous avons collectées à votre sujet ;
                        </ListItem>
                        <ListItem>
                          les finalités professionnelles ou commerciales de la
                          collecte ou de la vente de vos informations
                          personnelles ;
                        </ListItem>
                        <ListItem>
                          les catégories de tiers avec lesquels nous partageons
                          ces informations personnelles ;
                        </ListItem>
                        <ListItem>
                          les informations personnelles spécifiques collectées
                          par Oura à votre sujet. Veuillez noter que dans le
                          cadre du CCPA, il nous est interdit de
                        </ListItem>
                      </List>
                      <H3>Droit à l’effacement</H3>
                      <Typography>
                        Vous avez le droit de demander l’effacement de vos
                        informations personnelles, sous réserve de certaines
                        exceptions, par exemple lorsque nous avons l’obligation
                        légale de conserver les données en question. Après avoir
                        reçu et validé votre demande, nous supprimerons vos
                        informations personnelles et demanderons à nos
                        fournisseurs de services d’en faire autant, sauf
                        exception.
                      </Typography>
                      <H3>
                        Modalités de demande de divulgation, d’accès ou de
                        suppression des données à caractère personnel{' '}
                      </H3>
                      <Typography>
                        Si vous résidez en Californie, vous pouvez demander la
                        divulgation de vos données à caractère personnel,
                        l’accès à celles-ci et/ou la suppression de celles-ci,
                        comme décrit ci-dessus, en nous soumettant une demande
                        vérifiable du consommateur. Pour cela, vous pouvez :
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          nous écrire à l’adresse{' '}
                          <strong>dataprotection@ouraring.com</strong>, en
                          joignant à votre demande les informations suivantes :
                          vos nom et prénom, le nom de votre société (le cas
                          échéant), votre adresse postale, votre adresse e-mail
                          ainsi qu’un numéro de téléphone. Il est possible que
                          nous vous demandions de fournir des informations
                          supplémentaires pour confirmer votre identité. Cette
                          mesure s’applique à des fins de sécurité et s’avère
                          nécessaire dans certains cas en vertu de la loi.
                        </ListItem>
                      </List>
                      <Typography>
                        Seuls vous ou une personne enregistrée auprès du
                        secrétaire d’État de la Californie que vous autorisez à
                        agir en votre nom pouvez faire une demande vérifiable de
                        consommateur concernant vos informations personnelles.
                        Vous pouvez également faire une demande vérifiable de
                        consommateur au nom de votre enfant mineur.
                      </Typography>
                      <Typography>
                        Vous ne pouvez faire une demande libre que deux fois au
                        cours d’une période de 12 mois. Nous répondrons à toutes
                        les demandes validées dans les 45 jours suivant leur
                        réception, sauf si nous sollicitons une prolongation du
                        délai. Dans le cas où nous aurions besoin d’une
                        prolongation raisonnable pour répondre à votre demande,
                        nous vous en informerons dans le délai initial de 45
                        jours.
                      </Typography>
                      <H3>Non-Discrimination</H3>
                      <Typography>
                        Oura ne discrimine pas les utilisateurs souhaitant
                        exercer leur droit au respect de la vie privée en vertu
                        du CCPA. Sous réserve d’une exception, cela implique
                        notre promesse de ne pas :
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          vous refuser de biens ou de services ;
                        </ListItem>
                        <ListItem>
                          vous facturer des prix ou des tarifs différents pour
                          des biens ou des services, y compris en vous accordant
                          des remises ou d’autres avantages, ou en vous
                          infligeant des pénalités ;
                        </ListItem>
                        <ListItem>
                          vous fournir un niveau ou une qualité de biens ou de
                          services différents ;
                        </ListItem>
                        <ListItem>
                          laisser entendre que vous pourriez bénéficier d’un
                          prix ou d’un tarif différent pour des biens ou des
                          services, ou d’un niveau ou d’une qualité de biens ou
                          de services différents.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  PARTAGE ET DIVULGATION DES DONNÉES
                </Typography>
                <H2>Partage de données à caractère personnel </H2>
                <Typography>
                  Oura ne vend ni ne loue vos informations personnelles, et ne
                  partage vos données à caractère personnel qu’avec certains
                  fournisseurs de services de confiance dans le but de vous
                  fournir nos services et d’exercer nos activités. Chaque fois
                  que nous partageons des données avec des fournisseurs de
                  services tiers, nous exigeons que ces derniers utilisent vos
                  informations uniquement aux fins que nous avons permises, et
                  pour les motifs limités exposés dans la présente Déclaration
                  de confidentialité. Nous exigeons également de ces
                  fournisseurs de services une protection de vos informations
                  personnelles au moins équivalente aux normes que nous
                  appliquons.
                </Typography>
                <Typography>
                  À l’instar de la plupart des entreprises, Oura fait appel à
                  des fournisseurs de services à des fins telles que :
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    la fourniture et l’amélioration de notre plate-forme de
                    services en ligne ;
                  </ListItem>
                  <ListItem>
                    le stockage des données de nos utilisateurs ;
                  </ListItem>
                  <ListItem>
                    la fourniture de services à la clientèle ;{' '}
                  </ListItem>
                  <ListItem>
                    la gestion et la mise en place de nos activités de
                    marketing. Oura ne partage les données d’utilisation de son
                    site Web qu’avec les partenaires de son réseau publicitaire
                    à des fins d’analyse et d’optimisation de ses activités
                    marketing. Oura ne transmet aucune donnée de l’application
                    Oura à des annonceurs tiers ;
                  </ListItem>
                  <ListItem>
                    l’analyse des informations relatives à l’utilisation de nos
                    services en ligne dans le but d’améliorer la qualité de nos
                    services.
                  </ListItem>
                </List>
                <Typography>
                  Oura stocke principalement les données à caractère personnel
                  dans la zone géographique où elles sont collectées. Dans les
                  cas où les données à caractère personnel sont traitées en
                  dehors de la zone dans laquelle elles ont été collectées, nous
                  veillons systématiquement à ce que vos données à caractère
                  personnel soient protégées par des mesures de protection
                  appropriées conformes aux lois applicables en matière de
                  confidentialité. Nous appliquons également les mesures de
                  protection des données conformes aux normes du secteur afin de
                  sécuriser tous les transferts internationaux de données à
                  caractère personnel par le biais d’accords de protection des
                  données avec nos fournisseurs de services.
                </Typography>
                <H2>Divulgation de données à caractère personnel</H2>
                <Typography>
                  Nous nous réservons également le droit de divulguer des
                  données à caractère personnel dans certaines circonstances
                  précises, par exemple :
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    lorsque nous avons votre consentement explicite pour le
                    faire ;
                  </ListItem>
                  <ListItem>
                    lorsque cela est raisonnablement nécessaire pour nos
                    intérêts légitimes à mener nos activités, par exemple en cas
                    de fusion, d’acquisition ou de vente ;
                  </ListItem>
                  <ListItem>
                    afin de protéger les droits légaux et la propriété d’Oura ;
                  </ListItem>
                  <ListItem>
                    pour se conformer à la loi ou au respect de la législation.
                  </ListItem>
                </List>
                <Typography>
                  Dans les autres cas, vos informations personnelles ne font
                  jamais l’objet d’un partage avec une quelconque personne ou
                  organisation.
                </Typography>
                <H2>PROTECTION DE VOS DONNÉES</H2>
                <Typography>
                  Oura met en œuvre des mesures de protection techniques et
                  organisationnelles visant à assurer la sécurité de vos
                  données. Le cas échéant, ces mesures comprennent des
                  dispositions telles que l’anonymisation et la pseudonymisation
                  des données à caractère personnel, un contrôle d’accès strict
                  et le recours au chiffrement pour protéger les données que
                  nous traitons.
                </Typography>
                <Typography>
                  Nous veillons également à ce que notre personnel reçoive une
                  formation appropriée afin de veiller à ce que les données à
                  caractère personnel ne soient traitées que conformément à nos
                  politiques internes, dans le respect de nos obligations en
                  vertu du droit applicable. Nous limitons également l’accès à
                  vos données à caractère personnel sensibles au personnel
                  auquel cet accès a été expressément accordé.
                </Typography>
                <Typography>
                  Les services en ligne que nous fournissons, tels que la
                  boutique en ligne Oura et Oura sur le Web, assurent la
                  protection de vos données à caractère personnel en transit à
                  l’aide du chiffrement et de diverses mesures de sécurité. De
                  plus, nos services et systèmes ainsi que d’autres moyens font
                  l’objet de tests réguliers en vue de détecter d’éventuelles
                  failles de sécurité.
                </Typography>
                <Typography>
                  Nous mettons régulièrement à jour l’application Oura et le
                  firmware de l’anneau. Nous vous recommandons de faire en sorte
                  de disposer en permanence des dernières versions de
                  l’application et du firmware afin de maximiser la protection
                  de vos données.
                </Typography>
                <H2>CONSERVATION DES DONNÉES</H2>
                <Typography>
                  La période de conservation de vos données à caractère
                  personnel dépend généralement de la durée du cycle de vie de
                  votre compte Oura. Vos données à caractère personnel seront
                  supprimées dès lors qu’elles ne seront plus nécessaires aux
                  fins pour lesquelles elles ont été collectées à l’origine,
                  sauf si nous avons une obligation légale de conserver ces
                  données pendant une plus longue période. Par exemple, les
                  données de mesure relatives à votre sommeil, votre niveau de
                  préparation et votre niveau d’activité ne sont stockées que
                  pendant la durée d’activité de votre compte Oura.
                </Typography>
                <Typography>
                  Oura est également tenue par la loi de conserver certaines
                  données à caractère personnel pendant une période déterminée,
                  par exemple à des fins fiscales. Ces durées de conservation
                  obligatoires peuvent concerner, par exemple, des exigences
                  comptables et fiscales, des réclamations légales ou toute
                  autre obligation légale. Sachez que les durées de conservation
                  obligatoires des données à caractère personnel varient en
                  fonction de la loi applicable.
                </Typography>
                <Typography>
                  Vous pouvez, si vous le souhaitez, demander la suppression de
                  votre compte Oura en envoyant un e-mail à l’adresse{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H2>UTILISATION DES COOKIES</H2>
                <Typography>
                  Nous collectons et stockons, à l’aide de cookies et de
                  diverses autres technologies, des données analytiques ainsi
                  que d’autres informations lorsque les clients consultent notre
                  site. Nous les utilisons également à des fins de
                  personnalisation et de publicité. Nous utilisons des cookies
                  propriétaires et des cookies tiers.
                </Typography>
                <Typography>
                  Les cookies sont de petits fichiers texte envoyés et
                  enregistrés sur votre appareil nous permettant d’identifier
                  les visiteurs de nos sites Web, de faciliter l’utilisation de
                  notre site et de produire des informations globales sur nos
                  visiteurs. Ils nous aident à optimiser nos services et à mieux
                  servir nos clients, sans pour autant porter atteinte à votre
                  appareil ou à vos fichiers. Nous utilisons des cookies dans le
                  but de personnaliser notre site et les informations que nous
                  fournissons en fonction des centres d’intérêt individuels de
                  nos clients. Ces petits fichiers servent également à suivre
                  vos habitudes de navigation et à cibler et optimiser le
                  contenu publicitaire, tant sur notre site que sur d’autres
                  sites que vous pourriez visiter. Ils nous permettent en outre
                  d’intégrer nos comptes de réseaux sociaux sur notre site Web.
                </Typography>
                <Typography>
                  Veuillez consulter notre Politique en matière de cookies{' '}
                  <Link href="/cookie-policy">
                    <BodyLink color="inherit">
                      Lien vers notre Politique en matière de cookies
                    </BodyLink>
                  </Link>{' '}
                  pour en savoir plus sur l’utilisation des cookies par Oura et
                  sur la manière dont vous pouvez définir vos préférences en la
                  matière.
                </Typography>
                <H2>VOS DROITS EN TANT QUE PERSONNE CONCERNÉE</H2>
                <Typography>
                  À chaque fois qu’Oura traite vos données à caractère
                  personnel, vous disposez de certains droits vous permettant de
                  contrôler la manière dont elles le sont. La présente section
                  vous informe sur chacun de ces droits. Si vous souhaitez
                  exercer vos droits en tant que personne concernée, veuillez
                  envoyer votre demande à l’adresse{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Droit d’accès aux données </H3>
                <Typography>
                  Vous êtes en droit de savoir quelles données à caractère
                  personnel sont traitées à votre sujet. Vous pouvez nous
                  contacter pour demander l’accès aux données à caractère
                  personnel que nous avons collectées à votre sujet. Nous vous
                  indiquerons si nous traitons vos données et vous fournirons
                  des informations sur les données à caractère personnel que
                  nous avons collectées et traitées à votre sujet.
                </Typography>
                <Typography>
                  Sachez qu’à l’aide de l’application Oura, vous pouvez
                  facilement accéder aux données relatives au sommeil, au niveau
                  de préparation et au niveau d’activité que nous traitons à
                  votre sujet. Vous pouvez également accéder à vos données via
                  Oura sur le Web à l’adresse{' '}
                  <a
                    href="https://cloud.ouraring.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    https://cloud.ouraring.com
                  </a>
                  .
                </Typography>
                <H3>Droit à l’effacement</H3>
                <Typography>
                  Vous avez le droit de demander l’effacement de vos données à
                  caractère personnel dans certaines circonstances. Nous nous
                  conformerons à ces demandes, à moins qu’une base juridique
                  valable ou une obligation légale nous oblige à conserver ces
                  données.
                </Typography>
                <H3>Droit de rectification (de données inexactes) </H3>
                <Typography>
                  Vous avez le droit de demander la rectification de toutes
                  données à caractère personnel incorrectes ou incomplètes que
                  nous avons stockées à votre sujet.
                </Typography>
                <Typography>
                  Sachez que vous pouvez vous-même corriger et mettre à jour
                  certaines de vos informations générales dans l’application
                  Oura et sur Oura sur le Web.
                </Typography>
                <H3>Droit à la portabilité des données </H3>
                <Typography>
                  Vous avez le droit de demander à recevoir les données à
                  caractère personnel que vous nous avez fournies dans un format
                  structuré et couramment utilisé. Le droit à la portabilité des
                  données s’applique uniquement lorsque nous traitons vos
                  données à caractère personnel pour certains motifs, notamment
                  dans le cadre d’un contrat ou avec votre consentement.
                </Typography>
                <Typography>
                  Sachez qu’Oura sur le Web vous offre la possibilité d’exporter
                  vos propres données.
                </Typography>
                <H3>Droit d’opposition au traitement</H3>
                <Typography>
                  Vous avez le droit de vous opposer au traitement de vos
                  données à caractère personnel dans certaines circonstances.
                  Dans le cas où nous ne disposerions pas de motifs légitimes
                  pour continuer à traiter ces données à caractère personnel,
                  nous ne traiterons plus vos données à caractère personnel
                  après avoir reçu et vérifié votre objection. Vous avez
                  également le droit de vous opposer à tout moment au traitement
                  de vos données à caractère personnel à des fins de marketing
                  direct.
                </Typography>
                <H3>Droit à la limitation du traitement </H3>
                <Typography>
                  Vous avez aussi le droit de nous demander de limiter le
                  traitement de vos données à caractère personnel dans certaines
                  circonstances. Si par exemple vous contestez l’exactitude de
                  vos données, vous pouvez formuler une demande de limitation
                  afin que nous ne traitions pas vos données jusqu’à ce qu’Oura
                  ait vérifié leur exactitude.
                </Typography>
                <H3>Droit au retrait du consentement</H3>
                <Typography>
                  Si le traitement de vos données à caractère personnel a
                  nécessité un consentement de votre part, vous avez le droit de
                  retirer ce consentement à tout moment. Il convient toutefois
                  de noter que le retrait de votre consentement peut mener à des
                  problèmes ou certaines limitations de votre capacité à
                  utiliser pleinement les services d’Oura.
                </Typography>
                <Typography>
                  Sachez que vous pouvez à tout moment vous désabonner de notre
                  newsletter et d’autres e-mails commerciaux en utilisant le
                  lien « Unsubscribe » (Se désabonner) figurant dans les e-mails
                  que vous recevez de notre part. * * *
                </Typography>
                <Typography>
                  Oura met tout en œuvre pour répondre à vos questions
                  concernant la confidentialité. Si vous avez contacté Oura au
                  sujet d’un problème et que notre réponse ne vous donne pas
                  satisfaction, sous réserve de la loi applicable, vous pouvez
                  contacter les autorités locales de contrôle à ce sujet. Nous
                  vous prions toutefois de nous contacter en premier lieu à
                  l’adresse <strong>dataprotection@ouraring.com</strong> afin
                  que nous puissions trouver plus rapidement une solution à
                  votre problème avant de contacter les autorités.
                </Typography>
                <Typography>
                  Veuillez consulter l’avis de confidentialité CCPA d’Oura si
                  vous résidez dans l’État de Californie pour en savoir plus sur
                  vos droits en vertu de la loi californienne.
                </Typography>
                <H2>COORDONNÉES DU RESPONSABLE DU TRAITEMENT DES DONNÉES</H2>
                <Typography>
                  Ouraring Inc. est le responsable du traitement des données à
                  caractère personnel des utilisateurs traitées à des fins de
                  marketing. Le responsable du traitement des données à
                  caractère personnel traitées à toutes autres fins est Oura
                  Health Oy. Veuillez trouver ci-dessous nos coordonnées :
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  Adresse : Elektroniikkatie 10, 90590 Oulu Finlande
                </Typography>
                <Typography>
                  Délégué à la protection des données :
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  Adresse : 60 Francisco St, San Francisco, CA, 94133-2104
                  États-Unis
                </Typography>
                <Typography>
                  Délégué à la protection des données :{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>MODIFICATIONS DU PRÉSENT AVIS DE CONFIDENTIALITÉ</H2>
              <Typography>
                La présente Déclaration de confidentialité est en vigueur depuis
                le <strong>15 septembre 2021</strong>. Nous nous réservons le
                droit de mettre à jour cette Déclaration de temps en temps, à
                notre seule discrétion. Toutefois, dans ce cas, nous vous
                informerons de tout changement substantiel soit en faisant
                apparaître l’information sur notre site Web, soit en vous
                envoyant un e-mail ou une notification push. Si, à la suite
                d’une modification, vous continuez à utiliser les services Oura,
                le fait de continuer à les utiliser équivaut à l’acceptation de
                ces modifications.
              </Typography>
            </TypographyRhythm>
          </Box>
        </PageContainer>
        <Footer />
      </div>
    </div>
  );
};

PrivacyPolicyOuraHealth.pageName = 'Oura Health Privacy Policy';
PrivacyPolicyOuraHealth.isSormusCompatible = true;

export default PrivacyPolicyOuraHealth;
