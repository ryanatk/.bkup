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
      <div className="bg-white" lang="fi">
        <Header bordered />
        <PageContainer name="privacy-policy-oura-health" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Ouran tietosuojalauseke
              </Typography>
              <H2>TIETOJA TÄSTÄ TIETOSUOJALAUSEKKEESTA</H2>
              <Typography>
                Ouralla otetaan henkilötietojen suojaus vakavasti. Tämä
                tietosuojalauseke koskee henkilötietojen käsittelyä Oura Health
                Oy:n ja Ouraring Inc.:n toimesta (yhdessä ”Oura”).
              </Typography>
              <Typography>
                Tuotteidemme, kuten Oura-sormuksen, avulla voit seurata
                elämäntapoihin liittyviä valintojasi ja unesi laatua.
                Ymmärrämme, että sen henkilökohtaisemmiksi tiedot eivät voi
                muuttua, ja henkilötietojesi suojaus onkin meille äärimmäisen
                tärkeää. Käy tämä lauseke läpi huolellisesti.
              </Typography>
              <H2>MIKSI OURA KÄSITTELEE HENKILÖTIETOJASI?</H2>
              <Typography>
                Kun avaat alla olevan osion otsikon, saat näkyviin kuvauksen
                kerättävien ja käsiteltävien henkilötietojen kategorioista sekä
                keräyksen ja käsittelyn syistä, jotka liittyvät muun muassa
                palvelujen tarjoamiseen vieraillessasi sivustollamme, ostaessasi
                tuotteita sivustoltamme sekä käyttäessäsi sormusta ja
                sovellusta. Saat myös tietoja tietojesi käsittelyn
                oikeusperustasta ja tietolähteistämme.
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
                      Laitteiden ja sovellusten käyttäjät
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Laitteiden ja sovellusten käyttäjät
                      </Typography>
                      <H2>KÄSITTELYTARKOITUKSET</H2>
                      <Typography>
                        Oura kerää ja käsittelee laitteiden ja sovellusten
                        käyttäjien henkilötietoja (”käyttäjät”) vain seuraavia
                        tarkoituksia varten:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Oura-palvelujen tarjoaminen</H3List>
                          <Typography>
                            Käsittelemme henkilötietoja tarjotaksemme
                            Oura-palveluja ja sovellusominaisuuksia, esimerkiksi
                            päivittäisiä tietoja valmiudestasi, unestasi ja
                            aktiivisuudestasi.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Asiakaspalvelun antaminen</H3List>
                          <Typography>
                            Käsittelemme henkilötietoja tarjotaksemme
                            asiakaspalvelua ja hallitaksemme asiakasviestintää.
                            Jos otat yhteyttä tukeemme ja kysyt jotakin
                            sovellustiedoistasi, voimme vastata kysymyksiin
                            annettujen tietojen avulla ja ratkaista mahdolliset
                            ongelmat.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Tuotteiden ja palvelujen kehitys</H3List>
                          <Typography>
                            Käsittelemme tietojasi, jotka koskevat
                            Oura-sormuksen ja -alustan käyttöä, parantaaksemme
                            palvelujamme ja ominaisuuksia esimerkiksi
                            Oura-sovelluksessa. Kun se on mahdollista,
                            käsittelemme tietoja vain nimettömässä, koostetussa
                            tai tunnistamattomaksi muutetussa muodossa.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Tuotteiden ja palvelujen markkinointi</H3List>
                          <Typography>
                            Käsittelemme markkinointiin liittyviä tietoja
                            tuottaaksemme verkkomainontaa ja Ouran
                            markkinointiviestintää. Kuten{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                evästekäytännössämme
                              </BodyLink>
                            </Link>
                            on kuvattu, käytämme esimerkiksi evästeitä
                            verkkosivustollamme luodaksemme kohderyhmiä
                            verkkomainonnalle. Voit aina kieltäytyä
                            markkinointiviestinnästä, ja lähetämme sinulle
                            uutiskirjeen vain, jos olet pyytänyt sitä.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Kolmansien osapuolten integraatiot</H3List>
                          <Typography>
                            Käsittelemme tietoja palvellaksemme käyttäjiä, jotka
                            pyytävät jakamaan tietonsa tiettyjen kolmansien
                            osapuolten, kuten tutkimuskumppaneiden kanssa. Näin
                            tehdään vain nimenomaisella suostumuksellasi.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Lakisääteisten velvoitteiden täyttäminen
                          </H3List>
                          <Typography>
                            Joissakin tapauksissa meidän on käsiteltävä tiettyjä
                            tietoja, kun sovellettava lainsäädäntö ja määräykset
                            edellyttävät sitä. Tällaiset lakisääteiset
                            velvoitteet voivat liittyä esimerkiksi kirjanpitoon
                            ja veroihin, oikeudellisiin vaatimuksiin tai muihin
                            juridisiin tarkoituksiin.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>KÄSITTELYN OIKEUSPERUSTA</H2>
                      <Typography>
                        Euroopan tietosuojalainsäädäntö edellyttää
                        oikeusperustaa henkilötietojen keräykselle ETA-alueen
                        asukkailta ja niiden säilyttämiselle. Oikeusperustamme
                        tietojesi käsittelyyn määräytyy kulloisenkin
                        käsittelytarkoituksen mukaan, mukaan lukien seuraavat:
                      </Typography>
                      <Typography>
                        <strong>Sopimus:</strong> kun henkilötietoja käsitellään
                        Oura-palvelujen tarjoamista varten, käsittely perustuu
                        käyttäjäsopimukseen, joka muodostuu luodessasi tilin ja
                        hyväksyessäsi käyttöehtomme.
                      </Typography>
                      <Typography>
                        <strong>Suostumus:</strong> Käsittelemme
                        terveystietojasi vain suostumuksellasi. Joissakin
                        tapauksissa voit antaa suostumuksen tietojesi
                        käsittelyyn toiminnallasi, kuten lisäämällä
                        huomautuksiin terveystietoja tai lisäämällä
                        Oura-sovellukseen terveyteen liittyviä tunnisteita.
                      </Typography>
                      <Typography>
                        <strong>Oikeutettu etu:</strong> Käsittelemme
                        henkilötietojasi oikeutettua etuamme varten, kun
                        käsittelyn tarkoituksena on tuotteidemme ja palvelujemme
                        markkinointi, asiakaspalvelun antaminen sekä
                        tuotteidemme ja palvelujemme parantaminen. Kun tietojasi
                        käytetään oikeutettujen etujemme perusteella,
                        punnitsemme omia etujamme huolellisesti verrattuina
                        yksityisyytesi suojaan sovellettavien lakien mukaisesti.
                      </Typography>
                      <Typography>
                        <strong>Lakisääteinen velvoite:</strong> Ouran on
                        käsiteltävä tiettyjä tietoja noudattaakseen
                        lakisääteisiä velvoitteita, jotka voivat vaihdella eri
                        maissa. Tällaiset velvoitteet voivat liittyä esimerkiksi
                        kuluttajansuojaan tai verolainsäädäntöön.
                      </Typography>
                      <H2>KÄSITELTÄVÄT TIEDOT JA TIETOLÄHDE</H2>
                      <Typography>
                        Useimmiten Oura kerää henkilötietoja suoraan sinulta,
                        esimerkiksi rekisteröityessäsi tiliä varten tai
                        kerätessäsi Oura-sormuksen avulla mittaustietoja
                        sormuksen seurantatoimintojen kautta. Voimme myös
                        käsitellä tietoja, jotka tuotetaan antamistasi
                        tiedoista.
                      </Typography>
                      <Typography>
                        Oura käsittelee seuraavanlaisia henkilötietoja
                        laitteiden ja sovellusten käyttäjistä:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Yhteystiedot</strong>, kuten sähköpostiosoite
                          tai fyysinen osoite
                        </ListItem>
                        <ListItem>
                          <strong>Käyttäjätiedot</strong>, kuten sukupuoli,
                          pituus ja paino, käyttäjätunnus ja muut tiedot, joita
                          saatat antaa meille itsestäsi tai tilistäsi
                        </ListItem>
                        <ListItem>
                          <strong>Laitetiedot</strong>, kuten IP-osoite ja
                          sijaintitiedot
                        </ListItem>
                        <ListItem>
                          <strong>
                            Käyttäjän aktiivisuus- ja kontekstitiedot
                          </strong>
                          , kuten toiminta, muistiinpanot ja tunnisteet
                        </ListItem>
                        <ListItem>
                          <strong>Mittaustiedot</strong>, kuten syke,
                          liiketiedot ja lämpötilatiedot
                        </ListItem>
                        <ListItem>
                          <strong>
                            Lasketut käyttäjä-, uni- ja aktiivisuustiedot
                          </strong>
                          , kuten unen vaiheet (syvä, kevyt, REM, valveilla),
                          aktiivisuustasot päivän aikana, valmiustaso ja
                          painoindeksi (lasketaan pituuden ja painon
                          perusteella).
                        </ListItem>
                      </List>
                      <Typography>
                        Huomaa, että joitakin käsittelemiämme henkilötietoja,
                        myös terveyttäsi koskevia tietoja, pidetään erityisinä
                        tai arkaluonteisina henkilötietoina. Sovellettavan
                        lainsäädännön mukaan näitä tietoja käsitellään vain, jos
                        olet antanut käsittelyyn luvan. Jos käytät Ouran
                        sijaintipohjaisia palveluja, kuten GPS-pohjaista
                        aktiivisuuden seurantaa sovelluksen kautta, Oura voi
                        käsitellä laitteesi likimääräistä tai tarkkaa sijaintia
                        palvelun ollessa käytössä. Nämä tiedot voidaan saada
                        laitteesi palveluntarjoajan verkkotunnuksen, GPS:n
                        ja/tai WiFi-tietojen kautta. Oura ei käsittele tällaisia
                        sijaintitietoja ilman etukäteen antamaasi lupaa. Voit
                        poistaa tällaisen sijaintitietojen käsittelyn käytöstä
                        milloin tahansa käyttämällä laitteesi
                        käyttöoikeusasetuksia.
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Verkkokaupan asiakkaat ja verkkosivuston kävijät
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Verkkokaupan asiakkaat ja verkkosivuston kävijät
                      </Typography>
                      <H2>KÄSITTELYTARKOITUKSET</H2>
                      <Typography>
                        Jos käyt Ouran verkkosivustolla tai teet tilauksia Ouran
                        verkkokaupassa, käsittelemme henkilötietoja seuraavia
                        tarkoituksia varten:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>Tilausten viimeistely ja toimitus</H3List>
                          <Typography>
                            Käsittelemme henkilötietoja ostojen käsittelyä ja
                            toimitusta varten sekä ostosten mahdollistamista
                            varten.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>Asiakaspalvelun antaminen</H3List>
                          <Typography>
                            Käsittelemme henkilötietoja tarjotaksemme
                            asiakaspalvelua ja hallitaksemme viestintää
                            asiakkaiden kanssa. Jos otat yhteyttä tukeemme ja
                            kysyt jotakin Oura-sormuksesta tai palveluistamme,
                            voimme vastata kysymyksiin annettujen tietojen
                            avulla ja ratkaista mahdolliset ongelmat.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Palvelujen kehittäminen ja parantaminen
                          </H3List>
                          <Typography>
                            Käsittelemme sivustomme kävijöitä koskevia tietoja
                            parantaaksemme verkkopalvelujemme laatua. Tähän voi
                            sisältyä verkkotilastojen ja -trendien käyttö
                            verkkosivustollamme ja verkkokaupassamme. Kun se on
                            mahdollista, tähän käytetään vain koostettuja ja
                            anonymisoituja tietoja.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Palvelujemme mainostaminen ja markkinointi
                          </H3List>
                          <Typography>
                            Käsittelemme markkinointiin liittyviä tietoja
                            tuottaaksemme verkkomainontaa ja Ouran
                            markkinointiviestintää. Oura ei pyri tavoittamaan
                            henkilöitä verkkomainonnalla heidän
                            Oura-sovelluksessa antamiensa terveystietojen
                            perusteella. Kuten{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">
                                evästekäytännössämme
                              </BodyLink>
                            </Link>
                            on kuvattu, käytämme evästeitä verkkosivustossamme
                            luodaksemme kohderyhmiä verkkomainonnalle. Voit aina
                            kieltäytyä markkinointiviestinnästä, ja lähetämme
                            sinulle uutiskirjeen vain, jos olet pyytänyt sitä.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>
                            Lakisääteisten velvoitteiden täyttäminen
                          </H3List>
                          <Typography>
                            Joissakin tapauksissa meidän on käsiteltävä tiettyjä
                            tietoja, kun sovellettava lainsäädäntö edellyttää
                            sitä. Tällaiset lakisääteiset velvoitteet voivat
                            liittyä esimerkiksi kirjanpitoon ja veroihin,
                            oikeudellisiin vaatimuksiin tai muihin juridisiin
                            tarkoituksiin.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>KÄSITTELYN OIKEUSPERUSTA</H2>
                      <Typography>
                        Euroopan tietosuojalainsäädäntö edellyttää
                        oikeusperustaa henkilötietojen keräykselle ETA-alueen
                        asukkailta ja niiden säilyttämiselle. Oikeusperustamme
                        tietojesi käsittelyyn määräytyy kulloisenkin
                        käsittelytarkoituksen mukaan, mukaan lukien seuraavat:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Sopimus:</strong> Kun käsittelemme
                          henkilötietoja ostojen käsittelyä ja toimitusta
                          varten, oikeusperustana on käyttäjäsopimus, joka
                          syntyy tehdessäsi tilauksen.
                        </ListItem>
                        <ListItem>
                          <strong>Suostumus:</strong> Käsittelemme
                          henkilötietojasi sähköistä suoramarkkinointia varten,
                          jos olet antanut siihen luvan.
                        </ListItem>
                        <ListItem>
                          <strong>Oikeutettu etu:</strong> Kun käsittelemme
                          henkilötietojasi asiakaspalvelua, markkinointia ja
                          tuotteidemme kehitystä varten, oikeusperustana on
                          oikeutettu etu harjoittaa, ylläpitää ja kehittää
                          liiketoimintaa sekä luoda ja ylläpitää
                          asiakassuhteita. Kun käytämme tietojasi oikeutettujen
                          etujemme perusteella, punnitsemme omia etujamme
                          huolellisesti verrattuina yksityisyytesi suojaan
                          sovellettavan lainsäädännön mukaisesti.
                        </ListItem>
                        <ListItem>
                          <strong>Lakisääteinen velvoite:</strong> Ouran on
                          käsiteltävä tiettyjä tietoja noudattaakseen
                          lakisääteisiä velvoitteita, jotka voivat vaihdella eri
                          maissa. Tällaiset velvoitteet voivat liittyä
                          esimerkiksi kuluttajansuojaan tai kirjanpitoa
                          koskevaan lainsäädäntöön.
                        </ListItem>
                      </List>
                      <H2>KÄSITELTÄVÄT TIEDOT JA TIETOLÄHDE</H2>
                      <Typography>
                        Useimmiten keräämme henkilötietoja suoraan sinulta, jos
                        teet tilauksia verkkokaupassamme tai lähetät meille
                        kysymyksen tai valituksen. Kun käyt Ouran
                        verkkosivustolla tai verkkokaupassa, keräämme
                        analyysitietoja sinusta laitteesi ja selaimen kautta
                        evästeillä ja muilla tekniikoilla palvelujen kehitystä
                        ja mainontaa varten.
                      </Typography>
                      <Typography>
                        Käsittelemme seuraavien luokkien henkilötietoja
                        verkkosivuston ja verkkokaupan kävijöistä:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Yhteystiedot</strong>, kuten nimi,
                          sähköpostiosoite ja postiosoite
                        </ListItem>
                        <ListItem>
                          <strong>Toimitustiedot</strong>, kuten ostot ja
                          valittu maksutapa
                        </ListItem>
                        <ListItem>
                          <strong>Laitetiedot</strong> kuten IP-osoite,
                          käyntiaika ja sijaintitiedot
                        </ListItem>
                        <ListItem>
                          <strong>Käyttäjän toiminta</strong>, kuten sivuston
                          selausmallit ja viestintäsi kanssamme.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Kalifornian asukkaat
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        Kalifornian asukkaat
                      </Typography>
                      <H2>CCPA-ILMOITUS KALIFORNIALAISILLE KULUTTAJILLE</H2>
                      <Typography>
                        Tämä ilmoitus täydentää Ouran ja sen tytäryhtiöiden
                        (yhteisesti ”me” eri sijamuodoissa) tietosuojalauseketta
                        ja koskee ainoastaan kaikkia Kaliforniassa asuvia
                        kävijöitä ja käyttäjiä sekä muita Kalifornian osavaltion
                        asukkaita (”asiakkaat” tai ”sinä”), jotka käyttävät
                        Ouran verkkosivustoa tai muita Ouran tarjoamia
                        palveluja. Tämä ilmoitus otetaan käyttöön vuoden 2018
                        CCPA-lain (California Consumer Privacy Act, ”CCPA”)
                        noudattamiseksi, ja kaikilla CCPA:ssa määritellyillä
                        termeillä on sama merkitys tässä ilmoituksessa.
                      </Typography>
                      <H2>TIETOJEN KERÄYS, KÄYTTÖ JA JAKAMINEN</H2>
                      <Typography>
                        Kun asiakas on vuorovaikutuksessa Ouran tuotteiden
                        ja/tai palvelujen kanssa, Oura kerää tietoja, jotka
                        yksilöivät, liittyvät, kuvaavat, viittaavat tai ovat
                        liitettävissä kohtuullisesti tai voisivat olla
                        liitettävissä suoraan tai epäsuorasti tiettyyn
                        kuluttajaan tai laitteeseen (”henkilötiedot”).
                      </Typography>
                      <Typography>
                        Tietoja keräämiemme henkilötietojen luokista,
                        henkilötietojesi käsittelyn tarkoituksista ja
                        henkilötietojesi jakamisesta on tämän
                        tietosuojalausekkeen soveltuvissa osioissa edellä:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            Laitteen ja sovelluksen käyttäjä: kerättävien
                            henkilötietojen luokat ja käsittelyn tarkoitukset
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            Verkkokaupan ja verkkosivuston kävijä: kerättävien
                            henkilötietojen luokat ja käsittelyn tarkoitukset
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            Henkilötietojen jakaminen
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        Viimeisten kahdentoista (12) kuukauden aikana emme ole
                        myyneet henkilötietoja kolmansille osapuolille, mukaan
                        lukien tietojen koostajille.
                      </Typography>
                      <H2>KULUTTAJIEN OIKEUDET KALIFORNIASSA</H2>
                      <Typography>
                        Jos asut Kaliforniassa, sinulla on tiettyjä oikeuksia
                        CCPA:n perusteella:
                      </Typography>
                      <H3>
                        Oikeus tietää keräämistämme ja jakamistamme
                        henkilötiedoista
                      </H3>
                      <Typography>
                        CCPA:n nojalla sinulla on oikeus pyytää meitä kertomaan,
                        mitä henkilötietoja olemme keränneet sinusta edellisten
                        12 kuukauden aikana. Toimitamme tiedot sinulle, kun
                        olemme vastaanottaneet pyyntösi ja vahvistaneet sen
                        oikeellisuuden. Kun olemme vastaanottaneet ja
                        vahvistaneet vahvistettavissa olevan
                        kuluttajatiedustelusi, toimitamme sen pohjalta seuraavat
                        tiedot:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          sinusta keräämiemme henkilötietojen luokat
                        </ListItem>
                        <ListItem>
                          niiden henkilötietojen luokat, joita olemme
                          luovuttaneet sinusta (jos sellaisia on)
                        </ListItem>
                        <ListItem>
                          kerättyjen henkilötietojen lähteiden luokat
                        </ListItem>
                        <ListItem>
                          liiketoiminnalliset tai kaupalliset syymme
                          henkilötietojen keräämiseen tai myymiseen
                        </ListItem>
                        <ListItem>
                          niiden kolmansien osapuolten luokat, joiden kanssa
                          jaamme kyseisiä henkilötietoja
                        </ListItem>
                        <ListItem>
                          sinusta keräämämme henkilötiedot. Huomaa, että CCPA
                          estää meitä tekemästä seuraavaa:
                        </ListItem>
                      </List>
                      <H3>Oikeus tietojen poistamiseen</H3>
                      <Typography>
                        Sinulla on oikeus pyytää henkilötietojesi poistamista
                        huomioiden muutamat poikkeukset, kuten tilanteet, joissa
                        meillä on lakisääteinen velvoite kyseisten tietojen
                        säilyttämiseen. Kun olemme vastaanottaneet ja
                        vahvistaneet pyyntösi, poistamme henkilötietosi ja
                        määräämme myös palveluntarjoajiamme poistamaan tietosi,
                        ellei tapausta koske jokin poikkeus.
                      </Typography>
                      <H3>Luovutus-, käyttö- tai poistopyyntöjen tekeminen</H3>
                      <Typography>
                        Jos asut Kaliforniassa, voit pyytää henkilötietojesi
                        luovutusta, käyttöä ja/tai poistoa edellä kuvatulla
                        tavalla esittämällä meille vahvistettavissa olevan
                        kuluttajatiedustelun joko
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          lähettämällä sähköpostia osoitteeseen{' '}
                          <strong>dataprotection@ouraring.com</strong>,
                          sisällyttäen pyyntöön seuraavat tiedot: koko nimesi,
                          yrityksen nimi (tarvittaessa), osoite,
                          sähköpostiosoite ja puhelinnumero. Saatamme pyytää
                          sinulta lisätietoja, jos se on tarpeen
                          henkilöllisyytesi vahvistamiseksi. Tämän syynä on
                          tietoturva, ja lainsäädäntö edellyttää sitä tietyissä
                          tilanteissa.
                        </ListItem>
                      </List>
                      <Typography>
                        Vain sinä tai valtuuttamasi Kalifornian Secretary of
                        State -viranomaisen rekisteröimä henkilö voi tehdä
                        henkilötietojasi koskevan vahvistettavissa olevan
                        kuluttajatiedustelun. Voit myös tehdä vahvistettavissa
                        olevan kuluttajatiedustelun alaikäisen lapsesi puolesta.
                      </Typography>
                      <Typography>
                        Voit tehdä pyynnön maksuttomasti enintään kaksi kertaa
                        12 kuukauden aikana. Vastaamme kaikkiin vahvistettuihin
                        pyyntöihin 45 päivän kuluessa pyyntösi vastaanotosta,
                        ellemme pyydä lisäaikaa. Jos kohtuullista lisäaikaa
                        tarvitaan pyyntöösi vastaamista varten, ilmoitamme tästä
                        alkuperäisen 45 päivän ajanjakson aikana.
                      </Typography>
                      <H3>Syrjimättömyys</H3>
                      <Typography>
                        Oura ei syrji käyttäjiä, jotka käyttävät tietosuojaan
                        liittyviä oikeuksiaan CCPA:n perusteella. Ellei voimassa
                        ole poikkeusta, emme tee seuraavia asioita:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          evää sinulta tuotteita tai palveluja
                        </ListItem>
                        <ListItem>
                          veloita sinulta eri maksuja tai hintoja tuotteista tai
                          palveluista, mukaan lukien alennukset tai muut edut,
                          tai määrää sakkomaksuja
                        </ListItem>
                        <ListItem>
                          toimita sinulle eri tasoisia tai laatuisia tuotteita
                          tai palveluja
                        </ListItem>
                        <ListItem>
                          ehdota, että sinulta voidaan veloittaa eri maksu tai
                          hinta tuotteista tai palveluista tai voit saada eri
                          tasoisia tai laatuisia tuotteita tai palveluja.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  TIETOJEN JAKAMINEN JA LUOVUTTAMINEN
                </Typography>
                <H2>Henkilötietojen jakaminen</H2>
                <Typography>
                  Oura ei myy eikä vuokraa henkilötietojasi. Se jakaa
                  henkilötietosi vain tiettyjen luotettavien palveluntarjoajien
                  kanssa voidakseen tarjota palveluita ja harjoittaa
                  liiketoimintaa. Kun jaamme tietoja ulkopuolisten
                  palveluntarjoajien kanssa, edellytämme niiden käyttävän
                  tietojasi vain sallimaamme tarkoitukseen ja rajoitetuista
                  syistä, jotka on kuvattu tässä tietosuojalausekkeessa.
                  Edellytämme myös, että nämä palveluntarjoajat suojaavat
                  henkilötietosi vähintään samojen standardien mukaisesti kuin
                  me.
                </Typography>
                <Typography>
                  Useimpien yritysten tavoin Oura käyttää palveluntarjoajia muun
                  muassa seuraaviin tarkoituksiin:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    verkkopalvelualustamme tuottaminen ja parantaminen
                  </ListItem>
                  <ListItem>käyttäjätietojen tallennus</ListItem>
                  <ListItem>asiakaspalvelun antaminen</ListItem>
                  <ListItem>
                    markkinointitoimintojen hallinta ja organisointi. Oura jakaa
                    verkkosivuston käyttötietoja mainosverkostokumppaneidensa
                    kanssa vain markkinointinsa analysointia ja optimointia
                    varten. Oura ei jaa Oura-sovelluksen tietoja ulkopuolisten
                    mainostajien kanssa)
                  </ListItem>
                  <ListItem>
                    verkkopalvelumme käyttötietojen analysointia varten, jolloin
                    tarkoituksena on parantaa palvelumme laatua.
                  </ListItem>
                </List>
                <Typography>
                  Oura säilyttää henkilötietoja ensisijaisesti sillä
                  maantieteellisellä alueella, jolta ne kerätään. Jos
                  henkilötietoja käsitellään niiden keräysalueen ulkopuolella,
                  varmistamme aina, että henkilötiedot suojataan asianmukaisin
                  toimin sovellettavien tietosuojalakien mukaisesti. Käytämme
                  myös alan standardien mukaisia tietosuojatoimia suojataksemme
                  kaikki henkilötietojen kansainväliset siirrot
                  tietosuojasopimuksilla palveluntarjoajiemme kanssa.
                </Typography>
                <H2>Henkilötietojen luovuttaminen</H2>
                <Typography>
                  Varaamme myös oikeuden luovuttaa henkilötietoja tietyissä
                  määritellyissä olosuhteissa, kuten seuraavissa:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>kun olet antanut siihen erikseen luvan</ListItem>
                  <ListItem>
                    kun se on kohtuullista liiketoimintamme oikeutettujen etujen
                    perusteella, esimerkiksi fuusion, yritysoston tai myynnin
                    yhteydessä
                  </ListItem>
                  <ListItem>
                    Ouran laillisten oikeuksien ja omaisuuden suojaamiseksi
                  </ListItem>
                  <ListItem>
                    lainsäädännön tai lainvalvonnan määräysten noudattamista
                    varten.
                  </ListItem>
                </List>
                <Typography>
                  Muutoin henkilötietojasi ei koskaan jaeta yhdenkään henkilön
                  tai muiden organisaatioiden kanssa.
                </Typography>
                <H2>TIETOJESI SUOJAUS</H2>
                <Typography>
                  Oura käyttää teknisiä ja organisaatioon liittyviä turvatoimia
                  pitääkseen tietosi hyvin suojattuina. Tarvittaessa näihin
                  turvatoimiin sisällytetään esimerkiksi henkilötietojen
                  anonymisointi tai pseudonymisointi, tarkka käyttöoikeuksien
                  valvonta ja salaustekniikoiden käyttö käsiteltävien tietojen
                  suojaamiseksi.
                </Typography>
                <Typography>
                  Varmistamme myös, että henkilöstömme saa riittävän
                  koulutuksen, jotta henkilötietoja käsitellään vain sisäisten
                  käytäntöjemme mukaisesti. Tämä vastaa velvoitteitamme
                  sovellettavan lainsäädännön puitteissa. Lisäksi rajaamme
                  luottamuksellisten henkilötietojesi käyttöoikeuden
                  henkilöstölle, jolle on erikseen myönnetty oikeus siihen.
                </Typography>
                <Typography>
                  Tarjoamamme verkkopalvelut, kuten Oura-verkkokauppa ja Oura on
                  the Web, suojaavat henkilötietojasi siirron aikana salauksella
                  ja muilla suojaustoimenpiteillä. Testaamme myös säännöllisesti
                  palveluamme, järjestelmiämme ja muita resursseja löytääksemme
                  mahdolliset tietoturvahaavoittuvuudet.
                </Typography>
                <Typography>
                  Päivitämme Oura-sovellusta ja sormuksen laiteohjelmistoa
                  säännöllisesti. Suosittelemme varmistamaan, että sinulla on
                  aina asennettuina uusimmat sovellus- ja laiteohjelmistoversiot
                  tietoturvan maksimointia varten.
                </Typography>
                <H2>TIETOJEN SÄILYTYS</H2>
                <Typography>
                  Henkilötietojesi säilytysaika määräytyy yleensä Oura-tilisi
                  elinkaaren mukaan. Henkilötietosi poistetaan, kun niitä ei
                  enää tarvita alkuperäiseen keräystarkoitukseensa, ellei meille
                  ole lakisääteistä velvoitetta säilyttää tietoja pitemmän
                  aikaa. Esimerkiksi unta, valmiuksia ja aktiviteetteja koskevia
                  mittaustietojasi säilytetään vain Oura-tilisi ollessa
                  aktiivisena.
                </Typography>
                <Typography>
                  Ouralla on myös lakisääteinen velvoite säilyttää tiettyjä
                  henkilötietoja tietyn aikaa, esimerkiksi verotusta varten.
                  Näihin pakollisiin säilytysaikoihin voi liittyä esimerkiksi
                  kirjanpito- ja verovaatimuksia, oikeudellisia vaatimuksia tai
                  muita oikeudellisia tarkoituksia. Huomaa, että henkilötietojen
                  pakolliset säilytysajat vaihtelevat sovellettavan
                  lainsäädännön mukaan.
                </Typography>
                <Typography>
                  Halutessasi voit pyytää Oura-tilisi poistoa lähettämällä
                  sähköpostia osoitteeseen{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H2>EVÄSTEIDEN KÄYTTÖ</H2>
                <Typography>
                  Käytämme evästeitä ja useita muita tekniikoita kerätessämme ja
                  tallentaessamme analytiikkatietoja ja muita tietoja, kun
                  asiakkaat käyttävät sivustoamme, sekä sisällön räätälöinnin ja
                  mainonnan yhteydessä. Käytämme sekä ensimmäisten että
                  kolmansien osapuolten evästeitä.
                </Typography>
                <Typography>
                  Evästeet ovat laitteeseesi lähetettäviä ja tallennettavia
                  pieniä tekstitiedostoja, joiden avulla pystymme tunnistamaan
                  verkkosivustomme kävijät, helpottamaan sivuston käyttöä ja
                  luomaan koostetietoja kävijöistä. Tämä auttaa meitä
                  parantamaan palvelua ja palvelemaan asiakkaitamme entistä
                  paremmin, eikä se vahingoita laitettasi tai tiedostojasi.
                  Käytämme evästeitä sivustomme ja tarjoamiemme tietojen
                  räätälöintiin asiakkaiden yksilöllisten kiinnostuksen
                  kohteiden mukaisesti. Evästeiden avulla myös seurataan
                  selailutottumuksiasi sekä kohdistetaan ja optimoidaan
                  mainontaa sekä sivustollamme että muilla sivustoilla, joilla
                  voit käydä. Käytämme evästeitä myös sosiaalisen median
                  tiliemme integroinnissa verkkosivustoomme.
                </Typography>
                <H2>OIKEUTESI REKISTERÖITYNÄ HENKILÖNÄ</H2>
                <Typography>
                  Kun Oura käsittelee tietojasi, sinulla on tiettyjä oikeuksia,
                  joiden avulla voit säädellä henkilötietojesi käsittelytapoja.
                  Tässä osiossa on tietoja näistä oikeuksista. Jos haluat
                  käyttää oikeuksiasi rekisteröitynä henkilönä, lähetä pyyntö
                  sähköpostitse osoitteeseen{' '}
                  <strong>dataprotection@ouraring.com</strong>.
                </Typography>
                <H3>Tietojen tarkasteluoikeus</H3>
                <Typography>
                  Sinulla on oikeus tietää, mitä sinua koskevia henkilötietoja
                  käsitellään. Voit pyytää meiltä tarkasteluoikeuden
                  henkilötietoihin, joita olemme keränneet sinusta. Vahvistamme,
                  käsittelemmekö tietojasi, ja lähetämme tiedot keräämistämme ja
                  käsittelemistämme henkilötiedoistasi.
                </Typography>
                <Typography>
                  Huomaa, että käyttämällä Oura-sovellusta voit tarkastella
                  helposti uni-, valmius- ja aktiviteettitietojasi, joita
                  käsittelemme. Voit tarkastella tietojasi myös Oura on the
                  Webin kautta osoitteessa{' '}
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
                <H3>Oikeus poistoon</H3>
                <Typography>
                  Voit pyytää henkilötietojesi poistoa tietyissä olosuhteissa.
                  Noudatamme tällaisia pyyntöjä, ellei meillä ole lakisääteistä
                  velvollisuutta säilyttää tietoja.
                </Typography>
                <H3>Oikeus (virheellisten tietojen) oikaisuun</H3>
                <Typography>
                  Voit pyytää korjaamaan virheelliset tai puutteelliset
                  henkilötiedot, joita olemme tallentaneet sinusta.
                </Typography>
                <Typography>
                  Huomaa, että voit korjata ja päivittää joitakin perustietojasi
                  Oura-sovelluksen ja Oura on the Webin kautta.
                </Typography>
                <H3>Oikeus tietojen siirrettävyyteen</H3>
                <Typography>
                  Voit pyytää haltuusi henkilötietoja, jotka olet antanut
                  meille, jäsennetyssä ja yleisesti käytetyssä muodossa. Oikeus
                  tietojen siirrettävyyteen on voimassa vain silloin, kun
                  käsittelemme henkilötietojasi tiettyjen syiden vuoksi,
                  esimerkiksi sopimusvelvoitteen vuoksi tai suostumuksesi
                  perusteella.
                </Typography>
                <Typography>
                  Huomaa, että voit viedä omat tietosi Oura on the Webissä.
                </Typography>
                <H3>Oikeus kieltää käsittely</H3>
                <Typography>
                  Voit kieltää henkilötietojesi käsittelyn tietyissä
                  olosuhteissa. Jos meillä ei ole oikeudellisia perusteita
                  tällaisten henkilötietojen käsittelyn jatkamiseen, emme
                  käsittele henkilötietojasi enää sen jälkeen, kun olemme
                  vastaanottaneet ja todentaneet kieltosi. Voit myös kieltää
                  henkilötietojesi käytön suoramarkkinointiin milloin tahansa.
                </Typography>
                <H3>Oikeus rajoittaa käsittelyä</H3>
                <Typography>
                  Voit pyytää henkilötietojesi käsittelyn rajoittamista
                  tietyissä olosuhteissa. Jos esimerkiksi epäilet tietojesi
                  oikeellisuutta, voit pyytää meitä olemaan käsittelemättä
                  tietojasi, kunnes Oura on tarkistanut tietojesi
                  oikeellisuuden.
                </Typography>
                <H3>Oikeus peruuttaa suostumus</H3>
                <Typography>
                  Jos olemme pyytäneet suostumustasi henkilötietojesi
                  käsittelyyn, voit peruuttaa suostumuksesi milloin tahansa.
                  Huomaa kuitenkin, että suostumuksen peruutus voi aiheuttaa
                  ongelmia tai rajoituksia Oura-palvelujen täysimittaiseen
                  käyttöön.
                </Typography>
                <Typography>
                  Huomaa, että voit aina peruuttaa uutiskirjeemme ja muiden
                  markkinointiviestien tilauksen käyttämällä lähettämissämme
                  sähköposteissa olevaa Peruuta tilaus -linkkiä.
                </Typography>
                <Typography>
                  Oura pyrkii ratkaisemaan yksityisyyttä koskevat huolenaiheesi.
                  Jos olet ottanut yhteyttä Ouraan ongelman vuoksi, etkä ole
                  tyytyväinen saamaasi apuun, voit ottaa sovellettavan
                  lainsäädännön mukaisesti yhteyttä paikalliseen
                  valvontaviranomaiseen. Suosittelemme kuitenkin, että lähetät
                  meille ensin sähköpostia osoitteeseen{' '}
                  <strong>dataprotection@ouraring.com</strong> jotta voimme
                  ratkaista ongelmasi nopeammin ennen sen eskalointia.
                </Typography>
                <Typography>
                  Lue Ouran CCPA-tietosuojalausekkeesta lisää Kalifornian
                  lainsäädännön mukaisista oikeuksistasi, jos asut
                  Kaliforniassa.
                </Typography>
                <H2>REKISTERINPITÄJÄN YHTEYSTIEDOT</H2>
                <Typography>
                  Ouraring Inc. on rekisterinpitäjänä käyttäjien
                  henkilötiedoissa, joita käsitellään markkinointitarkoituksia
                  varten. Kaikkia muita tarkoituksia varten käsiteltävien
                  henkilötietojen rekisterinpitäjä on Oura Health Oy.
                  Yhteystietomme ovat alla:
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  Osoite: Elektroniikkatie 10, 90590 Oulu Finland
                </Typography>
                <Typography>
                  Tietosuojavastaava:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  Osoite: 415 Mission Street, 37th Floor San Francisco, CA 94105
                  United States
                </Typography>
                <Typography>
                  Tietosuojavastaava:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>MUUTOKSET TÄHÄN TIETOSUOJAILMOITUKSEEN</H2>
              <Typography>
                Tämä tietosuojalauseke on voimassa alkaen{' '}
                <strong>15. syyskuuta 2021</strong>. Varaamme oikeuden päivittää
                tätä käytäntöä ajoittain oman harkintamme mukaan, mutta jos
                teemme niin, ilmoitamme merkittävistä muutoksista
                verkkosivustolla tai lähettämällä sinulle sähköpostia tai
                push-ilmoituksen. Jos jatkat Oura-palvelujen käyttöä muutoksen
                jälkeen, osoitat hyväksyväsi tällaiset muutokset.
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
