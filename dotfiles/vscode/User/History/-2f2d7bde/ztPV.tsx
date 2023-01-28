import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Link from 'next/link';
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
import pageStyles from '../PrivacyPolicyOuraHealth.module.scss';

const PrivacyPolicyOuraHealth = () => {
  const accordionWrapper = useRef(null);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const handleAccordionClick = (e: any, index: number) => {
    setActiveAccordionIndex(index);
    e.preventDefault();
  };

  const handleAccordionChange = (index: number) => {
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
      <div className="bg-white" lang="de">
        <Header bordered />
        <PageContainer name="privacy-policy-oura-health-de" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Oura Datenschutzerklärung
              </Typography>
              <H2>ÜBER DIESE DATENSCHUTZERKLÄRUNG</H2>
              <Typography>
                Der Schutz Ihrer personenbezogenen Daten wird von Oura sehr
                ernst genommen. Diese Datenschutzerklärung gilt für die
                Verarbeitung personenbezogener Daten durch die Oura Health Oy
                und Ouraring Inc. (im Folgenden „Oura“).
              </Typography>
              <Typography>
                Unsere Produkte, wie der Oura-Ring, ermöglichen es, bestimmte
                Entscheidungen in Bezug auf den Lebensstil sowie die
                Schlafqualität nachzuverfolgen. Uns ist bewusst, dass dies sehr
                persönliche Daten sind, weshalb uns der Schutz Ihrer
                personenbezogenen Daten ein äußerst wichtiges Anliegen ist.
                Bitte nehmen Sie sich etwas Zeit, diese Erklärung aufmerksam zu
                lesen.
              </Typography>
              <H2>WARUM VERARBEITET OURA IHRE PERSONENBEZOGENEN DATEN?</H2>
              <Typography>
                Unter den einzelnen Abschnittsüberschriften finden Sie
                Erläuterungen der Kategorien personenbezogener Daten, die wir
                erheben und verarbeiten, sowie die Gründe, aus denen wir dies
                tun, z. B. um Ihnen Dienste bereitzustellen, wenn Sie unsere
                Website besuchen. Des Weiteren dienen sie dazu, Ihnen Einkäufe
                auf unserer Website sowie die Verwendung Ihres Rings und der App
                zu ermöglichen. Außerdem erhalten Sie Informationen zu unserer
                Rechtsgrundlage für die Verarbeitung Ihrer Daten und zu unseren
                Datenquellen.
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
                      Benutzer des Geräts und der App
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Benutzer des Geräts und der App
                      </Typography>
                      <H2>VERARBEITUNGSZWECKE</H2>
                      <Typography>
                        Oura erhebt und verarbeitet die personenbezogenen Daten
                        von Geräte- und Appbenutzern („Benutzer“) nur zu den
                        folgenden Zwecken:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Zur Bereitstellung der Oura-Dienste</H3List>
                          <Typography>
                            Wir verarbeiten personenbezogene Daten, um
                            Oura-Dienste und App-Funktionen – wie die täglichen
                            Rückmeldungen zu Ihrer Tagesform, Ihrem Schlaf und
                            Ihrer Aktivität – bereitzustellen.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Zur Erbringung des Kundendienstes</H3List>
                          <Typography>
                            Wir verarbeiten personenbezogene Daten zum Zweck der
                            Erbringung des Kundendienstes und zur Durchführung
                            unserer Kundenkommunikation. Wenn Sie sich mit
                            Fragen zu Ihren App-Daten an unseren Kundendienst
                            wenden, können wir die bereitgestellten
                            Informationen zur Beantwortung Ihrer Fragen und zur
                            Lösung etwaiger Probleme verwenden.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Entwicklung unserer Produkte und
                            Dienstleistungen
                          </H3List>
                          <Typography>
                            Wir verarbeiten Daten über Ihre Nutzung des
                            Oura-Rings und der Oura-Plattform, um unsere Dienste
                            und Funktionen – z. B. in der Oura-App – zu
                            verbessern. Wenn möglich, tun wir dies nur mit
                            pseudonymisierten, aggregierten Daten, die keinen
                            Personen zuzuordnen sind.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Vermarktung unserer Produkte und
                            Dienstleistungen
                          </H3List>
                          <Typography>
                            Wir verarbeiten marketingbezogene Daten, um
                            Onlinewerbung zu betreiben und
                            Oura-Marketingmitteilungen zu übermitteln. Wie in
                            unserer{' '}
                            <Link href="/privacy-policy?lang=de">
                              <BodyLink color="inherit">
                                Cookies-Richtlinie
                              </BodyLink>
                            </Link>
                            näher erläutert, verwenden wir Cookies auf unserer
                            Website zum Beispiel, um Zielgruppen für
                            Online-Werbung zu identifizieren. Sie können den
                            Erhalt von Marketingmitteilungen jederzeit abwählen,
                            und wir senden Ihnen unseren Newsletter nur, wenn
                            Sie ihn angefordert haben.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Ermöglichung der Einbindung von Drittanbietern
                          </H3List>
                          <Typography>
                            Wir verarbeiten Daten, um Benutzern, die dies
                            wünschen, die Weitergabe ihrer Daten an bestimmte
                            Dritte zu ermöglichen, z. B. an Forschungspartner.
                            Dies geschieht nur mit Ihrer ausdrücklichen
                            Zustimmung.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Erfüllung gesetzlicher Verpflichtungen
                          </H3List>
                          <Typography>
                            In bestimmten Fällen müssen wir bestimmte Daten
                            verarbeiten, sofern dies durch einschlägige Gesetze
                            und Vorschriften vorgeschrieben ist. Solche
                            gesetzlichen Verpflichtungen ergeben sich z. B. aus
                            buchhalterischen und steuerlichen Anforderungen,
                            Rechtsansprüchen oder anderen gesetzlichen Vorgaben.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>RECHTSGRUNDLAGE FÜR DIE VERARBEITUNG</H2>
                      <Typography>
                        Das europäische Datenschutzrecht erfordert die
                        Rechtmäßigkeit der Erfassung und Speicherung
                        personenbezogener Daten von im Europäischen
                        Wirtschaftsraum ansässigen Personen. Die Rechtsgrundlage
                        unserer Verarbeitung Ihrer Daten bildet je nach dem
                        Verarbeitungszweck Folgendes:
                      </Typography>
                      <Typography>
                        <strong>Vertrag:</strong> Wenn wir personenbezogene
                        Daten zum Zweck der Bereitstellung von Oura-Diensten
                        verarbeiten, tun wir dies auf der Grundlage eines
                        Nutzungsvertrags, der zustande kommt, wenn Sie Ihr Konto
                        erstellen und unsere Geschäftsbedingungen akzeptieren.
                      </Typography>
                      <Typography>
                        <strong>Einwilligung:</strong> Wir verarbeiten Ihre
                        gesundheitsbezogenen Daten nur mit Ihrer Einwilligung.
                        In manchen Fällen geben Sie uns Ihre Einwilligung zur
                        Verarbeitung Ihrer Daten durch bestimmte Handlungen, wie
                        das Einfügen von Gesundheitsdaten in Ihre Notizen oder
                        durch das Hinzufügen von gesundheitsbezogenen Tags in
                        der Oura-App.
                      </Typography>
                      <Typography>
                        <strong>Berechtigtes Interesse:</strong> Wir verarbeiten
                        Ihre personenbezogenen Daten auf der Grundlage unserer
                        berechtigten Interessen, wenn wir sie zum Zwecke der
                        Vermarktung unserer Produkte und Dienstleistungen, der
                        Erbringung unseres Kundendienstes und der Verbesserung
                        unserer Produkte und Dienstleistungen verarbeiten. Bei
                        der Entscheidung, Ihre Daten auf der Grundlage unserer
                        berechtigten Interessen zu verwenden, wägen wir unsere
                        eigenen Interessen sorgfältig gegen Ihren
                        Datenschutzanspruch gemäß geltendem Recht ab.
                      </Typography>
                      <Typography>
                        <strong>Rechtliche Verpflichtung:</strong> Oura muss
                        bestimmte Daten verarbeiten, um gesetzlichen
                        Verpflichtungen nachzukommen, die von Land zu Land
                        unterschiedlich sein können. Solche Verpflichtungen
                        können zum Beispiel im Zusammenhang mit
                        Verbraucherschutz- oder Steuergesetzen stehen.
                      </Typography>
                      <H2>VERARBEITETE DATEN UND DATENQUELLE</H2>
                      <Typography>
                        In den meisten Fällen erhebt Oura personenbezogene Daten
                        direkt von Ihnen, z. B. wenn Sie sich für ein Konto
                        registrieren oder Ihren Oura-Ring zur Erfassung von
                        Messdaten verwenden. Wir dürfen auch Daten verarbeiten,
                        die sich aus den Informationen ableiten, die Sie uns zur
                        Verfügung stellen.
                      </Typography>
                      <Typography>
                        Oura verarbeitet die folgenden Kategorien
                        personenbezogener Daten über Geräte- und
                        Anwendungsbenutzer:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Kontaktinformationen</strong> wie
                          E-Mail-Adresse oder Anschrift
                        </ListItem>
                        <ListItem>
                          <strong>Benutzerinformationen</strong> wie Geschlecht,
                          Größe und Gewicht, Benutzer-ID sowie weitere
                          Informationen über Sie oder Ihr Konto, die Sie uns
                          bereitstellen
                        </ListItem>
                        <ListItem>
                          <strong>Geräteinformationen</strong> wie IP-Adresse
                          und Standortdaten
                        </ListItem>
                        <ListItem>
                          <strong>
                            Benutzeraktivitäts- und Kontextinformationen
                          </strong>{' '}
                          wie Aktivitäten, Notizen und Tags
                        </ListItem>
                        <ListItem>
                          <strong>Messdaten</strong> wie z. B. Herzfrequenz-,
                          Bewegungs- und Temperaturdaten
                        </ListItem>
                        <ListItem>
                          <strong>
                            Berechnete Benutzer-, Schlaf- und Aktivitätsdaten
                          </strong>
                          , wie z. B. Schlafphasen (Tief-, Leicht-, REM-Schlaf
                          und Wachzeit), Aktivitätsniveau über den Tag verteilt,
                          Tagesformbewertung, Body-Mass-Index (berechnet auf
                          Basis von Größe und Gewicht).
                        </ListItem>
                      </List>
                      <Typography>
                        Bitte beachten Sie, dass einige der von uns
                        verarbeiteten personenbezogenen Daten, einschließlich
                        aller Daten über Ihre Gesundheit, als besondere oder
                        sensible personenbezogene Daten gelten. Nach geltendem
                        Recht werden solche Daten nur verarbeitet, wenn Sie Ihre
                        Einwilligung dazu gegeben haben. Wenn Sie auf einen der
                        standortbasierten Dienste von Oura zugreifen oder diesen
                        nutzen, z. B. durch Aktivierung der GPS-basierten
                        Aktivitätsverfolgung über Ihre App, kann Oura den
                        ungefähren oder genauen Standort Ihres Geräts verwenden,
                        während der Dienst aktiv ist. Diese Daten können über
                        die Netzwerk-ID des Dienstanbieters Ihres Geräts sowie
                        GPS- und/oder WLAN-Daten ermittelt werden. Oura
                        verarbeitet solche Standortdaten nicht, ohne zuvor Ihre
                        Einwilligung eingeholt zu haben. Sie können eine solche
                        Verarbeitung von Standortdaten jederzeit über die
                        Berechtigungseinstellungen für die Standortabfrage Ihres
                        Geräts deaktivieren.
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Kunden des Onlineshops und Besucher der Website
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Kunden des Onlineshops und Besucher der Website
                      </Typography>
                      <H2>VERARBEITUNGSZWECKE</H2>
                      <Typography>
                        Wenn Sie die Website von Oura besuchen oder Bestellungen
                        im Onlineshop von Oura aufgeben, verarbeiten wir
                        personenbezogene Daten für die folgenden Zwecke:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>
                            Zur Bearbeitung und Auslieferung Ihrer Bestellungen
                          </H3List>
                          <Typography>
                            Wir verarbeiten personenbezogene Daten, um Ihre
                            Einkäufe zu bearbeiten, abzuwickeln und auszuliefern
                            und um Ihren Einkauf zu erleichtern.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Zur Erbringung des Kundendienstes</H3List>
                          <Typography>
                            Wir verarbeiten personenbezogene Daten zum Zweck der
                            Erbringung des Kundendienstes und zur Kommunikation
                            mit unseren Kunden. Wenn Sie sich mit Fragen zum
                            Oura-Ring oder unseren Diensten an unseren
                            Kundendienst wenden, verwenden wir die
                            bereitgestellten Informationen zur Beantwortung
                            Ihrer Fragen und zur Lösung etwaiger Probleme.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Weiterentwicklung und Verbesserung unserer
                            Dienste
                          </H3List>
                          <Typography>
                            Wir verarbeiten Informationen über die Nutzung
                            unserer Website durch Besucher, um die Qualität
                            unserer Onlinedienste zu verbessern. Dies kann die
                            Verwendung von Webstatistiken und Trends auf unserer
                            Website und in unserem Onlineshop beinhalten. Nach
                            Möglichkeit tun wir dies nur mit aggregierten und
                            anonymisierten Daten.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Bewerbung und Vermarktung unserer Dienste
                          </H3List>
                          <Typography>
                            Wir verarbeiten Marketingdaten, um Onlinewerbung zu
                            betreiben und Oura-Marketingmitteilungen zu
                            übermitteln. Oura spricht Personen nicht durch
                            Onlinewerbung an, die auf deren Gesundheitsdaten in
                            der Oura-App basiert. Wie in unserer{' '}
                            <Link href="/cookie-policy?lang=de">
                              <BodyLink color="inherit">
                                Cookies-Richtlinie
                              </BodyLink>
                            </Link>
                            näher erläutert, verwenden wir Cookies auf unserer
                            Website, um Zielgruppen für Onlinewerbung zu
                            identifizieren. Sie können den Erhalt von
                            Marketingmitteilungen jederzeit abwählen, und wir
                            senden Ihnen unseren Newsletter nur, wenn Sie ihn
                            angefordert haben.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Zur Erfüllung gesetzlicher Verpflichtungen
                          </H3List>
                          <Typography>
                            In bestimmten Fällen müssen wir bestimmte Daten
                            verarbeiten, wenn dies durch die einschlägige
                            Gesetzgebung vorgeschrieben ist. Solche gesetzlichen
                            Verpflichtungen ergeben sich z. B. aus
                            buchhalterischen und steuerlichen Anforderungen,
                            Rechtsansprüchen oder anderen gesetzlichen Vorgaben.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>RECHTSGRUNDLAGE FÜR DIE VERARBEITUNG</H2>
                      <Typography>
                        Das europäische Datenschutzrecht erfordert die
                        Rechtmäßigkeit der Erfassung und Speicherung
                        personenbezogener Daten von im Europäischen
                        Wirtschaftsraum ansässigen Personen. Unsere
                        Rechtsgrundlagen für die Verarbeitung Ihrer Daten hängen
                        von den jeweiligen Verarbeitungszwecken ab, darunter:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Vertrag:</strong> Bei der Verarbeitung
                          personenbezogener Daten zur Abwicklung Ihrer
                          Bestellungen und Lieferung gekaufter Produkte stützen
                          wir uns auf die Rechtsgrundlage des Benutzervertrags,
                          der mit Ihrer Bestellung zustande kommt.
                        </ListItem>
                        <ListItem>
                          <strong>Einwilligung:</strong> Wir verarbeiten Ihre
                          personenbezogenen Daten zu Zwecken des elektronischen
                          Direktmarketings, sofern Sie Ihre Einwilligung dazu
                          gegeben haben.
                        </ListItem>
                        <ListItem>
                          <strong>Berechtigtes Interesse:</strong> Wenn wir Ihre
                          personenbezogenen Daten für Zwecke des Kundendienstes,
                          des Marketings und der Weiterentwicklung unserer
                          Produkte verarbeiten, tun wir dies auf der Grundlage
                          unseres berechtigten Interesses, unser Geschäft zu
                          betreiben, fortzuführen und auszubauen sowie
                          Kundenbeziehungen aufzubauen und zu pflegen. Bei der
                          Entscheidung, Ihre Daten auf der Grundlage unserer
                          berechtigten Interessen zu verwenden, wägen wir unsere
                          eigenen Interessen sorgfältig gegen Ihren
                          Datenschutzanspruch gemäß den geltenden Gesetzen ab.
                        </ListItem>
                        <ListItem>
                          <strong>Rechtliche Verpflichtung:</strong> Oura muss
                          bestimmte Daten verarbeiten, um gesetzlichen
                          Verpflichtungen nachzukommen, die von Land zu Land
                          unterschiedlich sein können. Solche Verpflichtungen
                          können zum Beispiel im Zusammenhang mit
                          Verbraucherschutz- oder Buchführungsgesetzen stehen.
                        </ListItem>
                      </List>
                      <H2>VERARBEITETE DATEN UND DATENQUELLE</H2>
                      <Typography>
                        In den meisten Fällen erheben wir personenbezogene Daten
                        direkt von Ihnen, wenn Sie Bestellungen in unserem
                        Online-Shop aufgeben oder uns eine Frage oder
                        Reklamation übermitteln. Wenn Sie die Website oder den
                        Onlineshop von Oura besuchen, erheben wir zum Zweck der
                        Weiterentwicklung von Diensten und zu Werbezwecken
                        mithilfe von Cookies und verschiedenen anderen
                        Technologien über Ihr Gerät und Ihren Browser
                        analytische Daten über Sie.
                      </Typography>
                      <Typography>
                        Wir verarbeiten die folgenden Kategorien
                        personenbezogener Daten über die Besucher der Website
                        und des Onlineshops:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Kontaktinformationen</strong> wie z. B. Name,
                          E-Mail-Adresse und Anschrift
                        </ListItem>
                        <ListItem>
                          <strong>Lieferangaben</strong> wie z. B. die von Ihnen
                          gekauften Produkte und die gewählte Zahlungsmethode
                        </ListItem>
                        <ListItem>
                          <strong>Geräteinformationen</strong> wie IP-Adresse,
                          Zeitpunkt des Besuchs und Standortdaten
                        </ListItem>
                        <ListItem>
                          <strong>Benutzeraktivität</strong> wie z. B. Muster im
                          Surfverhalten auf der Website und etwaige
                          Kommunikationen zwischen Ihnen und uns
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      In Kalifornien wohnhafte Personen
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        In Kalifornien wohnhafte Personen
                      </Typography>
                      <H2>CCPA-HINWEIS FÜR KALIFORNISCHE VERBRAUCHER*INNEN</H2>
                      <Typography>
                        Dieser Hinweis ergänzt die Informationen in dieser
                        Datenschutzerklärung von Oura und seinen
                        Tochtergesellschaften (zusammenfassend „wir“, „uns“ oder
                        „unser*“) und gilt ausschließlich für alle Besucher,
                        Benutzer und anderen Personen, die im US-Bundesstaat
                        Kalifornien ansässig sind („Kunden“ oder „Sie“) und die
                        auf die Website von Oura oder die von Oura
                        bereitgestellten Dienste zugreifen. Wir entsprechen mit
                        diesem Hinweis dem California Consumer Privacy Act
                        („CCPA“) aus dem Jahr 2018. Alle im CCPA definierten
                        Begriffe haben die gleiche Bedeutung, wenn sie in diesem
                        Hinweis verwendet werden.
                      </Typography>
                      <H2>
                        ERHEBUNG, VERWENDUNG UND WEITERGABE VON INFORMATIONEN
                      </H2>
                      <Typography>
                        Wenn ein Kunde/eine Kundin mit den Produkten und/oder
                        Diensten von Oura interagiert, erhebt Oura Informationen
                        („personenbezogene Daten“), die eine/n bestimmte/n
                        Verbraucher/in oder ein bestimmtes Gerät identifizieren,
                        sich darauf beziehen, die Person oder das Gerät
                        beschreiben, darauf verweisen, nach vernünftigem
                        Ermessen damit in Verbindung gebracht oder der Person
                        oder dem Gerät direkt oder indirekt zugeordnet werden
                        könnten.
                      </Typography>
                      <Typography>
                        Informationen über die Kategorien personenbezogener
                        Daten, die wir erheben, die Zwecke, für die Ihre
                        personenbezogenen Daten verarbeitet werden, und die
                        etwaige Weitergabe Ihrer personenbezogenen Daten finden
                        Sie in den entsprechenden Abschnitten dieser
                        Datenschutzerklärung weiter oben:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            Geräte- und Anwendungsbenutzer: Kategorien der
                            erhobenen personenbezogenen Daten und
                            Verarbeitungszwecke
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            Onlineshop- und Websitebesucher: Kategorien der
                            erhobenen personenbezogenen Daten und
                            Verarbeitungszwecke
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            Weitergabe personenbezogener Daten
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        In den vorangegangenen zwölf (12) Monaten haben wir
                        keine personenbezogenen Daten an Dritte, einschließlich
                        Datenaggregatoren, verkauft.
                      </Typography>
                      <H2>VERBRAUCHERRECHTE IN KALIFORNIEN</H2>
                      <Typography>
                        Wenn Sie in Kalifornien ansässig sind, haben Sie gemäß
                        dem CCPA bestimmte Rechte:
                      </Typography>
                      <H3>
                        Recht auf Auskunft über die von uns erhobenen und
                        weitergegebenen personenbezogenen Daten
                      </H3>
                      <Typography>
                        Der CCPA gibt Ihnen das Recht, von uns die Offenlegung
                        der personenbezogenen Daten zu verlangen, die wir in den
                        letzten 12 Monaten über Sie erhoben haben. Dies tun wir,
                        nachdem wir Ihre Anfrage erhalten und geprüft haben.
                        Nach Eingang und positiver Prüfung Ihrer
                        Verbraucheranfrage teilen wir Ihnen die folgenden
                        Informationen mit:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          Die Kategorien personenbezogener Daten, die wir über
                          Sie erhoben haben
                        </ListItem>
                        <ListItem>
                          Die Kategorien Ihrer personenbezogenen Daten, die wir
                          offengelegt haben (sofern zutreffend)
                        </ListItem>
                        <ListItem>
                          Die Kategorien der Quellen der über Sie erhobenen
                          personenbezogenen Daten
                        </ListItem>
                        <ListItem>
                          Unsere geschäftlichen oder kommerziellen Zwecke für
                          die Erhebung oder den Verkauf dieser personenbezogenen
                          Daten
                        </ListItem>
                        <ListItem>
                          Die Kategorien von Drittparteien, an die wir diese
                          personenbezogenen Daten weitergeben haben
                        </ListItem>
                        <ListItem>
                          Die konkreten personenbezogenen Daten, die wir über
                          Sie erhoben haben Bitte beachten Sie, dass der CCPA
                          uns untersagt,
                        </ListItem>
                      </List>
                      <H3>Recht auf Löschung</H3>
                      <Typography>
                        Sie haben das Recht, die Löschung Ihrer
                        personenbezogenen Daten zu beantragen. Allerdings gelten
                        bestimmte Ausnahmen, beispielsweise, wenn wir eine
                        gesetzlich verankerte Verpflichtung zur Speicherung der
                        fraglichen Daten haben. Nachdem wir Ihre Anfrage
                        erhalten und geprüft haben, löschen wir Ihre
                        personenbezogenen Daten (sofern keine Ausnahme gilt) und
                        weisen unsere Dienstleister an, Ihre personenbezogenen
                        Daten ebenfalls zu löschen.
                      </Typography>
                      <H3>
                        Wie Sie die Offenlegung, die Auskunft oder die Löschung
                        beantragen
                      </H3>
                      <Typography>
                        Wenn Sie in Kalifornien ansässig sind, können Sie die
                        Offenlegung, die Auskunft über und/oder die Löschung
                        Ihrer personenbezogenen Daten wie oben beschrieben
                        beantragen, indem Sie uns eine überprüfbare
                        Verbraucheranfrage senden. Dazu können Sie:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          eine E-Mail an{' '}
                          <strong>dataprotection@ouraring.com</strong> senden,
                          die folgende Informationen zusammen mit Ihrer Anfrage
                          enthält: Ihren vollständigen Namen, Firmennamen
                          (sofern zutreffend), Adresse, E-Mail-Adresse und eine
                          Telefonnummer. Wir bitten Sie ggf. um zusätzliche
                          Informationen, wenn dies zur Bestätigung Ihrer
                          Identität erforderlich ist. Dies dient der Sicherheit
                          und ist in einigen Fällen gesetzlich vorgeschrieben.
                        </ListItem>
                      </List>
                      <Typography>
                        Nur Sie oder eine beim California Secretary of State
                        registrierte Person, die Sie bevollmächtigen, in Ihrem
                        Namen zu handeln, können/kann eine überprüfbare
                        Verbraucheranfrage in Bezug auf Ihre persönlichen Daten
                        stellen. Sie können auch im Namen Ihres minderjährigen
                        Kindes eine überprüfbare Verbraucheranfrage stellen.
                      </Typography>
                      <Typography>
                        Sie haben das Recht, innerhalb eines Zeitraums von 12
                        Monaten bis zu zweimal eine kostenlose Anfrage zu
                        stellen. Wir werden auf alle bestätigten Anfragen
                        innerhalb von 45 Tagen nach Erhalt Ihrer Anfrage
                        antworten, es sei denn, wir bitten um eine
                        Fristverlängerung. Falls wir eine Verlängerung
                        benötigen, um Ihre Anfrage zu bearbeiten, werden wir Sie
                        innerhalb der ersten 45-Tage-Frist über eine solche
                        Fristverlängerung informieren.
                      </Typography>
                      <H3>Nichtdiskriminierung</H3>
                      <Typography>
                        Oura diskriminiert keine Benutzer, die ihre
                        Datenschutzrechte gemäß dem CCPA ausüben. Sofern keine
                        Ausnahme gilt, schließt dies unser Versprechen ein,
                        Folgendes nicht zu tun:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          Ihnen Waren oder Dienstleistungen zu verweigern;
                        </ListItem>
                        <ListItem>
                          Ihnen abweichende Preise oder Tarife für Waren oder
                          Dienstleistungen zu berechnen, einschließlich der
                          Nichtgewährung von Rabatten oder anderen Vorteilen
                          oder der Anwendung von Aufschlägen;
                        </ListItem>
                        <ListItem>
                          Ihnen einen anderen Umfang oder eine andere Qualität
                          von Waren oder Dienstleistungen zu bieten oder
                        </ListItem>
                        <ListItem>
                          zu behaupten, dass Sie einen anderen Preis oder Tarif
                          für Waren oder Dienstleistungen zahlen oder einen
                          anderen Umfang oder eine andere Qualität von Waren
                          oder Dienstleistungen erhalten.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  WEITERGABE UND OFFENLEGUNG VON DATEN
                </Typography>
                <H2>Weitergabe personenbezogener Daten</H2>
                <Typography>
                  Oura verkauft oder vermietet Ihre personenbezogenen Daten
                  nicht und gibt sie nur an bestimmte vertrauenswürdige
                  Dienstleister weiter, damit wir unsere Dienstleistungen für
                  Sie erbringen und unsere Geschäftsaktivität ausführen können.
                  Wann immer wir Daten an Dritte weitergeben, verlangen wir von
                  diesen, dass sie Ihre Daten nur für die von uns genehmigten
                  Zwecke und aus den in dieser Datenschutzerklärung erläuterten
                  Gründen verwenden. Wir verlangen zudem von diesen
                  Dienstleistern, dass sie Ihre personenbezogenen Daten
                  mindestens auf ebenso hohem Standard schützen, wie wir es tun.
                </Typography>
                <Typography>
                  Wie die meisten Unternehmen nutzt Oura Dienstleister unter
                  anderem zu folgenden Zwecken:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    Bereitstellen und Verbessern unserer Onlineservice-Plattform
                  </ListItem>
                  <ListItem>Speichern der Daten unserer Benutzer</ListItem>
                  <ListItem>
                    Erbringen von Dienstleistungen gegenüber Kunden
                  </ListItem>
                  <ListItem>
                    Verwalten und Organisieren unserer Marketingaktivitäten:
                    Oura gibt Daten zur Websitenutzung nur an die Partner
                    unseres Werbenetzwerks weiter, damit diese unser Marketing
                    analysieren und optimieren können. Oura gibt die Daten der
                    Oura-App nicht an werbetreibende Drittanbieter weiter.
                  </ListItem>
                  <ListItem>
                    Analyse der Nutzung unseres Onlineservice mit dem Zweck der
                    Verbesserung unserer Servicequalität
                  </ListItem>
                </List>
                <Typography>
                  Oura speichert personenbezogene Daten in erster Linie
                  innerhalb der geografischen Region, in der sie erhoben wurden.
                  In Fällen, in denen personenbezogene Daten außerhalb des
                  Erhebungsgebiets verarbeitet werden, stellen wir stets sicher,
                  dass sie gemäß geltenden Datenschutzgesetzen durch angemessene
                  Schutzmaßnahmen geschützt werden. Wir ergreifen zudem
                  branchenübliche Datenschutzmaßnahmen, um alle internationalen
                  Übermittlungen personenbezogener Daten durch
                  Datenschutzvereinbarungen mit unseren Dienstleistern
                  abzusichern.
                </Typography>
                <H2>Offenlegung persönlicher Daten</H2>
                <Typography>
                  Wir behalten uns außerdem das Recht vor, personenbezogene
                  Daten unter bestimmten Umständen offenzulegen, unter anderem:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    wenn wir Ihre ausdrückliche Zustimmung dazu haben;
                  </ListItem>
                  <ListItem>
                    wenn es für unsere berechtigten Interessen bei der Führung
                    unserer Geschäfte nach vernünftigem Ermessen notwendig ist,
                    z. B. im Falle einer Fusion, einer Übernahme oder eines
                    Verkaufs;
                  </ListItem>
                  <ListItem>
                    zum Schutz der gesetzlichen Rechte und des Eigentums von
                    Oura und
                  </ListItem>
                  <ListItem>
                    um Gesetze zu befolgen oder Strafverfolgung zu ermöglichen.
                  </ListItem>
                </List>
                <Typography>
                  Andernfalls werden Ihre personenbezogenen Daten niemals an
                  eine Einzelperson oder eine andere Organisation weitergegeben.
                </Typography>
                <H2>SCHUTZ IHRER DATEN</H2>
                <Typography>
                  Oura setzt technische und organisatorische
                  Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen. Wo es
                  angemessen ist, umfassen diese Schutzmaßnahmen die
                  Anonymisierung oder Pseudonymisierung personenbezogener Daten,
                  strenge Zugangskontrollen und die Verwendung von
                  Verschlüsselung zum Schutz der von uns verarbeiteten Daten.
                </Typography>
                <Typography>
                  Wir stellen zudem sicher, dass unsere Mitarbeiter angemessen
                  geschult sind, damit personenbezogene Daten stets in
                  Übereinstimmung mit unseren internen Richtlinien sowie unseren
                  durch die einschlägige Gesetzgebung festgelegten Pflichten
                  verarbeitet werden. Außerdem beschränken wir den Zugriff auf
                  Ihre sensiblen personenbezogenen Daten auf Mitarbeiter, die
                  ausdrücklich dazu berechtigt sind.
                </Typography>
                <Typography>
                  Die von uns angebotenen Onlinedienste, wie der Oura-Onlineshop
                  und Oura on the Web, schützen Ihre personenbezogenen Daten
                  während der Übermittlung durch Verschlüsselung und andere
                  Sicherheitsmaßnahmen. Des Weiteren testen wir unseren Service,
                  unsere Systeme und unsere Anlagen regelmäßig auf mögliche
                  Sicherheitslücken.
                </Typography>
                <Typography>
                  Wir aktualisieren die Oura-App und die Ring-Firmware
                  regelmäßig. Wir empfehlen Ihnen, darauf zu achten, dass immer
                  die neueste App- und Firmware-Version installiert sind, um den
                  Schutz Ihrer Daten zu maximieren.
                </Typography>
                <H2>DATENSPEICHERUNG</H2>
                <Typography>
                  Die Speicherfrist für Ihre personenbezogenen Daten hängt im
                  Allgemeinen von der Dauer des Lebenszyklus Ihres Oura-Kontos
                  ab. Ihre personenbezogenen Daten werden gelöscht, sobald sie
                  nicht mehr für den Zweck, für den sie ursprünglich erhoben
                  wurden, benötigt werden, es sei denn, wir sind gesetzlich
                  verpflichtet, die Daten über einen längeren Zeitraum
                  aufzubewahren. Zum Beispiel werden Ihre Messdaten in Bezug auf
                  Ihren Schlaf, Ihre Tagesform und Ihre Aktivität nur so lange
                  gespeichert, wie Ihr Oura-Konto aktiv ist.
                </Typography>
                <Typography>
                  Oura ist außerdem gesetzlich verpflichtet, bestimmte
                  personenbezogene Daten für einen bestimmten Zeitraum zu
                  speichern, z. B. für Steuerzwecke. Diese obligatorischen
                  Speicherfristen können z. B. Buchführungs- und
                  Steueranforderungen, Rechtsansprüche oder andere gesetzliche
                  Zwecke umfassen. Bitte beachten Sie, dass die verpflichtenden
                  Speicherfristen für personenbezogene Daten je nach
                  einschlägiger Gesetzgebung variieren.
                </Typography>
                <Typography>
                  Falls Sie dies wünschen, können Sie die Löschung Ihres
                  Oura-Kontos beantragen, indem Sie sich an
                  <strong>dataprotection@ouraring.com</strong> wenden.
                </Typography>
                <H2>VERWENDUNG VON COOKIES</H2>
                <Typography>
                  Wir verwenden Cookies und verschiedene andere Technologien, um
                  analytische und andere Informationen über die Nutzung unserer
                  Website durch Kunden zu erheben und zu speichern. Darüber
                  hinaus dienen sie Personalisierungs- und Werbezwecken. Die von
                  uns verwendeten Cookies umfassen sowohl eigene als auch
                  Drittanbieter-Cookies.
                </Typography>
                <Typography>
                  Cookies sind kleine Textdateien, die an Ihr Gerät gesendet und
                  dort gespeichert werden. Sie ermöglichen uns, die Besucher
                  unserer Websites zu identifizieren und die Nutzung unserer
                  Website zu erleichtern sowie aggregierte Informationen über
                  unsere Website-Besucher zu erstellen. Dies hilft uns, unseren
                  Service zu verbessern und unsere Kunden besser zu betreuen.
                  Ihr Gerät oder Ihre Dateien werden dadurch nicht
                  beeinträchtigt. Wir verwenden Cookies, um unsere Website und
                  die von uns bereitgestellten Informationen an die
                  individuellen Interessen unserer Kunden anzupassen. Cookies
                  werden auch verwendet, um Ihre Surfgewohnheiten zu verfolgen
                  und Werbung gezielt anzuzeigen und zu optimieren, sowohl auf
                  unserer Website als auch auf anderen Websites, die Sie
                  möglicherweise besuchen. Wir verwenden Cookies zudem für die
                  Einbindung unserer Social-Media-Konten auf unserer Website.
                </Typography>
                <H2>IHRE RECHTE ALS BETROFFENE PERSON</H2>
                <Typography>
                  Wann immer Oura Ihre Daten verarbeitet, haben Sie bestimmte
                  Rechte, die es Ihnen ermöglichen, die Verarbeitung Ihrer
                  personenbezogenen Daten zu bestimmen. In diesem Abschnitt
                  erhalten Sie Informationen über jedes dieser Rechte. Wenn Sie
                  Ihre Rechte als betroffene Person ausüben möchten, wenden Sie
                  sich mit Ihrem Anliegen bitte an{' '}
                  <strong>dataprotection@ouraring.com</strong>.
                </Typography>
                <H3>Recht auf Auskunft zu personenbezogenen Daten</H3>
                <Typography>
                  Sie haben das Recht zu erfahren, welche personenbezogenen
                  Daten über Sie verarbeitet werden. Sie können sich mit uns in
                  Verbindung setzen, um Auskunft über die personenbezogenen
                  Daten zu erhalten, die wir über Sie erfasst haben. Daraufhin
                  teilen wir Ihnen mit, ob wir Ihre Daten verarbeiten, und wenn
                  ja, welche personenbezogenen Daten wir über Sie erhoben und
                  verarbeitet haben.
                </Typography>
                <Typography>
                  Bitte beachten Sie, dass Sie über die Oura-App einfach auf
                  Ihre Schlaf-, Tagesform- und Aktivitätsdaten zugreifen können,
                  die wir verarbeiten. Sie können Ihre Daten auch über Oura on
                  the Web unter{' '}
                  <a
                    href="https://cloud.ouraring.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    https://cloud.ouraring.com
                  </a>{' '}
                  abrufen.
                </Typography>
                <H3>Recht auf Löschung</H3>
                <Typography>
                  Sie haben das Recht, unter bestimmten Umständen die Löschung
                  Ihrer personenbezogenen Daten zu verlangen. Wir werden solchen
                  Anfragen entsprechen, sofern es keine gültige Rechtsgrundlage
                  und keine gesetzliche Verpflichtung zur Speicherung der Daten
                  gibt.
                </Typography>
                <H3>Recht auf Berichtigung (unrichtiger Daten)</H3>
                <Typography>
                  Sie haben das Recht, die Berichtigung unrichtiger oder
                  unvollständiger personenbezogener Daten zu verlangen, die wir
                  über Sie gespeichert haben.
                </Typography>
                <Typography>
                  Bitte beachten Sie, dass Sie einige grundlegende Daten über
                  die Oura-App und Oura on the Web korrigieren und aktualisieren
                  können.
                </Typography>
                <H3>Recht auf Datenübertragbarkeit</H3>
                <Typography>
                  Sie haben das Recht, die personenbezogenen Daten, die Sie uns
                  bereitgestellt haben, in einem strukturierten und gängigen
                  Format zu erhalten. Das Recht auf Datenübertragbarkeit gilt
                  nur, wenn wir Ihre personenbezogenen Daten aus bestimmten
                  Gründen verarbeiten, z. B. aufgrund eines Vertrags oder Ihrer
                  Einwilligung.
                </Typography>
                <Typography>
                  Bitte beachten Sie, dass Sie Ihre Daten mit Oura on the Web
                  exportieren können.
                </Typography>
                <H3>Widerspruchsrecht in Bezug auf die Verarbeitung</H3>
                <Typography>
                  Sie haben das Recht, unter bestimmten Umständen Widerspruch
                  gegen die Verarbeitung Ihrer personenbezogenen Daten
                  einzulegen. Sofern wir keine zwingenden schutzwürdigen Gründe
                  für die weitere Verarbeitung dieser personenbezogenen Daten
                  haben, werden wir Ihre personenbezogenen Daten nach Eingang
                  und Prüfung Ihres Widerspruchs nicht mehr verarbeiten. Sie
                  haben außerdem das Recht, der Verarbeitung Ihrer
                  personenbezogenen Daten für Zwecke der Direktwerbung jederzeit
                  zu widersprechen.
                </Typography>
                <H3>Recht auf Einschränkung der Verarbeitung</H3>
                <Typography>
                  Sie haben das Recht zu verlangen, dass wir die Verarbeitung
                  Ihrer personenbezogenen Daten unter bestimmten Umständen
                  einschränken. Wenn Sie beispielsweise die Richtigkeit Ihrer
                  Daten bestreiten, können Sie verlangen, dass wir Ihre Daten
                  erst verarbeiten, nachdem wir deren Richtigkeit überprüft
                  haben.
                </Typography>
                <H3>Recht auf Widerruf der Einwilligung</H3>
                <Typography>
                  Wenn wir Sie um Ihre Einwilligung zur Verarbeitung Ihrer
                  personenbezogenen Daten gebeten haben, können Sie Ihre
                  Einwilligung in die Verarbeitung jederzeit widerrufen. Der
                  Widerruf Ihrer Einwilligung kann allerdings zu Problemen oder
                  Einschränkungen bei der Nutzung der Oura-Dienste führen.
                </Typography>
                <Typography>
                  Bitte beachten Sie, dass Sie sich jederzeit vom Erhalt unseres
                  Newsletters und anderer Marketing-E-Mails abmelden können,
                  indem Sie in den E-Mails, die Sie von uns erhalten, den
                  „Abmelden“-Link aufrufen.
                </Typography>
                <Typography>
                  Oura ist bestrebt, Ihre Datenschutzbedenken auszuräumen. Wenn
                  Sie Oura wegen eines Problems kontaktiert haben und
                  unzufrieden mit unserer Antwort sind, können Sie sich
                  vorbehaltlich einschlägiger rechtlicher Bestimmungen mit Ihrem
                  Problem an die zuständige Aufsichtsbehörde wenden. Wir bitten
                  Sie jedoch dringend, sich zunächst unter{' '}
                  <strong>dataprotection@ouraring.com</strong> an uns zu wenden,
                  damit wir Ihr Problem schneller lösen können, bevor Sie es an
                  eine offizielle Stelle weiterleiten.
                </Typography>
                <Typography>
                  Bitte lesen Sie den CCPA-Datenschutzhinweis von Oura, wenn Sie
                  im US-Bundesstaat Kalifornien ansässig sind. Der
                  Datenschutzhinweis erläutert Ihre Rechte gemäß kalifornischem
                  Recht.
                </Typography>
                <H2>KONTAKTDATEN VERANTWORTLICHER</H2>
                <Typography>
                  Ouraring Inc. ist der Verantwortliche für die
                  personenbezogenen Benutzerdaten, die zu Marketingzwecken
                  verarbeitet werden. Der Verantwortliche für die Verarbeitung
                  personenbezogener Daten zu allen anderen Zwecken ist Oura
                  Health Oy. Unsere Kontaktdaten sind:
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  Adresse: Elektroniikkatie 10, 90590 Oulu Finland
                </Typography>
                <Typography>
                  Datenschutzbeauftragter:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  Adresse: 415 Mission Street, 37th Floor San Francisco, CA
                  94105 United States
                </Typography>
                <Typography>
                  Datenschutzbeauftragter:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>ÄNDERUNGEN DIESER DATENSCHUTZERKLÄRUNG</H2>
              <Typography>
                Diese Datenschutzerklärung gilt ab dem{' '}
                <strong>15. September 2021</strong>. Wir behalten uns das Recht
                vor, diese Richtlinie von Zeit zu Zeit nach eigenem Ermessen zu
                aktualisieren. Wenn wir dies tun, werden wir Sie über alle
                wesentlichen Änderungen in Kenntnis setzen, indem wir Sie
                entweder auf der Website informieren oder Ihnen eine E-Mail oder
                eine Push-Benachrichtigung senden. Wenn Sie die Oura-Dienste
                nach einer Änderung weiterhin nutzen, bedeutet Ihre fortgesetzte
                Nutzung, dass Sie die Änderungen akzeptieren.
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
