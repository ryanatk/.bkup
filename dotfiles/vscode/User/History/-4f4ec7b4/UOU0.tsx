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
    if (!index) {
      return;
    }

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
        <PageContainer name="privacy-policy-oura-health-it" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Informativa sulla privacy di Oura
              </Typography>
              <H2>INFORMAZIONI CIRCA L’INFORMATIVA SULLA PRIVACY</H2>
              <Typography>
                Per Oura la protezione dei tuoi dati personali è importante. La
                presente informativa sulla privacy si applica all’elaborazione
                dei dati personali da parte di Oura Health Oy e Ouraring Inc.
                (collettivamente, "Oura").{' '}
              </Typography>
              <Typography>
                I nostri prodotti, come l'anello Oura, ti consentono di
                monitorare le tue scelte di vita e la qualità del tuo sonno.
                Sappiamo che si tratta di dati estremamente personali e la
                protezione di questi dati personali è di fondamentale importanza
                per noi. Per favore, prenditi un momento per esaminare
                attentamente questa dichiarazione.{' '}
              </Typography>
              <H2>PERCHÉ OURA ELABORA I TUOI DATI PERSONALI?</H2>
              <Typography>
                Nella sezione qui di seguito, spiegheremo le categorie di dati
                personali che raccogliamo ed elaboriamo, oltre alle ragioni per
                cui lo facciamo, ad esempio per fornirti servizi quando visiti
                il nostro sito Web, effettui acquisti sul nostro sito e utilizzi
                il tuo anello e l’app. Troverai anche informazioni sulla nostra
                base giuridica per l’elaborazione dei tuoi dati nonché sulle
                nostre fonti di dati.{' '}
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
                      Utenti del dispositivo e dell’applicazione
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        DISPOSITIVO E APPLICAZIONE
                      </Typography>
                      <H2>SCOPI DI ELABORAZIONE </H2>
                      <Typography>
                        Oura raccoglie ed elabora i dati personali degli Utenti
                        di Dispositivi e Applicazioni ("Utenti") solo per i
                        seguenti scopi:{' '}
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Fornire servizi Oura</H3List>
                          <Typography>
                            Elaboriamo i dati personali per fornire i servizi e
                            le funzionalità dell’app di OURA, per esempio, per
                            fornirti informazioni giornaliere su prontezza,
                            sonno e attività.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Fornire assistenza ai clienti</H3List>
                          <Typography>
                            Elaboriamo i dati personali allo scopo di fornire
                            assistenza e gestire la comunicazione con i nostri
                            clienti. Se contatti la nostra assistenza clienti
                            con domande relative ai tuoi dati dell'app, potremmo
                            utilizzare le informazioni fornite per rispondere
                            alle tue domande e risolvere ogni eventuale
                            problema.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Sviluppare i nostri prodotti e servizi
                          </H3List>
                          <Typography>
                            Elaboriamo i dati relativi al tuo utilizzo
                            dell'anello e della piattaforma Oura per migliorare
                            i nostri servizi e le nostre funzionalità, come
                            nell'app Oura. Quando possibile, lo faremo
                            utilizzando solo dati pseudonimizzati, aggregati o
                            non di identificazione personale.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Commercializzare i nostri prodotti e servizi
                          </H3List>
                          <Typography>
                            Elaboriamo i dati relativi al marketing per fornire
                            pubblicità online e comunicazioni di marketing Oura.
                            Per esempio, come spiegato in modo più esauriente
                            nella nostra Informativa sui cookie{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                Link alla Informativa sui Cookie
                              </BodyLink>
                            </Link>
                            utilizziamo i cookie sul nostro sito Web per creare
                            un pubblico mirato per la pubblicità online. Puoi
                            sempre disattivare le comunicazioni di marketing e
                            ti invieremo solo la nostra newsletter, se l’hai
                            richiesto.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Abilitare integrazioni di terze parti{' '}
                          </H3List>
                          <Typography>
                            Elaboriamo i dati degli utenti che hanno richiesto
                            di condividere i propri dati con determinate terze
                            parti, come ad esempio partner di ricerca. Questo è
                            fatto solo con il tuo espresso consenso.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Rispettare gli obblighi di legge</H3List>
                          <Typography>
                            In certi casi, dobbiamo elaborare determinati dati
                            quando è richiesto dalle leggi e dai regolamenti
                            applicabili. Tali obblighi di legge sono correlati,
                            ad esempio, a requisiti contabili e fiscali, diritti
                            legali o altri scopi legali.{' '}
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>BASE GIURIDICA PER L’ELABORAZIONE</H2>
                      <Typography>
                        La legge sulla protezione dei dati in Europa richiede
                        una "base legale" per la raccolta e la conservazione di
                        informazioni personali da residenti dello Spazio
                        economico europeo. Le nostre basi legali per elaborare i
                        tuoi dati dipendono dagli specifici scopi di
                        elaborazione, tra cui:{' '}
                      </Typography>
                      <Typography>
                        <strong>Contratto:</strong> per fornire i servizi OURA,
                        elaboriamo i dati personali sulla base di un contratto
                        utente, stipulato quando crei il tuo account e accetti i
                        nostri termini e le nostre condizioni.
                      </Typography>
                      <Typography>
                        <strong>Consenso:</strong> elaboriamo i tuoi dati
                        relativi alla salute solo con il tuo consenso. In alcuni
                        casi, puoi fornirci il tuo consenso per l'elaborazione
                        dei tuoi dati attraverso le tue azioni, ad esempio
                        inserendo dati sanitari nelle tue note o aggiungendo tag
                        relativi alla salute nell'app Oura.{' '}
                      </Typography>
                      <Typography>
                        <strong>Interesse legittimo:</strong> elaboriamo i tuoi
                        dati personali in base ai nostri interessi legittimi
                        quando li processiamo allo scopo di commercializzare i
                        nostri prodotti e servizi, fornire assistenza ai clienti
                        e migliorare i nostri prodotti e servizi. Quando
                        scegliamo di utilizzare i tuoi dati sulla base dei
                        nostri legittimi interessi, valutiamo attentamente i
                        nostri interessi rispetto al tuo diritto alla privacy,
                        in conformità alla legge applicabile.{' '}
                      </Typography>
                      <Typography>
                        <strong>Obbligo legale:</strong> Oura deve elaborare
                        determinate informazioni per ottemperare agli obblighi
                        di legge che possono variare da Paese a Paese. Ad
                        esempio, tali obblighi possono riguardare la tutela dei
                        consumatori o le leggi fiscali.{' '}
                      </Typography>
                      <H2>DATI ELABORATI E FONTE DEI DATI</H2>
                      <Typography>
                        Nella maggior parte dei casi, Oura raccoglie dati
                        personali direttamente da te, ad esempio quando ti
                        registri per un account o utilizzi il tuo anello per
                        raccogliere dati di misurazione tramite le funzioni di
                        tracciamento dell’anello Oura. Potremmo anche elaborare
                        i dati che vengono prodotti dalle informazioni che ci
                        fornisci.
                      </Typography>
                      <Typography>
                        Oura elabora le seguenti categorie di dati personali
                        sugli Utenti del dispositivo e dell'applicazione:{' '}
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          Informazioni di contatto come indirizzo e-mail o
                          indirizzo fisico
                        </ListItem>
                        <ListItem>
                          <strong>Informazioni sull'utente</strong> come sesso,
                          altezza e peso, ID utente e altre informazioni che
                          potresti fornirci su te stesso o sul tuo account{' '}
                        </ListItem>
                        <ListItem>
                          <strong>Informazioni sul dispositivo</strong> come
                          indirizzo IP e dati sulla posizione
                        </ListItem>
                        <ListItem>
                          <strong>
                            Informazioni sull'attività dell'utente e sul
                            contesto
                          </strong>{' '}
                          come attività, note e tag
                        </ListItem>
                        <ListItem>
                          <strong>Dati di misurazione</strong> come frequenza
                          cardiaca, dati sul movimento e sulla temperatura{' '}
                        </ListItem>
                        <ListItem>
                          <strong>
                            Dati calcolati su utente, sonno e attività
                          </strong>
                          , come fasi del sonno (profondo, leggero, REM,
                          veglia), livelli di attività durante il giorno,
                          livello di prontezza, indice di massa corporea
                          (calcolato in base all'altezza e al peso).
                        </ListItem>
                      </List>
                      <Typography>
                        Alcuni dei dati personali che elaboriamo, inclusi i dati
                        relativi alla tua salute, sono considerati dati
                        personali speciali o sensibili. Ai sensi della legge
                        applicabile, tali dati sono trattati solo se hai fornito
                        il tuo consenso all’elaborazione. Se accedi o utilizzi
                        uno dei servizi basati sulla posizione di Oura, ad
                        esempio abilitando il monitoraggio dell'attività basato
                        su GPS tramite la tua app, Oura potrebbe elaborare la
                        posizione approssimativa o precisa del tuo dispositivo
                        mentre il servizio è attivo. Questi dati possono essere
                        ottenuti tramite l'ID di rete del provider di servizi
                        del dispositivo, il GPS e/o i dati Wi-Fi. Oura non
                        elabora tali dati sulla posizione senza aver prima
                        ottenuto il tuo consenso. Puoi disabilitare
                        l’elaborazione della posizione in qualsiasi momento
                        utilizzando le impostazioni di autorizzazione di accesso
                        alla posizione del tuo dispositivo.{' '}
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Clienti del negozio online e visitatori del sito web
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        SITO WEB E NEGOZIO ONLINE
                      </Typography>
                      <H2>SCOPI DI ELABORAZIONE </H2>
                      <Typography>
                        Se visiti il sito Web di Oura o completi ordini sul
                        negozio online di Oura, elaboriamo i dati personali per
                        le seguenti finalità:{' '}
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Completare e consegnare i tuoi ordini</H3List>
                          <Typography>
                            Trattiamo i dati personali per elaborare, gestire e
                            consegnare i tuoi acquisti nonché per facilitarli.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Fornire assistenza ai clienti</H3List>
                          <Typography>
                            Elaboriamo i dati personali allo scopo di fornire un
                            servizio di assistenza clienti e gestire la
                            comunicazione con i nostri clienti. Se contatti la
                            nostra assistenza clienti con domande relative al
                            tuo anello Oura o ai nostri servizi, utilizzeremo le
                            informazioni fornite per rispondere alle tue domande
                            e risolvere ogni eventuale problema.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Sviluppare e migliorare i nostri servizi
                          </H3List>
                          <Typography>
                            Elaboriamo le informazioni relative all'utilizzo del
                            nostro sito da parte dei visitatori per migliorare
                            la qualità dei nostri servizi online. Ciò può
                            comportare l'uso da parte nostra di statistiche e
                            trend online sul nostro sito Web e nel nostro
                            negozio online. Quando possibile, lo faremo
                            utilizzando solo dati aggregati e resi anonimi.{' '}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Pubblicizzare e commercializzare i nostri servizi
                          </H3List>
                          <Typography>
                            Elaboriamo i dati relativi al marketing per fornire
                            pubblicità online e comunicazioni di marketing di
                            Oura. Oura non si rivolge alle persone con la
                            pubblicità online in base ai loro dati sanitari
                            contenuti nell'app Oura. Come spiegato in modo più
                            esauriente nella nostra Informativa sui cookie{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                Link alla Informativa sui Cookie
                              </BodyLink>
                            </Link>
                            , utilizziamo i cookie sul nostro sito Web per
                            creare un pubblico mirato per la pubblicità online.
                            Puoi sempre disattivare le comunicazioni di
                            marketing e ti invieremo solo la nostra newsletter,
                            se l’hai richiesto.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Rispettare gli obblighi di legge</H3List>
                          <Typography>
                            In certi casi, dobbiamo elaborare determinati dati
                            quando è richiesto dalla legislazione applicabile.
                            Tali obblighi di legge sono correlati, ad esempio, a
                            requisiti contabili e fiscali, diritti legali o
                            altri scopi legali.{' '}
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>BASE GIURIDICA PER L’ELABORAZIONE</H2>
                      <Typography>
                        La legge sulla protezione dei dati in Europa richiede
                        una "base legale" per la raccolta e la conservazione di
                        informazioni personali da residenti dello Spazio
                        economico europeo. Le nostre basi legali per elaborare i
                        tuoi dati dipendono dagli specifici scopi di
                        elaborazione, tra cui:{' '}
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Contratto:</strong>quando elaboriamo i dati
                          personali per gestire e consegnare i tuoi acquisti, ci
                          basiamo sulla base giuridica di un contratto con
                          l'utente creato quando effettui l'ordine.
                        </ListItem>
                        <ListItem>
                          <strong>Consenso:</strong>trattiamo i tuoi dati
                          personali per finalità di marketing diretto
                          elettronico se hai dato il tuo consenso.{' '}
                        </ListItem>
                        <ListItem>
                          <strong>Interesse legittimo:</strong>quando elaboriamo
                          i tuoi dati personali per scopi di assistenza clienti,
                          marketing e sviluppo dei nostri prodotti, lo facciamo
                          sulla base del nostro legittimo interesse a gestire,
                          mantenere e sviluppare la nostra attività e creare e
                          mantenere relazioni con i clienti. Quando scegliamo di
                          utilizzare i tuoi dati sulla base dei nostri legittimi
                          interessi, valutiamo attentamente i nostri interessi
                          rispetto al tuo diritto alla privacy, secondo la legge
                          applicabile.{' '}
                        </ListItem>
                        <ListItem>
                          <strong>Obbligo legale:</strong>Oura deve elaborare
                          determinate informazioni per ottemperare agli obblighi
                          di legge che possono variare in ciascun Paese. Ad
                          esempio, tali obblighi possono riguardare la tutela
                          dei consumatori o la normativa contabile.
                        </ListItem>
                      </List>
                      <H2>DATI ELABORATI E FONTE DEI DATI</H2>
                      <Typography>
                        Nella maggior parte dei casi, raccogliamo dati personali
                        direttamente da te, se scegli di completare gli ordini
                        nel nostro negozio online o di contattarci per una
                        domanda o un reclamo. Quando visiti il sito Web o il
                        negozio online di Oura, raccogliamo dati analitici su di
                        te tramite il tuo dispositivo e browser tramite cookie e
                        varie altre tecnologie per lo sviluppo di servizi e per
                        scopi pubblicitari.{' '}
                      </Typography>
                      <Typography>
                        Trattiamo le seguenti categorie di dati personali dei
                        visitatori del sito Web e del negozio online:{' '}
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Informazioni di contatto</strong> come nome,
                          indirizzo e-mail e indirizzo{' '}
                        </ListItem>
                        <ListItem>
                          <strong>Informazioni per la consegna</strong> come i
                          tuoi acquisti e il metodo di pagamento scelto{' '}
                        </ListItem>
                        <ListItem>
                          <strong>Informazioni sul dispositivo</strong>come
                          indirizzo IP, ora della visita e dati sulla posizione{' '}
                        </ListItem>
                        <ListItem>
                          <strong>Attività dell'utente</strong> come i modelli
                          di navigazione sul sito e qualsiasi comunicazione che
                          hai con noi.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Residenti in California
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        Residenti in California
                      </Typography>
                      <H2>AVVISO CCPA PER I CONSUMATORI CALIFORNIANI</H2>
                      <Typography>
                        Questo avviso integra le informazioni contenute nella
                        presente Informativa sulla privacy di Oura e delle sue
                        sussidiarie (collettivamente, "noi", "ci" o "nostro") e
                        si applica esclusivamente a visitatori, utenti e altri
                        che risiedono nello Stato della California ("clienti" o
                        "voi") e che accedono al sito Web di Oura o ai servizi
                        forniti da Oura. Adottiamo questo avviso per conformarci
                        al California Consumer Privacy Act del 2018 ("CCPA") e
                        tutti i termini definiti nel CCPA hanno lo stesso
                        significato quando utilizzati in questo avviso.{' '}
                      </Typography>
                      <H2>
                        RACCOLTA, UTILIZZO E CONDIVISIONE DELLE INFORMAZIONI
                      </H2>
                      <Typography>
                        Quando un cliente interagisce con i prodotti e/o servizi
                        di Oura, Oura raccoglie informazioni che identificano,
                        si riferiscono, descrivono, fanno riferimento, sono
                        ragionevolmente in grado di essere associate o
                        potrebbero ragionevolmente essere collegate,
                        direttamente o indirettamente, a un particolare
                        consumatore o dispositivo ("Dati personali").
                      </Typography>
                      <Typography>
                        Le informazioni sulle categorie di informazioni
                        personali che raccogliamo, le finalità per le quali le
                        tue informazioni personali vengono elaborate e qualsiasi
                        condivisione delle tue informazioni personali possono
                        essere trovate nelle sezioni pertinenti di questa
                        informativa sulla privacy di cui sopra:{' '}
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            Utente del dispositivo e dell'applicazione:
                            categorie di informazioni personali raccolte e
                            finalità dell’elaborazione{' '}
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            Visitatore del negozio online e del sito Web:
                            categorie di dati personali raccolti e finalità
                            dell’elaborazione{' '}
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            Condivisione dei dati personali
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        Nei dodici (12) mesi precedenti, non abbiamo venduto
                        Informazioni personali a terzi, inclusi gli aggregatori
                        di dati.{' '}
                      </Typography>
                      <H2>DIRITTI DEI CONSUMATORI DELLA CALIFORNIA</H2>
                      <Typography>
                        Se risiedi in California, ai sensi del CCPA hai
                        determinati diritti:
                      </Typography>
                      <H3>
                        Diritto di conoscere le informazioni personali che
                        raccogliamo e condividiamo
                      </H3>
                      <Typography>
                        Il CCPA ti dà il diritto di richiedere la divulgazione
                        delle informazioni personali che abbiamo raccolto su di
                        te negli ultimi 12 mesi, cosa che faremo dopo aver
                        ricevuto e convalidato la tua richiesta. Una volta
                        ricevuta e confermata la tua richiesta verificabile in
                        qualità di consumatore, ti comunicheremo:{' '}
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          Le categorie di informazioni personali che abbiamo
                          raccolto su di te;
                        </ListItem>
                        <ListItem>
                          Le categorie di informazioni personali che abbiamo
                          divulgato su di te (se presenti);
                        </ListItem>
                        <ListItem>
                          Le categorie di fonti per le informazioni personali
                          che abbiamo raccolto su di te;
                        </ListItem>
                        <ListItem>
                          I nostri scopi aziendali o commerciali per la raccolta
                          o la vendita di tali informazioni personali;
                        </ListItem>
                        <ListItem>
                          Le categorie di terze parti con cui condividiamo tali
                          informazioni personali; e
                        </ListItem>
                        <ListItem>
                          Le specifiche informazioni personali che abbiamo
                          raccolto su di te. Il CCPA ci vieta di:
                        </ListItem>
                      </List>
                      <H3>Diritto di cancellazione</H3>
                      <Typography>
                        Hai il diritto di richiedere la cancellazione delle tue
                        informazioni personali, salvo alcune eccezioni, come
                        laddove vigesse l'obbligo legale di conservare i dati in
                        questione. Dopo aver ricevuto e convalidato la tua
                        richiesta, elimineremo le tue informazioni personali e
                        chiederemo ai nostri fornitori di servizi di eliminare
                        le tue informazioni personali a meno che non si applichi
                        un'eccezione.{' '}
                      </Typography>
                      <H3>
                        Come effettuare richieste di divulgazione, accesso o
                        cancellazione
                      </H3>
                      <Typography>
                        Se risiedi in California, puoi richiedere la
                        divulgazione, l'accesso e/o la cancellazione dei tuoi
                        dati personali come descritto sopra inviandoci una
                        richiesta verificabile in qualità di consumatore nei
                        seguenti modi:{' '}
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          Inviando un’e-mail all'indirizzo{' '}
                          <strong>dataprotection@ouraring.com</strong>,
                          includendo le seguenti informazioni insieme alla tua
                          richiesta: il tuo nome completo, il nome della società
                          (se applicabile), l'indirizzo, l'indirizzo e-mail e un
                          numero di telefono. Potremmo chiederti di fornire
                          ulteriori informazioni, se necessario, per confermare
                          la tua identità. Questo è per motivi di sicurezza e,
                          in alcuni casi, è richiesto dalla legge.{' '}
                        </ListItem>
                      </List>
                      <Typography>
                        Solo tu o una persona registrata presso il Segretario di
                        Stato della California, che tu autorizzi ad agire per
                        tuo conto, può effettuare una richiesta verificabile in
                        qualità di consumatore relativa alle tue informazioni
                        personali. Puoi anche fare una richiesta verificabile in
                        qualità di consumatore per conto di tuo figlio
                        minorenne.{' '}
                      </Typography>
                      <Typography>
                        Hai il diritto di fare una richiesta gratuita fino a due
                        volte in un periodo di 12 mesi. Risponderemo a tutte le
                        richieste convalidate entro 45 giorni dalla ricezione, a
                        meno che non richiediamo un'estensione. Nel caso in cui
                        dovessimo ragionevolmente richiedere un'estensione per
                        rispondere alla tua richiesta, ti informeremo di tale
                        estensione entro il periodo iniziale di 45 giorni.{' '}
                      </Typography>
                      <H3>Non discriminazione</H3>
                      <Typography>
                        Oura non discrimina gli utenti che richiedono di
                        esercitare i propri diritti alla privacy ai sensi del
                        CCPA. A meno che non si applichi un'eccezione, ciò
                        include la nostra promessa di non:{' '}
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>negarti beni o servizi;</ListItem>
                        <ListItem>
                          addebitarti prezzi o tariffe diverse per beni o
                          servizi, inclusa la concessione di sconti o altri
                          vantaggi o l'imposizione di sanzioni;
                        </ListItem>
                        <ListItem>
                          fornire un diverso livello o qualità di beni o
                          servizi; o
                        </ListItem>
                        <ListItem>
                          suggerire di ricevere un prezzo o una tariffa diversa
                          per beni o servizi o un livello o una qualità diversi
                          di beni o servizi.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  CONDIVISIONE E DIVULGAZIONE DEI DATI
                </Typography>
                <H2>Condivisione dei dati personali </H2>
                <Typography>
                  Oura non vende né presta le tue informazioni personali che
                  vengono infatti condivise solo con alcuni fornitori di servizi
                  di fiducia allo scopo di erogare i nostri servizi e gestire la
                  nostra attività. Ogni volta che condividiamo dati con
                  fornitori di servizi di terze parti, richiediamo che
                  utilizzino le tue informazioni solo per gli scopi che abbiamo
                  autorizzato e per i motivi limitati spiegati nella presente
                  Informativa sulla privacy. Inoltre, richiediamo loro di
                  proteggere le tue informazioni personali applicando quanto
                  meno i nostri stessi standard.{' '}
                </Typography>
                <Typography>
                  Come la maggior parte delle aziende, Oura utilizza fornitori
                  di servizi per scopi quali:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    fornire e migliorare la nostra piattaforma di servizi
                    online;
                  </ListItem>
                  <ListItem>memorizzare i dati dei nostri utenti;</ListItem>
                  <ListItem>fornire servizi ai clienti;</ListItem>
                  <ListItem>
                    gestire e organizzare le nostre attività di marketing. Oura
                    condivide i dati sull'utilizzo del sito Web con i partner
                    della propria rete pubblicitaria solo allo scopo di
                    analizzare e ottimizzare il proprio marketing. Oura non
                    condivide i dati dell'app Oura con inserzionisti di terze
                    parti; e{' '}
                  </ListItem>
                  <ListItem>
                    analizzare le informazioni relative all'uso del nostro
                    servizio online per migliorare la qualità del nostro
                    servizio.
                  </ListItem>
                </List>
                <Typography>
                  Oura archivia i dati personali principalmente all'interno
                  dell'area geografica in cui vengono raccolti. Nei casi in cui
                  i dati personali siano elaborati al di fuori dell'area in cui
                  sono stati raccolti, garantiamo sempre che i tuoi dati
                  personali siano protetti con garanzie adeguate in conformità
                  alle leggi sulla privacy applicabili. Utilizziamo inoltre
                  misure di protezione dei dati standard del settore per
                  salvaguardare tutti i trasferimenti internazionali di dati
                  personali attraverso accordi di protezione dei dati con i
                  nostri fornitori di servizi.{' '}
                </Typography>
                <H2>Divulgazione dei dati personali</H2>
                <Typography>
                  Ci riserviamo inoltre il diritto di divulgare informazioni
                  personali in determinate circostanze specifiche, tra cui:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    quando abbiamo il tuo esplicito consenso a farlo;
                  </ListItem>
                  <ListItem>
                    quando è ragionevolmente necessario per i nostri legittimi
                    interessi nella conduzione della nostra attività, ad esempio
                    in caso di fusione, acquisizione o vendita;
                  </ListItem>
                  <ListItem>
                    per proteggere i diritti legali e la proprietà di Oura; e
                  </ListItem>
                  <ListItem>
                    per rispettare la legge o le forze dell'ordine.
                  </ListItem>
                </List>
                <Typography>
                  In tutti gli altri casi, le tue informazioni personali non
                  verranno mai condivise con nessun altro individuo od
                  organizzazione.
                </Typography>
                <H2>SALVAGUARDIA DEI TUOI DATI</H2>
                <Typography>
                  Oura utilizza salvaguardie tecniche e organizzative per
                  proteggere e mantenere i tuoi dati al sicuro. Ove appropriato,
                  queste garanzie includono misure come l'anonimizzazione o la
                  pseudonimizzazione dei dati personali, un rigoroso controllo
                  dell'accesso e l'uso della crittografia per proteggere i dati
                  che elaboriamo.
                </Typography>
                <Typography>
                  Garantiamo inoltre che il nostro personale riceva una
                  formazione adeguata per garantire che i dati personali vengano
                  elaborati solo in conformità alle nostre politiche interne,
                  coerenti con i nostri obblighi ai sensi della legge
                  applicabile. Limitiamo inoltre l'accesso ai tuoi dati
                  personali sensibili al personale a cui è stato specificamente
                  concesso tale accesso.
                </Typography>
                <Typography>
                  I servizi online che forniamo, come il negozio online Oura e
                  Oura Web, proteggono i tuoi dati personali in transito
                  utilizzando la crittografia e altre misure di sicurezza.
                  Inoltre, testiamo regolarmente il nostro servizio, i nostri
                  sistemi e altre risorse per individuare possibili
                  vulnerabilità della sicurezza.
                </Typography>
                <Typography>
                  Aggiorniamo regolarmente l'app Oura e il firmware dell'anello.
                  Ti consigliamo di assicurarti di avere sempre le ultime
                  versioni di app e firmware installate per massimizzare la
                  protezione dei tuoi dati.
                </Typography>
                <H2>CONSERVAZIONE DEI DATI</H2>
                <Typography>
                  Il periodo di conservazione dei tuoi dati personali dipende
                  generalmente dalla durata del ciclo di vita del tuo account
                  Oura. I tuoi dati personali saranno cancellati quando non
                  saranno più necessari per lo scopo per cui erano stati
                  originariamente raccolti, a meno che non venga imposto un
                  obbligo legale di conservare i dati per un periodo di tempo
                  più lungo. Ad esempio, i tuoi dati di misurazione relativi a
                  sonno, prontezza e attività vengono archiviati solo finché il
                  tuo account Oura è attivo.
                </Typography>
                <Typography>
                  Oura ha anche l'obbligo legale di conservare determinati dati
                  personali per un periodo di tempo specifico, ad esempio a fini
                  fiscali. Questi periodi di conservazione richiesti possono
                  dipendere da, ad esempio, requisiti contabili e fiscali,
                  rivendicazioni legali o qualsiasi altro scopo legale. I
                  periodi di conservazione obbligatori per i dati personali
                  variano in base alla legge applicabile.
                </Typography>
                <Typography>
                  Puoi richiedere la cancellazione del tuo account Oura
                  contattando dataprotection@ouraring.com.{' '}
                </Typography>
                <H2>UTILIZZO DEI COOKIE</H2>
                <Typography>
                  Utilizziamo cookie e varie altre tecnologie per raccogliere e
                  archiviare analisi e altre informazioni quando i clienti
                  utilizzano il nostro sito, nonché per scopi pubblicitari e di
                  personalizzazione. I cookie che utilizziamo includono sia
                  cookie di prima parte sia di terze parti.
                </Typography>
                <Typography>
                  I cookie sono piccoli file di testo inviati e salvati sul tuo
                  dispositivo che ci consentono di identificare i visitatori dei
                  nostri siti Web e facilitare l'utilizzo del nostro sito nonché
                  di creare informazioni aggregate sui nostri visitatori. Questo
                  ci aiuta a migliorare il nostro servizio e servire meglio i
                  nostri clienti e non danneggerà il tuo dispositivo o file.
                  Utilizziamo i cookie per personalizzare il nostro sito e le
                  informazioni che forniamo in base agli interessi individuali
                  dei nostri clienti. I cookie vengono utilizzati anche per
                  tracciare le tue abitudini di navigazione e per indirizzare e
                  ottimizzare la pubblicità, sia sul nostro sito sia su altri
                  siti che potresti visitare. Utilizziamo i cookie anche per
                  integrare i nostri account di social media sul nostro sito
                  Web.
                </Typography>
                <Typography>
                  Si prega di consultare la nostra Informativa sui Cookie{' '}
                  <Link href="/cookie-policy">
                    <BodyLink color="inherit">
                      Link alla Informativa sui Cookie
                    </BodyLink>
                  </Link>{' '}
                  per ulteriori informazioni sull'uso dei cookie da parte di
                  Oura e su come impostare le proprie preferenze sui cookie.{' '}
                </Typography>
                <H2>
                  I TUOI DIRITTI COME INTERESSATO AL TRATTAMENTO DEI DATI (DATA
                  SUBJECT)
                </H2>
                <Typography>
                  Ogni volta che Oura tratta i tuoi dati, hai determinati
                  diritti che ti consentono di controllare come questi dati
                  personali vengono elaborati. Questa sezione fornisce
                  informazioni su ciascuno di questi diritti. Se desideri
                  esercitare i tuoi diritti in qualità di interessato, contatta{' '}
                  <strong>dataprotection@ouraring.com</strong> con la tua
                  richiesta di farlo.
                </Typography>
                <H3>Diritto di accesso ai dati </H3>
                <Typography>
                  Hai il diritto di sapere quali dei tuoi dati personali vengono
                  elaborati. Puoi contattarci per richiedere l'accesso ai dati
                  personali che abbiamo raccolto su di te e confermeremo se
                  stiamo elaborando i tuoi dati; inoltre ti forniremo
                  informazioni sui dati personali che abbiamo raccolto ed
                  elaborato.{' '}
                </Typography>
                <Typography>
                  Utilizzando l'app Oura, puoi accedere facilmente ai tuoi dati
                  relativi a sonno, prontezza e attività che elaboriamo. Puoi
                  anche accedere ai tuoi dati tramite Oura Web all'indirizzo{' '}
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
                <H3>Diritto alla cancellazione</H3>
                <Typography>
                  Hai il diritto di richiedere la cancellazione dei tuoi dati
                  personali in determinate circostanze. Rispetteremo tali
                  richieste a meno che non abbiamo una base legale valida o un
                  obbligo legale di conservare tali dati.{' '}
                </Typography>
                <H3>Diritto di rettifica (di dati inesatti) </H3>
                <Typography>
                  Hai il diritto di richiedere la correzione di eventuali tuoi
                  dati personali errati o incompleti che abbiamo archiviato.{' '}
                </Typography>
                <Typography>
                  Puoi correggere e aggiornare alcune delle tue informazioni di
                  base tramite l'app Oura e sul sito Web di Oura.
                </Typography>
                <H3>Diritto alla portabilità dei dati </H3>
                <Typography>
                  Hai il diritto di richiedere la ricezione dei dati personali
                  che ci hai fornito in un formato strutturato e di uso comune.
                  Il diritto alla portabilità dei dati si applica solo quando
                  elaboriamo i tuoi dati personali per determinati motivi, ad
                  esempio in base al contratto o al tuo consenso.
                </Typography>
                <Typography>
                  Oura Web ti offre la possibilità di esportare i tuoi dati.
                </Typography>
                <H3>Diritto di opposizione all’elaborazione dei dati </H3>
                <Typography>
                  In determinate circostanze, hai il diritto di opporti
                  all’elaborazione dei tuoi dati personali. Se, dopo aver
                  ricevuto e verificato la tua obiezione, non abbiamo motivi
                  legittimi per continuare a elaborare tali dati personali,
                  smetteremo di farlo. Hai anche il diritto di opporti in
                  qualsiasi momento all’elaborazione dei tuoi dati personali per
                  finalità di marketing diretto.
                </Typography>
                <H3>Diritto di limitare l'elaborazione </H3>
                <Typography>
                  In determinate circostanze hai il diritto di richiedere la
                  limitazione dell’elaborazione dei tuoi dati personali. Ad
                  esempio, se ne contesti l'accuratezza, puoi richiedere di
                  limitare l'elaborazione dei tuoi dati fino a quando Oura non
                  ne avrà verificata l'accuratezza.
                </Typography>
                <H3>Diritto di revocare il consenso</H3>
                <Typography>
                  Se abbiamo richiesto il tuo consenso per elaborare i tuoi dati
                  personali, hai il diritto di revocarlo in qualsiasi momento.
                  Va notato, tuttavia, che la revoca del tuo consenso può
                  comportare problemi o restrizioni alla tua capacità di
                  utilizzare pienamente i servizi Oura.
                </Typography>
                <Typography>
                  Puoi annullare l'iscrizione alla ricezione della nostra
                  newsletter e di altre e-mail di marketing in qualsiasi momento
                  utilizzando il link "Annulla iscrizione" che trovi nelle
                  e-mail che ricevi da noi. * * *
                </Typography>
                <Typography>
                  Oura si impegna a risolvere i tuoi dubbi relativi alla
                  privacy. Se hai contattato Oura in merito al tuo problema e
                  non trovi del tutto soddisfacente la nostra risposta, puoi
                  contattare l'autorità di vigilanza locale in merito al tuo
                  problema come da legge applicabile. Prima di contattare le
                  autorità, tuttavia, ti invitiamo a contattarci all'indirizzo{' '}
                  <strong>dataprotection@ouraring.com</strong> per darci
                  l’opportunità di risolvere il tuo problema. .{' '}
                </Typography>
                <Typography>
                  Ti preghiamo di leggere la Informativa sulla Privacy CCPA di
                  Oura se risiedi nello stato della California per saperne di
                  più sui tuoi diritti ai sensi della legge della California.
                </Typography>
                <H2>INFORMAZIONI DI CONTATTO DEL CONTROLLER</H2>
                <Typography>
                  Ouraring Inc. è il controller dei dati per i dati personali
                  dell’utente elaborati per scopi di marketing. Il controller
                  dei dati personali processati per tutti gli altri scopi di
                  elaborazione è Oura Health Oy. Qui di seguito, trovi le
                  informazioni di contatto:
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  Indirizzo: Elektroniikkatie 10, 90590 Oulu Finlandia
                </Typography>
                <Typography>
                  Responsabile per la protezione dei dati personali:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  Indirizzo: 60 Francisco St, San Francisco, CA, 94133-2104
                  Stati Uniti
                </Typography>
                <Typography>
                  Responsabile per la protezione dei dati personali:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>MODIFICHE ALLA PRESENTE INFORMATIVA SULLA PRIVACY</H2>
              <Typography>
                La presente Informativa sulla privacy è in vigore dal{' '}
                <strong>15 settembre 2021</strong>. Ci riserviamo il diritto di
                aggiornare la presente Politica a nostra esclusiva discrezione,
                ma in tal caso, ti informeremo di eventuali modifiche
                sostanziali avvisandoti sul sito Web o inviandoti un'e-mail o
                una notifica push. Se continui a utilizzare i servizi Oura dopo
                una modifica significa che accetti tale modifica.
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
