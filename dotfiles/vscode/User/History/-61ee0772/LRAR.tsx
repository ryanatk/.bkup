import Link from 'next/link';
import React from 'react';
import {
  BodyLink,
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../../components/sormus';

const Page = () => {
  return (
    <div className="tailwind">
      <div className="bg-white">
        <Header bordered />
        <PageContainer name="terms-and-conditions" padding="both">
          <Box className={`max-w-3xl`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                ŌURA-KÄYTTÖEHDOT
              </Typography>
              <Link href="/gen2-terms-and-conditions/fi">
                <BodyLink color="inherit">Edellinen KÄYTTÖEHDOT</BodyLink>
              </Link>
              <Typography>
                <em>Viimeksi päivitetty: 26. lokakuuta 2021</em>
              </Typography>
              <Typography>
                Tervetuloa ja kiitos mielenkiinnostasi Ōuraa kohtaan! Näissä
                käyttöehdoissa (Sopimus) kuvataan ehdot, jotka koskevat
                ouraring.com-verkkosivuston (Sivusto), älysormuksen, laturin
                ja/tai muiden sähkölaitteiden (Tuotteet) sekä mobiilisovelluksen
                (Mobiilisovellus) (yhdessä Palvelut) käyttöä. Sivuston ja
                Mobiilisovelluksen omistavat ja niitä ylläpitävät{' '}
                <strong>Ōura Health Oy</strong>
                ja sen tytäryhtiöt, kuten Ouraring Inc. (yhdessä Ōura tai Oura).
              </Typography>
              <Typography>
                Tässä sopimuksessa viittaamme itseemme nimellä Ōura tai Oura tai
                sanalla me eri sijamuodoissa; sinuun viittaamme sanalla sinä tai
                Asiakas. Ouraan ja Asiakkaaseen viitataan tässä Sopimuksessa
                erikseen sanalla Osapuoli ja yhdessä sanalla Osapuolet.
              </Typography>
              <Typography>
                Muodostamalla yhteyden Palveluihin, myös Sivustoon, tai
                käyttämällä niitä osoitat aikovasi hyväksyä ja nimenomaisesti
                hyväksyväsi kaikki sitovat ehdot, jotka on määritetty tässä
                Sopimuksessa ja viitteenä mainitussa Tietosuojakäytännössä
                (saatavilla osoitteessa{' '}
                <BodyLink
                  color="inherit"
                  href="https://ouraring.com/privacy-policy-oura-health/fi"
                  target="_blank"
                >
                  https://ouraring.com/privacy-policy-oura-health/fi
                </BodyLink>
                . Jos et hyväksy näitä ehtoja, et saa käyttää Palveluita.
              </Typography>
              <Typography Element="h2" variant="h3">
                Yhteyden muodostaminen ja käyttö
              </Typography>
              <Typography>
                Oura myöntää sinulle rajoitetun käyttöoikeuden Sivustoon, johon
                tätä Sopimusta sovelletaan. Jos päätät tilata Mobiilisovelluksen
                ja käyttää sitä, Oura myöntää sinulle lisäksi käyttöoikeuden
                yhteyden muodostamiseen Palveluihin ja niiden käyttämiseen sillä
                ehdolla, että noudatat tätä Sopimusta, Tietosuojakäytäntöä ja
                muita Ouran sinulle ilmoittamia sääntöjä ja vaatimuksia, mukaan
                lukien mahdollisten maksujen maksaminen. Ymmärrät ja hyväksyt
                sen, että Oura voi muokata, päivittää ja muutoin muuttaa
                Palveluita milloin tahansa oman harkintansa mukaan.
              </Typography>
              <Typography>
                Vakuutat, että olet vähintään 18-vuotias ja että sinulla on
                lailliset valtuudet hyväksyä tämä Sopimus omasta puolestasi tai
                edustamasi osapuolen puolesta. Vain sinä olet vastuussa
                toiminnastasi ja vuorovaikutuksestasi Palveluiden kanssa.
              </Typography>
              <Typography>
                Et saa käyttää Palveluita mihinkään muuhun tarkoitukseen kuin
                tässä Sopimuksessa myönnetyn käyttöoikeuden puitteissa. Et saa
                milloinkaan, suoraan tai välillisesti, etkä saa sallia kolmannen
                osapuolen (i) kokonaan tai osittain kopioida tai muokata
                Palveluita tai luoda Palveluista jälkiperäisteoksia; (ii)
                takaisinmallintaa, purkaa osiin tai purkaa käänteisesti mitään
                Palveluiden Mobiilisovelluksen osaa tai muokata niitä tai
                muutoin yrittää johtaa tai saada pääsyn niihin kokonaan tai
                osittain; tai (iii) käyttää Palveluita millä tahansa tavalla tai
                mihin tahansa tarkoitukseen, joka loukkaa tai jolla kavalletaan
                tai muutoin loukataan immateriaalioikeuksia tai muita henkilön
                oikeuksia (mukaan lukien tiedonharavointi, mutta ei siihen
                rajoittuen) tai joka muutoin rikkoo mitä tahansa lakia, asetusta
                tai muita oikeudellisia vaatimuksia.
              </Typography>
              <Typography>
                Ostot on tarkoitettu vain sinulle loppukäyttäjänä, eikä sinulla
                ole oikeutta myydä niitä edelleen ilman Ouran nimenomaista
                lupaa. Pidätämme oikeuden evätä tai peruuttaa tilauksesi, jos
                epäilemme, että ostat Palveluita edelleenmyyntiä varten. Ouralta
                ostettujen Tuotteiden omistusoikeus siirtyy sinulle, kun Oura
                tai nimetty kuljetusyhtiö toimittaa Tuotteet sinulle.
              </Typography>
              <Typography>
                Edellä mainittua Sivuston ja Mobiilisovelluksen rajoitettua
                käyttöoikeutta lukuun ottamatta hyväksyt, että mitään tässä
                Sopimuksessa olevaa ei saa tulkita siten, että sillä
                annettaisiin tai annettaisiin implisiittisesti,
                estoppel-periaatteella tai muulla tavoin mitään oikeuksia,
                omistusoikeuksia tai etuja mihinkään immateriaalioikeuteen,
                mukaan lukien (i) keksinnöt (olivatpa ne patentoitavissa tai ei
                missä tahansa maassa), patentit, patenttihakemukset, keksinnön
                julkistamiset, parannukset, liikesalaisuudet, teollis- ja
                tekijänoikeustiedot, tietotaito, tiedot tai tekniset tiedot;
                (ii) tekijänoikeudella suojatut teokset, tekijänoikeuksien
                rekisteröintitiedot, piirimallit, piirimallin
                rekisteröintitiedot tai sovellukset Yhdysvalloissa tai missä
                tahansa toisessa maassa; (iii) tavaramerkit, tavaramerkkien
                rekisteröintitiedot, palvelumerkit, logot tai niiden sovellukset
                Yhdysvalloissa tai missä tahansa toisessa maassa; (iv)
                liikesalaisuudet; tai (v) muut aineelliset tai aineettomat
                omistusoikeudet kaikkialla maailmassa.
              </Typography>
              <Typography>
                Ymmärrät ja hyväksyt sen, että toisinaan Palveluihin ei saa
                yhteyttä, niitä ei voi käyttää tai ne eivät toimi mistä tahansa
                syystä, mukaan lukien rajoituksetta (i) laitteiden
                toimintahäiriöt; (ii) säännölliset huoltotoimenpiteet tai
                korjaukset, joita Oura voi tehdä ajoittain ilmoittamatta
                sinulle; tai (iii) syyt, joihin Oura ei voi vaikuttaa tai jotka
                eivät ole kohtuudella ennakoitavissa.
              </Typography>
              <Typography>
                Lukuun ottamatta mitään sellaista, mikä rikkoisi tätä Sopimusta,
                Oura voi turvallisuussyistä tilapäisesti peruuttaa toistaiseksi
                sinulle ja mille tahansa kolmannelle osapuolelle myönnetyn
                oikeuden muodostaa yhteys Palveluihin ja käyttää niitä
                estääkseen laittoman tai vilpillisen toiminnan, noudattaakseen
                minkä tahansa oikeudellisen tahon tai valtion yksikön pyyntöjä
                tai jos rikot Sopimusta tai Tietosuojakäytäntöä.
              </Typography>
              <Typography>
                Oura voi ajoittain ja oman harkintansa mukaan pyytää muita
                palveluntarjoajia avustamaan Palveluiden suorittamisessa,
                esimerkiksi verkkoisännöintipalveluntarjoajia,
                maksunkäsittelijöitä ja muita kolmansia osapuolia. Sinun on
                noudatettava näiden kolmansien osapuolten Palveluiden yhteydessä
                tarjoamiin palveluihin liittyviä käyttöehtoja ja muita
                vaatimuksia.
              </Typography>
              <Typography Element="h2" variant="h3">
                Asiakkaiden vastuut
              </Typography>
              <Typography>
                Hyväksyt, että olet yksin vastuussa Palveluiden käyttämisestä,
                suoraan tai välillisesti, mukaan lukien sen ymmärtäminen, onko
                tällainen käyttö sallittu tämän Sopimuksen nojalla tai rikkooko
                se tätä Sopimusta. Olet lisäksi yksin vastuussa kaikkien
                Palveluiden käyttöön liittyvien sovellettavien lakien
                noudattamisesta. Saat lisäksi käyttää Palveluita ainoastaan
                laillisiin tarkoituksiin ja harjoittaa kaikkea liiketoimintaa
                Palveluiden kautta kaikkien sovellettavien lakien ja asetusten
                mukaisesti, mukaan lukien muun muassa kaikki sovellettavat
                liittovaltion ja osavaltioiden lait ja määräykset, jotka
                koskevat arvopapereiden tarjoamista ja myyntiä, rahanpesua ja
                terrorismin torjuntaa.
              </Typography>
              <Typography>
                Sinä yksin olet vastuussa sen varmistamisesta ja siitä
                huolehtimisesta, että voit muodostaa yhteyden Palveluihin ja
                käyttää niitä, mukaan lukien hankkimalla oman yhteensopivan
                laitteiston, Mobiilisovelluksen, internetyhteyden,
                tietoturvamobiilisovelluksen, varmuuskopiointilaitteet tai
                -palvelut ja huolehtimalla muista vaatimuksista. Oura ei ole
                velvollinen toimittamaan muita mobiilisovelluksia tai laitteita.
                Hyväksyt myös, että Oura ei ole vastuussa mistään tietojen
                menetyksestä tai muusta vahingosta tai menetyksestä, joka on
                aiheutunut Palveluiden käytön yhteydessä, mukaan lukien
                kyvyttömyys tarjota asianmukaiset tietoturva- tai
                varmuuskopiointilaitteet tai -palvelut.
              </Typography>
              <Typography>
                Olet vastuussa siitä, että Ouralla on tarkat ja ajantasaiset
                tiedot asiakastilistäsi, mukaan lukien ajantasaiset yhteys- ja
                maksutiedot. Olet lisäksi vastuussa siihen liittyvän Asiakkaan
                sähköpostitilin säännöllisestä tarkistamisesta Ouran
                mahdollisten viestien varalta.
              </Typography>
              <Typography>
                Jos sinulle annetaan käyttäjänimi, salasana,
                käyttäjätunnustiedosto tai mikä tahansa muu tieto osana
                tietoturvaprosessia (Tunnistetiedot), sinun on käsiteltävä näitä
                tietoja luottamuksellisina, etkä saa paljastaa Tunnistetietoja
                kenellekään muulle henkilölle tai yhteisölle. Hyväksyt, että
                tilisi ja Tunnistetietosi ovat henkilökohtaisia, ja lisäksi
                sitoudut olemaan antamatta kenellekään muulle henkilölle pääsyä
                Palveluihin tai Palveluiden osiin käyttäjänimelläsi,
                salasanallasi tai muilla suojaustiedoillasi. Sinun on
                ilmoitettava Ouralle välittömästi kaikesta Tunnistetietojesi
                luvattomasta hankkimisesta tai käytöstä tai muista
                tietoturvaloukkauksista. Ouralla on oikeus poistaa käytöstä
                käyttäjänimi, salasana, käyttäjätunnustiedosto tai muu tunniste
                milloin tahansa riippumatta siitä, onko se sinun valitsemasi vai
                Ouran antama.
              </Typography>
              <Typography>
                Oura pyrkii kaupallisesti kohtuullisin keinoin tarjoamaan
                riittävät tukipalvelut Palveluille. Edellä mainitusta huolimatta
                tämä Sopimus ei oikeuta sinua mihinkään Palveluiden
                tukipalvelujen taattuun tasoon, saatavuuteen tai läpimenoaikaan.
              </Typography>
              <Typography Element="h2" variant="h3">
                Maksut
              </Typography>
              <Typography>
                Maksullisiin palveluihin kuuluvat Palvelut, jotka voivat olla
                kertaluonteisia ostoksia tai automaattisesti uusivia
                tilauspalveluja (Maksulliset palvelut), mukaan lukien Sivustomme
                ja Mobiilisovelluksemme (Tilaukset). Voimme tehdä muutoksia
                Maksullisiin palveluihin tai keskeyttää tai lopettaa ne milloin
                tahansa mistä tahansa syystä, ja Oura varaa yksinomaisen
                harkintavallan päättää, mitkä Palvelut tai niiden osat ovat
                maksullisia.
              </Typography>
              <Typography>
                Maksulliset palvelut voivat sisältää ennakkoon tilattuja
                Tuotteita, jotka tuotetaan sinulle tulevaisuudessa
                (Ennakkotilaus). Sinulta veloitetaan ennakkotilausmaksu, kun
                teet ennakkotilauksen. Useat tekijät vaikuttavat hyväksytyn
                Ennakkotilauksen toimituspäivään. Näitä tekijöitä ovat muun
                muassa ennakkotilausmaksun maksupäivä ja Ouran
                valmistusaikataulu. Ennakkotilauksille ei ole
                toimituspäivätakuuta.
              </Typography>
              <Typography>
                Sitoudut maksamaan kaikki Maksullisista palveluista perittävät
                maksut, muun muassa kuukausittaiset tilausmaksut, käyttäjämaksut
                ja tarjousmaksut sekä muut maksut, taksat tai kulut, joiden
                oston hyväksyt osana Maksullisia palveluita maksuprosessin
                aikana (Maksut). Sitoudut maksamaan kaikki Maksut ja kaikki
                sovellettavat verot, jotka ovat syntyneet ennen sopimuksen
                irtisanomista tai peruuttamista.
              </Typography>
              <Typography>
                Valtuutat Ouran veloittamaan Maksulliset palvelut
                ilmoittamallasi maksutavalla. Ilmoittamalla hyväksyttävän
                maksutavan vakuutat, että sinulla on valtuudet käyttää
                määritettyä maksutapaa ja valtuutat meidät tai kolmannen
                osapuolen maksunkäsittelijämme veloittamaan valitsemallasi
                maksutavalla ostoksesi kokonaissumman, mukaan lukien mahdolliset
                verot ja muut maksut. Jos maksutapaa ei voida vahvistaa, se on
                virheellinen tai muuten ei ole hyväksyttävä, Maksulliset
                palvelusi voidaan keskeyttää tai peruuttaa. Sinun on ratkaistava
                kaikki ilmoittamaasi maksutapaan liittyvät mahdolliset ongelmat,
                joita kohtaamme, jotta voit jatkaa Palvelun käyttöä. Jos
                hyväksyt kampanjatarjouksen tai teet muutoksia Maksullisiin
                palveluihisi, laskutettavat maksut, verot ja summat voivat
                vaihdella. Laskutussummat voivat vaihdella myös sovellettavien
                verojen tai valuuttakurssien muutosten vuoksi. Valtuutat meidät
                tai kolmannen osapuolen maksunkäsittelijämme veloittamaan
                vastaavan summan valitsemallasi maksutavalla. Hyvityksiä ei
                makseta, ellei laki sitä edellytä. Tämä maksuvelvoite pysyy
                voimassa tämän Sopimuksen mistä tahansa syystä tehtävän
                irtisanomisen tai peruuttamisen jälkeen.
              </Typography>
              <Typography>
                Jos päätät rahoittaa oston kolmannen osapuolen
                maksunkäsittelijän kautta ja yhdellä tai useammalla tilaukseesi
                kuuluvalla tuotteella on pidennetty toimitusaika, lainamaksusi,
                korko mukaan lukien, saattavat erääntyä ennen kuin toimitamme
                kaikki tuotteet. Huomaathan, että et välttämättä saa hyvitystä
                koroista, jotka ovat jo kertyneet summasta, joka palautetaan
                myöhemmin.
              </Typography>
              <Typography Element="h2" variant="h3">
                Tilaukset
              </Typography>
              <Typography>
                Tietyt Maksulliset palvelut ovat tilaustuotteita, joihin
                sovelletaan seuraavia ehtoja:
              </Typography>
              <Typography>
                <strong>
                  Tilausjaksosi voi olla jatkuva, kuukausi tai vuosi
                  (Tilausjakso) Maksullisten palveluiden oston yhteydessä
                  esitetyn kuvauksen mukaisesti. Tilauksesi uusitaan
                  automaattisesti uudeksi Tilausjaksoksi, kunnes peruutat
                  Tilauksesi tai Oura keskeyttää tai irtisanoo sen. Ellemme ole
                  ilmoittaneet muuta, Tilausmaksu ja mahdolliset sovellettavat
                  verot ja muut maksut veloitetaan ilmoittamallasi maksutavalla
                  ennen kutakin Tilausjaksoa tai sen alussa. Ennen Tilausjakson
                  veloitusta ilmoitamme sinulle sovellettavista maksuista, ja
                  uusintatilaukseen sovelletaan tuolloin voimassa olevaa
                  Maksullisen palvelun hintaa.
                </strong>
              </Typography>
              <Typography>
                <strong>
                  Voit peruuttaa Tilauksesi milloin tahansa. Peruutuksesi tulee
                  voimaan käynnissä olevan Tilausjakson päättyessä. Jos haluat
                  peruuttaa tilauksen ja automaattisen maksun, napsauta
                  tilinäkymässäsi olevaa Cancel Account (Peruuta tili)
                  -painiketta tai lähetä meille sähköpostia osoitteeseen
                  support@ouraring.com. Peruutus ei oikeuta sinua aiemmin
                  maksettujen Maksujen hyvityksiin, etkä saa suhteellista
                  hyvitystä jäljellä olevalta Tilausjaksolta. Jos peruutat
                  Tilauksesi, huomioi, että saatamme edelleen lähettää sinulle
                  mainosviestintää, ellet kieltäydy vastaanottamasta näitä
                  viestejä noudattamalla viestinnässä annettuja tilauksen
                  peruutusohjeita.
                </strong>
              </Typography>
              <Typography>
                <strong>
                  Kun peruutat Tilauksen, peruutat vain Tilauksesi tulevat
                  veloitukset. Et saa hyvitystä käynnissä olevasta maksamastasi
                  Tilausjaksosta, mutta kyseinen Tilaus on edelleen täysin
                  käytettävissäsi kyseisen käynnissä olevan Tilausjakson loppuun
                  asti.
                </strong>{' '}
                Voimme milloin tahansa mistä tahansa syystä antaa joillekin tai
                kaikille käyttäjillemme hyvityksen, alennuksen tai muun
                vastikkeen (Maksualennukset). Tällaisten maksualennusten määrä
                ja muoto sekä niiden myöntämisestä päättäminen ovat täysin
                meidän harkintavallassamme. Maksualennusten tarjoaminen tietyssä
                tilanteessa ei oikeuta sinua saamaan maksualennuksia
                tulevaisuudessa vastaavissa tilanteissa, eikä se velvoita meitä
                antamaan maksualennuksia tulevaisuudessa.
              </Typography>
              <Typography>
                Jos asut Yhdysvaltojen ulkopuolella ja muutat mielesi ostoksesi
                suhteen, sinulla voi olla oikeus saada täysi hyvitys
                neljäntoista (14) päivän kuluessa (Peruuttamisaika), jos et ole
                kirjautunut sisään tai muutoin lunastanut tai alkanut käyttää
                Palveluita tilaajana Peruuttamisajan aikana.
              </Typography>
              <Typography>
                Saatamme aika ajoin tarjota ilmaisia kokeilujaksoja tietyistä
                Tilauksista määrätyksi ajanjaksoiksi ilman maksua.{' '}
                <strong>
                  Ennen ilmaisen kokeilujakson aloittamista ilmoitamme sinulle
                  sovellettavista Tilausmaksuista, jotka veloitetaan ilmaisen
                  kokeilujakson päättyessä. Jollet peruuta Tilaustasi ennen
                  ilmaisen kokeilujakson päättymistä edellä kuvatuilla tavoilla,
                  me laskutamme tai kolmannen osapuolen maksunkäsittelijämme
                  laskuttaa Tilausmaksusi sekä kaikki sovellettavat verot ja
                  muut maksut toistuvasti valitsemallasi maksutavalla niin kauan
                  kuin Tilauksesi jatkuu. Sinun on peruutettava Tilauksesi ennen
                  ilmaisen kokeilujakson päättymistä välttääksesi veloitukset.
                  Tilauksen peruuttamisohjeet on kuvattu yllä.
                </strong>
              </Typography>
              <Typography>
                Maksutietosi käsitellään ja tallennetaan kolmannen osapuolen
                maksunkäsittelijän kautta. Kaikilla maksullisen tilin
                haltijoilla on oltava vähintään yksi kelvollinen maksutapa
                Maksujen maksamiseen. Nämä kuvataan tarkemmin maksuprosessin
                yhteydessä. Kaikki Maksut lasketaan ja laskutetaan sinulta
                kuukausittain tai vuosittain valintasi mukaan, ja ne erääntyvät
                välittömästi vastaanottamisen jälkeen ja voivat muuttua.
                Hyväksyt, että Maksut ovat luonteeltaan toistuvia, ja hyväksyt
                vastuun kaikista toistuvista maksuista ennen peruutusta. Maksut
                veloitetaan tallennetulla, nimetyllä maksutavalla, jonka
                ilmoitat päivää ennen alkuperäisen ostopäivän kuukausittaista
                tai vuotuista vuosipäivää.
              </Typography>
              <Typography>
                Jos et ole kirjautunut sisään tai muutoin käyttänyt Palveluita
                kuuteen (6) kuukauteen tai pidempään sen jälkeen, kun olet
                ostanut tai vastaanottanut Tuotteen ilmaisen kokeilujakson
                aikana, pidätämme oikeuden irtisanoa tilauksesi, peruuttaa
                mahdolliset vireillä olevat ostot ja hyvittää sinulle vain
                Tuotteen ostohinnan. Sinulla ei ole oikeutta Tilauksen arvon
                hyvitykseen ilmaisen kokeilujakson aikana.
              </Typography>
              <Typography>
                Oura pidättää oikeuden muuttaa Maksullisten palveluidemme
                Maksuja tai Maksullisten palveluidemme ominaisuuksia tai osia
                milloin tahansa. Hyväksyt, että Oura voi muuttaa Maksullisten
                palveluiden Maksuja milloin tahansa. Jos tällainen muutos
                tehdään, Oura ilmoittaa siitä sinulle tiliisi liitetyn
                sähköpostiosoitteen kautta vähintään kolmekymmentä (30) päivää
                ennen muutoksen voimaantulopäivää. Palveluiden käytön jatkaminen
                osoittaa, että hyväksyt kaikki Maksujen muutokset. Olet yksin
                vastuussa kaikista sovellettavista veroista, ja sinulta
                veloitetaan verot lain niin vaatiessa.
              </Typography>
              <Typography Element="h2" variant="h3">
                Tiedot ja viestintä
              </Typography>
              <Typography>
                Oura voi kerätä ja käsitellä tietoja Palveluiden käytöstäsi.
                Annat suostumuksesi siihen, että Oura kerää ja käyttää tällaisia
                tietoja sekä jakaa tällaisia tietoja kolmannen osapuolen
                palveluntarjoajien kanssa Palveluiden toimittamista,
                markkinointia ja parantamista varten sekä mistä tahansa muusta
                Tietosuojakäytännössä kuvatusta syystä. Kaikkia Ouran keräämiä
                henkilötietoja käsitellään Tietosuojakäytännön mukaisesti.
              </Typography>
              <Typography>
                <strong>
                  Hyväksymällä tämän sopimuksen ehdot ja antamalla yhteystietosi
                  Ouralle annat nimenomaisen suostumuksesi siihen, että Oura,
                  sen tytäryhtiöt ja edustajat voivat ottaa sinuun ajoittain
                  yhteyttä minkä tahansa Ouralle ilmoittamasi postiosoitteen,
                  puhelinnumeron tai sähköpostiosoitteen kautta.
                </strong>{' '}
                Suostumuksesi tarkoittaa, että suostut siihen, että Oura ja sen
                palveluntarjoajat ottavat sinuun yhteyttä puhelimitse,
                sähköpostilla, tekstiviestillä tai muulla tavalla mitä tahansa
                tarkoitusta varten, mukaan lukien muun muassa ilmoitukset, jotka
                liittyvät Palveluihin ja tiliisi, tilauksiin, ostoihin,
                saatavilla oleviin päivityksiin, laskutukseen ja
                maksunkäsittelyasioihin sekä telemarkkinointiin. Tällaisessa
                hyväksytyssä viestinnässä saatetaan käyttää automatisoitua
                numeronvalintateknologiaa tai ennalta nauhoitettuja viestejä.
                Sinä vastaat maksuista, joita palveluntarjoajasi voi veloittaa
                sinulta, kun otamme sinuun yhteyttä. Tiedostat myös, että
                suostumuksesi edellä mainittuun ei ole Ouran Palveluiden käytön
                ehto, ja jos et halua antaa suostumustasi, voit ottaa meihin
                yhteyttä ja pyytää, että sinut lisätään
                yhteydenottokieltoluetteloon, tai voit peruuttaa suostumuksesi
                milloin vain valitsemalla kaiken tällaisen viestinnän yhteydessä
                annettavan kieltäytymisvaihtoehdon.
              </Typography>
              <Typography>
                Oura sanoutuu irti kaikesta tämän Sopimuksen mukaisesta
                vastuusta kaikkiin niihin tietoihin liittyen, jotka annat
                Ouralle ja jotka voivat olla sähköisiä potilastietoja tai
                vastaavia tietoja, joita sinä tai loppukäyttäjä toimitatte,
                lukuun ottamatta mistään tämän sopimuksen vastaisesta tai
                sovellettavan liittovaltion, osavaltion tai kansainvälisen
                lainsäädännön, sääntöjen tai määräysten edellyttämästä.
              </Typography>
              <Typography Element="h2" variant="h3">
                Teollis- ja tekijänoikeudet
              </Typography>
              <Typography>
                ŌURA, Ō ja OURA ovat Ōura Health Oy:n tavaramerkkejä. Ouran
                sisältö, Ouran Tuotteet, Ouran ominaisuudet ja Palvelut sekä
                taustalla oleva teknologiamme on suojattu tekijänoikeuksilla,
                tavaramerkeillä, patenteilla, immateriaalioikeuksilla ja muilla
                Yhdysvaltojen ja ulkomaiden laeilla. Kaikki oikeudet pidätetään.
                Sinulle ei myönnetä epäsuorasti tai muuten mitään lisenssiä tai
                oikeutta käyttää Palveluissa näkyviä tai niiden yhteydessä
                käytettäviä tai näytettäviä merkkejä (Tavaramerkit). Palvelut
                voivat myös sisältää tai niissä voidaan viitata kolmannen
                osapuolen tavaramerkkeihin, kauppanimiin, tuotenimiin ja
                logoihin, jotka voivat olla omistajiensa rekisteröityjä
                tavaramerkkejä. Tavaramerkkejä ei saa missään tapauksessa
                käyttää tai kopioida. Minkään tässä esitettyä ei pidä tulkita
                lisenssiksi tai oikeudeksi käyttää mitään Palvelujen yhteydessä
                näytettäviä Tavaramerkkejä ilman Ouran nimenomaista kirjallista
                lupaa.
              </Typography>
              <Typography>
                Kaikki Palveluihin ja tähän Sopimukseen liittyvä sisältö, mukaan
                lukien muun muassa Sivusto, Tuote, Mobiilisovellus, kaikki
                teksti, grafiikka, käyttöliittymät, visuaaliset rajapinnat,
                valokuvat, kuvat/videot, sähköinen taide, äänet/audio, data,
                viestintäohjelmat, suoritettava koodi, tietokonekoodi ja tiedot
                (yhdessä Sisältö), joka on muotoiltu, järjestetty ja kerätty eri
                muodoissa, mukaan lukien tällaisen Sisällön suunnittelu,
                rakenne, valinta, koordinointi, ilmaisu, ”ulkonäkö ja
                vaikutelma”, järjestely, asettelut, sivut, näkymät ja
                tietokannat, jotka sisältyvät Sisältöön, Palveluihin ja
                taustalla olevaan teknologiaan, sekä kaikki muut Palveluihin
                liittyvät tekijänoikeudella suojatut teokset (Tekijänoikeudella
                suojatut teokset), ovat yksinomaan Ouran omistamia, hallinnoimia
                tai lisensoimia tai Ouralle lisensoituja, ja ne on suojattu
                Yhdysvaltain ja kansainvälisillä tekijänoikeuslaeilla. Hyväksyt,
                että et suoraan tai epäsuorasti kopioi, jäljennä, muokkaa,
                jakele tai esittele julkisesti Tekijänoikeudella suojattuja
                teoksia tai luo niistä jälkiperäisteoksia ilman Ouran etukäteen
                antamaa kirjallista lupaa.
              </Typography>
              <Typography>
                Jos toimitat Ouralle postitse, sähköpostitse, puhelimitse tai
                muulla tavalla viestejä tai aineistoja, joissa ehdotat tai
                suosittelet muutoksia Palveluihin, mukaan lukien rajoituksetta
                niihin liittyviä uusia ominaisuuksia tai toimintoja, tai
                kommentteja, kysymyksiä, ehdotuksia tai vastaavia (Palaute),
                Ouralla on oikeus käyttää vapaasti tällaista Palautetta mistään
                muusta Osapuolten välisestä tällaiseen Palautteeseen
                sovellettavasta velvoitteesta tai rajoituksesta huolimatta. Oura
                voi vapaasti käyttää Palautteeseen sisältyviä ideoita,
                tietotaitoa, konsepteja, tekniikoita tai muita
                immateriaalioikeuksia mihin tahansa tarkoitukseen ilman, että
                siitä seuraa mitään ansiota tai korvausta millekään osapuolelle,
                vaikka Oura ei ole velvollinen käyttämään mitään Palautetta.
              </Typography>
              <Typography>
                Oura kunnioittaa muiden teollis- ja tekijänoikeuksia, ja
                käytäntömme on käsitellä ja tarkistaa nopeasti ilmoitukset
                väitetystä tekijänoikeuslakien tai muiden sovellettavien
                immateriaalioikeuslakien rikkomuksista. Kaikki ilmoitukset
                väitetystä rikkomuksesta on lähetettävä Ouran valtuutetulle
                edustajalle osoitteeseen ip@ouraring.com, ja niiden on
                sisällettävä kaikki seuraavat tiedot: (i) tekijänoikeuden
                omistajan tai tekijänoikeuden omistajan puolesta toimivan
                valtuutetun henkilön allekirjoitus (fyysinen tai sähköinen);
                (ii) tekijänoikeudella suojatun teoksen kuvaus, jota väität
                loukatun; (iii) kuvaus aineistosta, jonka väität loukkaavan
                tekijänoikeuksia ja joka on poistettava tai johon pääsy on
                estettävä, ja riittävät tiedot, jotta Ouran ylläpitäjät voivat
                löytää aineiston; (iv) riittävät tiedot, jotta voimme ottaa
                sinuun yhteyttä, kuten osoite, puhelinnumero ja
                sähköpostiosoite; (v) lausunto siitä, että sinulla on vilpitön
                usko siihen, että aineiston käyttö valituksen kohteena olevalla
                tavalla ei ole tekijänoikeuden omistajan, sen edustajan tai lain
                valtuuttamaa; ja (vi) lausunto siitä, että ilmoituksessa olevat
                tiedot ovat oikeita ja että olet tekijänoikeuden omistaja tai
                että sinulla on valtuudet toimia väitetysti loukatun
                tekijänoikeuden omistajan puolesta, väärästä valasta annettavan
                rangaistuksen uhalla.
              </Typography>
              <Typography Element="h2" variant="h3">
                Takuun vastuuvapausilmoitus
              </Typography>
              <Typography>
                PALVELUT TARJOTAAN SINULLE ”SELLAISENAAN KAIKKINE VIKOINEEN” JA
                ”SELLAISENA KUIN NE OVAT SAATAVILLA” ILMAN MINKÄÄNLAISTA
                TAKUUTA, JA OURA JA SEN TYTÄRYHTIÖT, OSAKKUUSYHTIÖT,
                VIRKAILIJAT, JOHTAJAT, TYÖNTEKIJÄT, EDUSTAJAT, ASIAMIEHET,
                KUMPPANIT JA LISENSSINANTAJAT TÄTEN SANOUTUVAT IRTI KAIKISTA
                PALVELUIHIN LIITTYVISTÄ TAKUISTA JA EHDOISTA RIIPPUMATTA SIITÄ,
                OVATKO NE NIMENOMAISIA VAI EPÄSUORIA, JA NIMENOMAISESTI
                KIISTÄVÄT KAIKKI VÄLILLISET TAKUUT OMISTUSOIKEUDESTA,
                MYYNTIKELPOISUUDESTA, SOVELTUVUUDESTA TIETTYYN TARKOITUKSEEN,
                TYYDYTTÄVÄSTÄ LAADUSTA JA LOUKKAAMATTOMUUDESTA. OURA EI TAKAA,
                ETTÄ VOIT NAUTTIA PALVELUISTA HÄIRIÖTTÄ, SISÄLLÖN SAATAVUUTTA,
                ETTÄ PALVELUIHIN SISÄLTYVÄT TOIMINNOT TÄYTTÄVÄT VAATIMUKSESI,
                ETTEI PALVELUISSA OLE VIRUKSIA TAI MUITA HAITALLISIA
                KOMPONENTTEJA, ETTÄ PALVELUIDEN TOIMINTA ON KESKEYTYMÄTÖNTÄ TAI
                VIRHEETÖNTÄ, ETTÄ PALVELUISSA OLEVAT VIAT KORJATAAN TAI
                PALVELUIHIN SISÄLTYVÄT TOIMINNOT TOIMIVAT MUIDEN
                MOBIILISOVELLUSTEN TAI -LAITTEIDEN KANSSA TAI JÄRJESTELMÄN
                SISÄLLÄ. OURAN TAI OURAN VALTUUTETUN EDUSTAJAN ANTAMAT SUULLISET
                TAI KIRJALLISET TIEDOT TAI NEUVOT EIVÄT MUODOSTA TAKUUTA.
                JOILLAKIN LAINKÄYTTÖALUEILLA EI SALLITA KULUTTAJAN SOVELLETTAVIA
                LAKISÄÄTEISIÄ OIKEUKSIA KOSKEVIEN EPÄSUORIEN TAKUIDEN TAI
                RAJOITUSTEN POISSULKEMISTA, JOTEN EDELLÄ MAINITTUA
                POISSULKEMISTA EI VÄLTTÄMÄTTÄ SOVELLETA.
              </Typography>
              <Typography>
                EDELLÄ ESITETYSTÄ HUOLIMATTA OURA ANTAA ALKUPERÄISELLE
                LOPPUKÄYTTÄJÄLLE TAKUUN SIITÄ, ETTÄ TUOTTEESSA EI OLE
                MATERIAALI- TAI VALMISTUSVIRHEITÄ YHDEN (1) VUODEN AJAN
                OSTOPÄIVÄSTÄ. Jos ostohetkellä voimassa oleva paikallinen laki
                edellyttää pidempää takuuaikaa kuin yksi (1) vuosi, tätä takuuta
                pidennetään kyseisen lain edellyttämässä laajuudessa.
                Takuuaikana Oura korjaa tai vaihtaa veloituksetta kaikki
                Tuotteen osat, jotka eivät täytä rajoitetun takuun ehtoja. Sinä
                vastaat kaikista asiaan liittyvistä kuljetusmaksuista. Korvaavat
                tuotteet voivat olla uusia tai kunnostettuja harkintamme mukaan.
                Tämä rajoitettu takuu ei koske (i) normaalia kulumista, mukaan
                lukien naarmut ja lommot; (ii) Tuotteeseen sisältyviä
                kulutusosia, kuten akkuja, ellei Tuote ole vaurioitunut
                materiaali- tai valmistusvirheen vuoksi; (iii) vahinkoa, joka
                johtuu siitä, ettet ole käyttänyt Tuotetta Ōura-Tuotteen mukana
                toimitettujen tai verkkosivustossa saatavilla olevien ohjeiden
                mukaisesti; (iv) vahinkoa, joka johtuu onnettomuudesta,
                tulvasta, palosta, virheellisestä käytöstä tai väärinkäytöstä;
                (v) vahinkoa, joka johtuu muun kuin Ōuran valtuuttaman tahon
                tekemästä huollosta tai Tuotteen peukaloinnista tai Tuotteeseen
                tekemistä muutoksista; tai (vi) Tuotteen käyttöä muulla
                sovelluksella tai ohjelmistolla kuin Mobiilisovelluksella.
              </Typography>
              <Typography>
                Oura pidättää yksinoikeuden Tuotteen korjaamiseen tai
                korvaamiseen tai täyden hyvityksen tarjoamiseen oman harkintansa
                mukaan. Tällainen korvaus on ainoa ja yksinomainen korvaus tämän
                rajoitetun takuun rikkomuksesta. Takuukorjauksilla ja
                korvaavilla Tuotteilla on uusi takuu, joka on yhdeksänkymmentä
                (90) päivää tai alkuperäisen yhden (1) vuoden takuun jäljellä
                oleva osa sen mukaan, kumpi on pidempi.
              </Typography>
              <Typography Element="h2" variant="h3">
                Vastuunrajoitus
              </Typography>
              <Typography>
                OURA, SEN TYTÄRYHTIÖT, OSAKKUUSYHTIÖT, VIRKAILIJAT, JOHTAJAT,
                TYÖNTEKIJÄT, EDUSTAJAT, ASIAMIEHET, KUMPPANIT JA
                LISENSSINANTAJAT EIVÄT MISSÄÄN TAPAUKSESSA OLE MINKÄÄN
                OIKEUDELLISEN TEORIAN NOJALLA VASTUUSSA MISTÄÄN VAHINGOISTA,
                JOTKA JOHTUVAT SIITÄ TAI LIITTYVÄT SIIHEN, ETTÄ KÄYTÄT
                PALVELUITA TAI PALVELUIHIN LIITTYVÄÄ SISÄLTÖÄ TAI MUITA
                SIVUSTOJA TAI MUITA PALVELUIDEN KAUTTA SAATUJA PALVELUITA TAI
                TUOTTEITA, TAI JOTKA JOHTUVAT SIITÄ TAI LIITTYVÄT SIIHEN,
                ETTEIVÄT NÄMÄ OLE KÄYTETTÄVISSÄ, MUKAAN LUKIEN SUORAT,
                EPÄSUORAT, ERITYISET, SATUNNAISET, VÄLILLISET, TAI RANKAISEVAT
                VAHINGONKORVAUKSET, MUKAAN LUKIEN, MUTTA NIIHIN RAJOITTUMATTA,
                HENKILÖVAHINGOT, KIPU JA KÄRSIMYS, EMOTIONAALINEN KÄRSIMYS,
                TULOJEN MENETYS, VOITTOJEN MENETYS, LIIKETOIMINNAN TAI
                ODOTETTAVISSA OLEVIEN SÄÄSTÖJEN MENETYS,
                LIIKETOIMINTAMAHDOLLISUUKSIEN MENETYS, LIIKETOIMINNAN
                KESKEYTYMINEN, KÄYTÖN MENETYS, LIIKEARVON MENETYS, TIETOJEN
                MENETYS, JA RIIPPUMATTA SIITÄ, JOHTUUKO SE RIKKOMUKSESTA (MUKAAN
                LUKIEN LAIMINLYÖNTI), SOPIMUSRIKKOMUKSESTA TAI MUUSTA SYYSTÄ,
                VAIKKA SE OLISI ENNAKOITAVISSA. NÄITÄ RAJAUKSIA TAI RAJOITUKSIA
                SOVELLETAAN RIIPPUMATTA SIITÄ, ONKO OURAA VAROITETTU TÄLLAISTEN
                VAHINKOJEN MAHDOLLISUUDESTA.
              </Typography>
              <Typography>
                EDELLÄ ESITETTY EI VAIKUTA VASTUUSEEN, JOTA SOVELLETTAVAN LAIN
                MUKAAN EI VOIDA SULKEA POIS TAI RAJOITTAA. SILTÄ OSIN KUIN
                VASTUUTA EI VOIDA SULKEA POIS TAI RAJOITTAA EDELLÄ ESITETYLLÄ
                TAVALLA, OURAN KORVAUSVELVOLLISUUS EI MISSÄÄN TAPAUKSESSA OLE
                YLI 100 EUROA MISTÄÄN KORVAUSVAATIMUKSESTA, OLIPA KYSE
                SOPIMUKSESTA, RIKKOMUKSESTA TAI MISTÄ TAHANSA MUUSTA MINKÄ
                TAHANSA KORVAUSVELVOLLISUUSTEORIAN ALAISUUTEEN KUULUVASTA.
              </Typography>
              <Typography Element="h2" variant="h3">
                Varoitukset
              </Typography>
              <Typography>
                PALVELUT EIVÄT OLE LÄÄKINNÄLLISIÄ LAITTEITA JA HYVÄKSYT
                NIMENOMAISESTI, ETTÄ PALVELUIHIN EI LIITY OURAN
                LÄÄKETIETEELLISTÄ NEUVONTAA. PALVELUIDEN TARKOITUKSENA EI OLE
                DIAGNOSOIDA, HOITAA, PARANTAA TAI ESTÄÄ TAUTEJA TAI SAIRAUKSIA.
                PALVELUT ON TARKOITETTU VAIN TIEDOKSI, EIVÄTKÄ NE VOI KORVATA
                LÄÄKÄREIDEN TAI LÄÄKETIETEEN AMMATTILAISTEN PALVELUJA.
              </Typography>
              <Typography>
                PALVELUITA, MUKAAN LUKIEN KAIKKI TIEDOT, TEKSTIT, VALOKUVAT,
                KUVAT, KUVITUKSET, GRAFIIKAT, ÄÄNI-, VIDEO- SEKÄ ÄÄNI- JA
                VIDEOLEIKKEET JA MUUT AINEISTOT, OLIVATPA NE MEIDÄN TAI
                KOLMANSIEN OSAPUOLTEN TOIMITTAMIA, EI OLE TARKOITETTU
                KÄYTETTÄVIKSI EIKÄ NIITÄ PIDÄ KÄYTTÄÄ (a) LÄÄKÄRIN TAI MUIDEN
                LÄÄKETIETEEN AMMATTILAISTEN ANTAMIEN OHJEIDEN, (b)
                LÄÄKÄRISSÄKÄYNNIN, LÄÄKÄRILLE SOITON TAI NEUVOJEN KYSYMISEN
                LÄÄKÄRILTÄ TAI MUILTA LÄÄKETIETEEN AMMATTILAISILTA TAI (c)
                MINKÄÄN TUOTTEEN PAKKAUKSESSA TAI ETIKETISSÄ OLEVIEN TIETOJEN
                SIJASTA.
              </Typography>
              <Typography>
                JOS SINULLA ON KYSYTTÄVÄÄ TERVEYDESTÄ, OTA YHTEYS LÄÄKÄRIIN TAI
                MUUHUN TERVEYDENHUOLLON AMMATTILAISEEN VÄLITTÖMÄSTI. SOITA
                HÄTÄTILANTEESSA VÄLITTÖMÄSTI LÄÄKÄRILLESI TAI HÄTÄNUMEROON. ÄLÄ
                KOSKAAN JÄTÄ HUOMIOIMATTA LÄÄKETIETEELLISTÄ NEUVONTAA TAI
                VIIVYTTELE LÄÄKÄRIN HOITOON HAKEUTUMISESSA PALVELUJEN
                SISÄLTÄMIEN TIETOJEN VUOKSI ÄLÄKÄ KÄYTÄ PALVELUITA TAI
                PALVELUISSA ANNETTAVIA TIETOJA TERVEYSONGELMAN DIAGNOSOINTIIN
                TAI HOITOON. PALVELUIDEN LÄHETTÄMINEN JA VASTAANOTTAMINEN
                KOKONAAN TAI OSITTAIN TAI VIESTINTÄ INTERNETIN, SÄHKÖPOSTIN TAI
                MUIDEN KEINOJEN KAUTTA EI MUODOSTA TAI LUO LÄÄKÄRIN JA POTILAAN,
                TERAPEUTIN JA POTILAAN TAI TERVEYDENHUOLLON AMMATTILAISEN JA
                POTILAAN VÄLISTÄ SUHDETTA SINUN JA OURAN VÄLILLE.
              </Typography>
              <Typography>
                Kysy aina neuvoa lääkäriltä, ennen kuin teet muutoksia uni- tai
                liikuntatottumuksiisi Palveluiden kautta annettujen tietojen
                perusteella, tai jos sinulla on kysyttävää sairaudesta. Oura ei
                ole vastuussa terveysongelmista, jotka voivat johtua Palveluiden
                kautta saamistasi tiedoista. Jos teet muutoksia uni- tai
                liikuntatottumuksiisi Palveluiden perusteella, hyväksyt, että
                teet sen täysin omalla vastuullasi. On tärkeää tarkkailla
                tarkasti kehosi reaktioita. Jos tunnet esimerkiksi
                odottamatonta, toistuvaa tai pitkäaikaista kipua, väsymystä tai
                epämukavuutta, joka johtuu uni- tai liikuntatottumustesi
                muutoksista, on suositeltavaa, että otat yhteyttä lääkäriin
                ennen tällaisten muutosten jatkamista. Palveluiden tiedot voivat
                olla harhaanjohtavia, jos fysiologiset toimintosi ja vasteesi
                poikkeavat merkittävästi väestön keskiarvoista sairauksien tai
                harvinaisten luonnollisten erojen vuoksi.
              </Typography>
              <Typography>
                Ole varovainen, ettei käyttämäsi Tuote jää kiinni kiinteisiin
                rakenteisiin tai raskaisiin esineisiin. Jos sormessasi ilmenee
                punoitusta tai ihoärsytystä Tuotteen käytön aikana, poista se
                välittömästi. Jos oireet jatkuvat yli 2–3 päivää Tuotteen
                poistamisen jälkeen, ota yhteyttä lääkäriin.
              </Typography>
              <Typography>
                Tuotettamme ei saa koskaan laittaa suuhun. Ouran Tuote ei ole
                lelu eikä sitä ole tarkoitettu lasten käyttöön. Lapsia ei saa
                jättää ilman valvontaa tämän Tuotteen kanssa, koska se voi
                aiheuttaa tukehtumisvaaran.
              </Typography>
              <Typography>
                Palveluissa voidaan tarjota linkkejä muille kolmansien
                osapuolten ylläpitämille verkkosivustoille. Ymmärrät ja
                hyväksyt, että tällaisia linkkejä tarjotaan sinulle vain
                mukavuuspalveluna ja ettei se tarkoita, että Oura kannattaa tai
                tukee tällaista linkitetyn sivuston tarjoajaa tai olisi
                yhteydessä tai liikesuhteessa sellaiseen tai että Oura antaisi
                takuita tällaisen linkitetyn sivuston laadusta, luotettavuudesta
                tai mistään muusta ominaisuudesta tai toiminnosta. Lisäksi
                ymmärrät ja hyväksyt, että Oura ei ole millään tavalla vastuussa
                (mukaan lukien rajoituksetta mahdolliset menetykset tai
                vahingot) mistään linkitettyyn sivustoon liittyvästä asiasta,
                mukaan lukien rajoituksetta, tällaisella linkitetyllä sivustolla
                tai sen kautta tarjotusta sisällöstä tai siitä, että käytät
                tällaista sisältöä. Lisäksi sinun tulisi olla tietoinen siitä,
                että kolmannen osapuolen sivuston käyttöön sovelletaan kyseiseen
                sivustoon sovellettavia ehtoja, mukaan lukien kyseisen sivuston
                tietosuojakäytännöt (tai niiden puute). Jos kolmas osapuoli
                muodostaa linkin Palveluihin, se ei välttämättä tarkoita, että
                Oura kannattaa tai tukee tällaista kolmatta osapuolta tai että
                Oura olisi yhteydessä tai liikesuhteessa tällaiseen kolmanteen
                osapuoleen. Oura ei välttämättä edes tiedä, että kolmas osapuoli
                on linkittänyt Palvelut.
              </Typography>
              <Typography>
                Muun kuin Ouran omistaman sisällön omistaa kyseisen sisällön
                omistaja. Ymmärrät ja hyväksyt, että tällaisen sisällön tarjoaa
                sen omistaja eikä se tarkoita Ouran tukea, kumppanuutta,
                suhdetta tai sponsorointia tällaisen sisällön tarjoajan suhteen.
                Lisäksi ymmärrät ja hyväksyt, että Oura ei ole millään tavalla
                vastuussa (mukaan lukien rajoituksetta mahdollisesti kärsimäsi
                menetykset tai vahingot) kolmansien osapuolten tarjoamasta
                sisällöstä, mukaan lukien rajoituksetta se, että käytät
                sisältöä. OURA EI ANNA MINKÄÄN KOLMANNEN OSAPUOLEN SISÄLTÖÖN
                LIITTYVIÄ VAKUUTUKSIA TAI TAKUITA.
              </Typography>
              <Typography>
                Sitoudut suojaamaan ja turvaamaan Ouran, sen tytäryhtiöt,
                osakkuusyhtiöt, virkamiehet, johtajat, työntekijät, edustajat,
                asiamiehet, kumppanit, lisenssinantajat, seuraajat ja
                luovutuksensaajat ja puolustamaan niitä kaikilta kanteilta,
                oikeusjutuilta, vahingonkorvausvaatimuksilta, vahingoilta,
                veloilta, vaatimuksilta tai korvausvastuilta, mukaan lukien
                kohtuulliset kulut ja asianajajien palkkiot, joita kuka tahansa
                henkilö esittää ja jotka johtuvat (i) Palveluiden käytöstäsi,
                mukaan lukien mutta ei rajoittuen siihen, että joku muu käyttää
                tiliäsi tai Tunnistetietojasi; (ii) siitä, että sinä rikot tai
                joku muu, joka käyttää tiliäsi tai Tunnistetietojasi, rikkoo
                tätä Sopimusta; (iii) jostakin tiliisi tai Tunnistetietojesi
                yhteydessä käytetystä, tallennetusta tai siirretystä tiedosta;
                (iv) siitä, että sinä rikot tai joku, joka käyttää tiliäsi tai
                Tunnistetietojasi, rikkoo minkä tahansa kolmannen osapuolen
                oikeuksia, mukaan lukien rajoituksetta yksityis-, julkisuus-,
                henkisen omaisuuden tai muut omistusoikeudet; tai (v) minkä
                tahansa lain, säädöksen tai muun lakisääteisen velvollisuuden
                rikkomisesta tai jotka liittyvät johonkin näistä.
              </Typography>
              <Typography Element="h2" variant="h3">
                Ilmoitus kalifornialaisille käyttäjille
              </Typography>
              <Typography>
                Kalifornian siviililain pykälän 1789.3 mukaan Palvelujen
                kalifornialaisiin käyttäjiin sovelletaan seuraavaa erityistä
                kuluttajan oikeuksia koskevaa mainintaa:
              </Typography>
              <Typography>
                Kalifornian kuluttaja-asiainministeriön kuluttajapalvelujaoston
                valitusavustusyksikköön voi ottaa yhteyttä kirjallisesti
                osoitteeseen 1625 N. Market Blvd., Suite N 112, Sacramento,
                California 95834, tai puhelimitse soittamalla numeroon (800) 952
                5210.
              </Typography>
              <Typography Element="h2" variant="h3">
                Irtisanominen; peruuttaminen
              </Typography>
              <Typography>
                Tämä sopimus on voimassa, kunnes se irtisanotaan tai peruutetaan
                tämän Sopimuksen mukaisesti.
              </Typography>
              <Typography>
                Ouralla on oikeus irtisanoa tämä Sopimus (i) mistä tahansa
                syystä ilmoittamalla siitä sinulle kolmekymmentä (30) päivää
                etukäteen; (ii) välittömästi, jos rikot tätä Sopimusta
                olennaisella tavalla, lukuun ottamatta Maksujen suorittamatta
                jättäminen; tai (iii) Maksujen suorittamatta jättämisen vuoksi.
                Edellä esitetystä huolimatta Oura pidättää oikeuden oman
                harkintansa mukaan ja ilman erillistä ilmoitusta milloin tahansa
                ja mistä tahansa syystä poistaa Palvelun, muuttaa Palvelua tai
                keskeyttää tai estää pääsyn Palveluihin tai Palveluiden käytön
                kokonaisuudessaan tai osittain.
              </Typography>
              <Typography>
                Voit irtisanoa Sopimuksen mistä tahansa syystä ilmoittamalla
                siitä Ouralle kolmekymmentä (30) päivää etukäteen sähköpostitse
                osoitteeseen support@ouraring.com. Olet velvollinen maksamaan
                kaikki ennen irtisanomisaikaa ja sen aikana kertyneet Maksut.
              </Typography>
              <Typography>
                Tämän Sopimuksen kohdat, joiden otsikko on Varoitukset, Teollis-
                ja tekijänoikeudet, Tiedot ja viestintä, Korvaukset, Takuun
                vastuuvapausilmoitus, Vastuunrajoitus, Sovellettava laki;
                foorumi; pakollinen sitova välimiesmenettely; ryhmäkanteista
                vapautus ja maksuvelvoitteet Maksuista, jotka ovat kertyneet
                ennen irtisanomisaikaa ja sen aikana, pysyvät voimassa tämän
                Sopimuksen irtisanomisen jälkeen huolimatta siitä, mistä syystä
                Sopimus on irtisanottu.
              </Typography>
              <Typography Element="h2" variant="h3">
                Liittovaltion viranomaisten loppukäyttörajoitukset
              </Typography>
              <Typography>
                Jos olet Yhdysvaltain liittovaltion ministeriö tai virasto tai
                teet sopimuksia tällaisen osaston tai viraston puolesta,
                palvelut ovat ”kaupallisia tuotteita” siinä merkityksessä, jossa
                kyseinen termi on määritelty kohdassa 48 C.F.R. §2.101, joka
                koostuu ”kaupallisista tietokoneohjelmistoista” ja
                ”kaupallisista tietokoneohjelmistodokumentaatioista”, siinä
                merkityksessä, jossa näitä termejä käytetään pykälässä 48 C.F.R.
                §12.212 tai 48 C.F.R. §227.7202. Pykälän 48 C.F.R. §12.212 tai
                48 C.F.R. §227.7202-1–227.7202-4 soveltuvin osin Palvelu on
                lisensoitu sinulle vain tämän Sopimuksen ehtojen mukaisin
                oikeuksin.
              </Typography>
              <Typography Element="h2" variant="h3">
                Viennin vaatimustenmukaisuus ja käyttörajoitukset
              </Typography>
              <Typography>
                Sinulla ei ole oikeutta viedä tai jälleenviedä Palveluita tai
                mitään niihin liittyviä teknisiä tietoja suoraan tai
                välillisesti mihinkään kohteeseen tai kenellekään henkilölle,
                johon tai jolle vieminen tai jälleenvieminen on sovellettavan
                lain mukaan kielletty tai rajoitettu, mukaan lukien
                rajoituksetta kaikki sovellettavat Yhdysvaltojen vientivalvontaa
                koskevat lait ja määräykset.
              </Typography>
              <Typography Element="h2" variant="h3">
                Sovellettava laki; foorumi; pakollinen sitova välimiesmenettely,
                ryhmäkanteista vapautus
              </Typography>
              <Typography>
                Kaikkia tähän Sopimukseen, Palveluihin ja suhteeseesi Ouraan
                liittyviä kanteita säännellään, analysoidaan ja tulkitaan
                Kalifornian osavaltion lakien mukaisesti ottamatta huomioon sen
                lainvalintaperiaatteita, EIKÄ NIITÄ SÄÄNNELLÄ NIMENOMAISESTI
                TAVAROIDEN KANSAINVÄLISTÄ MYYNTIÄ KOSKEVIA SOPIMUKSIA KOSKEVIEN
                YK:N YLEISSOPIMUSTEN MUKAISESTI, JOS NIITÄ SOVELLETAAN MUUTOIN.
                Hyväksyt sen, että tästä Sopimuksesta tai Palveluista johtuvat
                tai niihin liittyvät riidat tai vaatimukset ratkaistaan yhden
                välimiehen toimittaman lopullisen ja sitovan välimiesmenettelyn
                kautta. Tähän sisältyvät riidat, jotka johtuvat tämän Pakollinen
                sitova välimiesmenettely -kohdan tulkinnasta tai soveltamisesta
                tai liittyvät siihen, mukaan lukien sen
                täytäntöönpanokelpoisuus, peruutettavuus tai voimassaolo. Edellä
                esitetystä huolimatta kumpikin osapuoli voi nostaa kanteen
                yksinomaan kieltomääräystä varten, jonka tarkoituksena on
                lopettaa Palveluiden luvaton käyttö tai väärinkäyttö tai
                immateriaalioikeuksien loukkaaminen. Jollei Pakollisesta
                sitovasta välimiesmenettelystä muuta johdu, osapuolet suostuvat
                peruuttamattomasti nostamaan kanteen tämän Sopimuksen nojalla
                syntyneiden tai siihen liittyvien vaatimusten ratkaisemiseksi
                tai panemiseksi täytäntöön liittovaltion tai osavaltion
                tuomioistuimissa San Franciscossa, Yhdysvaltain Kaliforniassa,
                ja kumpikin osapuoli hyväksyy peruuttamattomasti näiden
                tuomioistuinten yksinomaisen toimivallan kaikissa tällaisissa
                kanteissa, riita-asioissa tai menettelyissä. Ellei sovellettava
                laki sitä kiellä, osapuolet sopivat, että Palveluiden tai tämän
                Sopimuksen käytöstä johtuva tai siihen liittyvä vaatimus tai
                kanne on jätettävä yhden (1) vuoden kuluessa tällaisen
                vaatimuksen tai kanneperusteen syntymisestä tai sen voimassaolon
                päättymisestä. Tätä kohtaa ei sovelleta Euroopan unionissa
                asuviin käyttäjiin. Jos olet Euroopan unionissa asuva käyttäjä,
                tähän Sopimukseen sovelletaan Suomen lakia ja Suomen
                tuomioistuimilla on yksinomainen toimivalta käsitellä tähän
                Sopimukseen liittyviä riita-asioita. Tätä säännöstä ei sovelleta
                kuluttajiin maissa, joissa sopimuksiin sovelletaan kuluttajan
                maan paikallisia lakeja. Englannin kieltä sovelletaan
                ensisijaisena kielenä kaikkiin tämän Sopimuksen asiakirjoihin,
                ilmoituksiin ja tulkintoihin. Sitoudut myös luopumaan oikeudesta
                esittää vaatimuksia Ouraa vastaan edustajana tai jäsenenä missä
                tahansa ryhmä- tai edustuksellisessa kanteessa, paitsi jos
                tällainen luopuminen on kielletty lailla tai tuomioistuin katsoo
                sen olevan yleisen oikeusjärjestyksen vastaista.
              </Typography>
              <Typography Element="h2" variant="h3">
                Erinäiset määräykset
              </Typography>
              <Typography>
                Hyväksyt, että Ouralla on oikeus valvoa Palveluiden käyttöä
                varmistaakseen Sopimuksen noudattamisen.
              </Typography>
              <Typography>
                Tämän sopimuksen ehdoista tai määräyksistä luopumisen, olipa sen
                syynä yhdessä tai useammassa tapauksessa käyttäytyminen tai muu
                syy, ei katsota tarkoittavan tai osoittavan luopumista mistään
                muusta tämän Sopimuksen ehdosta, määräyksestä tai edellytyksestä
                riippumatta siitä, ovatko ne samankaltaisia, eikä tällainen
                luopuminen muodosta jatkuvaa luopumista mistään tällaisesta
                ehdosta, määräyksestä tai edellytyksestä. Oikeudesta luopuminen
                ei ole sitova, ellei luopumisen tehnyt osapuoli ole tehnyt sitä
                kirjallisesti.
              </Typography>
              <Typography>
                Sinulla ei ole oikeutta luovuttaa tätä Sopimusta toiselle
                osapuolelle, ja kaikki yritykset tehdä niin ovat mitättömiä.
              </Typography>
              <Typography>
                Jos jokin tämän Sopimuksen määräys todetaan laittomaksi tai
                täytäntöönpanokelvottomaksi, kyseinen määräys pannaan täytäntöön
                siinä laajuudessa, kuin on mahdollista, ja muut määräykset
                pysyvät täysin voimassa ja täytäntöönpanokelpoisina.
              </Typography>
              <Typography>
                Tämä Sopimus ja Tietosuojakäytäntö muodostavat koko ja
                yksinomaisen sinun ja Ouran välisen Palveluja koskevan
                sopimuksen ja se korvaa kaikki aikaisemmat tai samanaikaiset
                viestit, esitykset, lausunnot ja osapuolten väliset suulliset
                tai kirjalliset sopimukset.
              </Typography>
              <Typography>
                Jos tämän Sopimuksen ja Tietosuojakäytännön ehtojen välillä on
                ristiriitoja, tämän Sopimuksen ehdot ovat ensisijaisia.
              </Typography>
              <Typography Element="h2" variant="h3">
                Ehtojen ja Palveluiden muuttaminen
              </Typography>
              <Typography>
                Oura pidättää oikeuden päivittää tätä Sopimusta ja/tai
                Tietosuojakäytäntöä milloin tahansa ja mistä tahansa syystä oman
                harkintansa mukaan julkaisemalla päivitetyt ehdot. Ellei Oura
                toisin ilmoita, kaikki muutokset tulevat voimaan ennakoivasti
                lähettämispäivästä alkaen. Oura ilmoittaa sinulle kaikista
                olennaisista Sopimuksen tai Palveluiden muutoksista. Jatkamalla
                Palveluiden käyttöä sen jälkeen, kun olemme ilmoittaneet sinulle
                muutoksesta, sitoudut muokattuun Sopimukseen. Jos et hyväksy
                muokattua Sopimusta, ainoa oikeussuojakeinosi on lopettaa
                Palveluiden käyttö. Oura ja sen kolmannen osapuolen
                palveluntarjoajat voivat tehdä parannuksia ja/tai muutoksia
                Palveluihin, ominaisuuksiin ja hintoihin, joista voidaan
                ilmoittaa milloin tahansa ja mistä tahansa syystä oman
                harkintansa mukaan. Mobiilisovellus voi ladata ja asentaa
                parannuksia, päivityksiä ja lisäominaisuuksia, jotka parantavat,
                vahvistavat ja kehittävät Palveluita edelleen. Oura pidättää
                oikeuden milloin tahansa muuttaa Palveluita tai niiden osia tai
                keskeyttää ne väliaikaisesti tai pysyvästi ilman erillistä
                ilmoitusta. Hyväksyt, että Oura ei ole korvausvelvollinen
                sinulle tai millekään kolmannelle osapuolelle Palveluiden
                muuttamisesta, keskeyttämisestä tai lopettamisesta.
              </Typography>
              <Typography Element="h1" variant="h1" className="mt-20">
                ŌURAN TOIMITUSEHDOT
              </Typography>
              <Typography>
                <em>Viimeksi päivitetty: 18. lokakuuta 2021</em>
              </Typography>
              <Typography Element="h2" variant="h3">
                Euroopan unioni ja Yhdysvallat
              </Typography>
              <Typography>DDP – Toimitettuna tullattuna</Typography>
              <Typography>
                Oura vastaa tavaran toimittamisesta nimettyyn paikkaan ostajan
                maassa ja maksaa kaikki tavaran toimittamisesta määränpäähän
                syntyvät kulut, mukaan lukien tuontitullit ja verot.
              </Typography>
              <Typography Element="h2" variant="h3">
                Euroopan unionin ja Yhdysvaltojen ulkopuolella
              </Typography>
              <Typography>DAP – Toimitettuna määräpaikalle</Typography>
              <Typography>
                Oura maksaa kuljetuksen nimettyyn paikkaan lukuun ottamatta
                tuontiselvitykseen liittyviä kustannuksia ja vastaa kaikista
                riskeistä siihen asti, kunnes ostaja on valmis vastaanottamaan
                toimituksen.
              </Typography>
              <Typography>Aiemmat käyttöehdot</Typography>
            </TypographyRhythm>
          </Box>
        </PageContainer>
        <Footer />
      </div>
    </div>
  );
};

Page.pageName = 'KÄYTTÖEHDOT';
Page.isSormusCompatible = true;

export default Page;
