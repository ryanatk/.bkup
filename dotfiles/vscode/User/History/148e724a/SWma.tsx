import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { NextSeo } from 'next-seo';
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
import { privacyPolicyOuraHealth } from '../../../data-mock/page-details/privacy-policy-oura-health';
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
        <NextSeo {...privacyPolicyOuraHealth.seoParams} />
        <Header bordered />
        <PageContainer name="privacy-policy-oura-health" padding="both">
          <Box className={`max-w-3xl ${pageStyles.PrivacyPolicyOuraHealth}`}>
            <TypographyRhythm>
              <Typography Element="h1" variant="super">
                Oura Privacy Statement
              </Typography>
              <H2>ABOUT THIS PRIVACY STATEMENT</H2>
              <Typography>
                At Oura, we take the protection of your personal data seriously.
                This privacy statement applies to processing of personal data by
                Oura Health Oy and Ouraring Inc. (collectively, "Oura").
              </Typography>
              <Typography>
                Our products, like the Oura Ring, enable you to track your
                lifestyle choices and the quality of your sleep. We understand
                that data does not get much more personal than this, and the
                protection of your personal data is of paramount importance to
                us. Please take a moment to carefully review this statement.
              </Typography>
              <H2>WHY DOES OURA PROCESS YOUR PERSONAL DATA?</H2>
              <Typography>
                By opening a section heading below, we will explain the
                categories of personal data we collect and process, as well as
                the reasons we do so, such as to provide you with services when
                you visit our website, make purchases on our Site, and use your
                ring and app. You will also find information on our legal basis
                for processing your data, and our data sources.
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
                      Device &amp; Application Users
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="device-application-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Device &amp; Application Users
                      </Typography>
                      <H2>PROCESSING PURPOSES</H2>
                      <Typography>
                        Oura collects and processes the personal data of Device
                        &amp; Application Users ("Users") only for the following
                        purposes:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>To provide Oura services</H3List>
                          <Typography>
                            We process personal data to provide Oura services
                            and app features, such as to provide you with daily
                            insights about your readiness, sleep, and activity.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To provide customer service</H3List>
                          <Typography>
                            We process personal data for the purpose of
                            providing customer service and managing our customer
                            communication. If you contact our support with
                            questions regarding your app data, we may use the
                            provided information to answer your questions and
                            for solving any issues you may have.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To develop our products and services</H3List>
                          <Typography>
                            We process data regarding your use of the Oura ring
                            and platform to improve our services and features,
                            such as in the Oura app. When possible, we will do
                            this using only pseudonymized, aggregated, or
                            non-personally identifiable data.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To market our products and services</H3List>
                          <Typography>
                            We process marketing-related data to provide online
                            advertising and Oura marketing communications. For
                            example, as explained more fully in our{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">Cookie Policy</BodyLink>
                            </Link>
                            , we use cookies on our website in order to create
                            targeted audiences for online advertisement. You can
                            always opt out of marketing communications, and we
                            will only send you our newsletter if you have
                            requested it.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To enable third party integrations</H3List>
                          <Typography>
                            We process data to provide Users who request that we
                            share their data with certain third parties, such as
                            research partners. This is only done with your
                            express consent.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To comply with statutory obligations</H3List>
                          <Typography>
                            In certain cases, we must process certain data when
                            it is required by applicable laws and regulations.
                            Such statutory obligations are related, for example,
                            to accounting and tax requirements, legal claims, or
                            other legal purposes.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>LEGAL BASIS FOR PROCESSING</H2>
                      <Typography>
                        Data protection law in Europe requires a "lawful basis"
                        for collecting and retaining personal information from
                        residents of the European Economic Area. Our lawful
                        bases for processing your data depends on the particular
                        processing purposes, including:
                      </Typography>
                      <Typography>
                        <strong>Contract:</strong> when processing personal data
                        for the purpose of providing Oura services we process it
                        on the basis of a user contract, which is formed when
                        you create your account and accept of our terms and
                        conditions.
                      </Typography>
                      <Typography>
                        <strong>Consent:</strong> we process your health-related
                        data only with your consent. In some cases, you can
                        provide your consent to us for processing your data
                        through your actions, such as by inserting health data
                        into your notes, or by adding health related tags in the
                        Oura app.
                      </Typography>
                      <Typography>
                        <strong>Legitimate Interest:</strong> we process your
                        personal data based on our legitimate interests when we
                        process it for the purposes of marketing our products
                        and services, providing our customer service and
                        improving our products and services. When choosing to
                        use your data on the basis of our legitimate interests,
                        we carefully weigh our own interests against your right
                        to privacy, in compliance with applicable law.
                      </Typography>
                      <Typography>
                        <strong>Legal obligation:</strong> Oura must process
                        certain information to comply with statutory obligations
                        which may vary in each country. For example, such
                        obligations can relate to consumer protection or tax
                        laws.
                      </Typography>
                      <H2>PROCESSED DATA AND DATA SOURCE</H2>
                      <Typography>
                        In most cases, Oura collects personal data directly from
                        you, such as when you register for an account or use
                        your ring to collect measurement data via the tracking
                        functions of Oura ring. We may also process data that is
                        produced from the information you provide to us.
                      </Typography>
                      <Typography>
                        Oura processes the following personal data categories
                        about device and application Users:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Contact information</strong> such as email
                          address or physical address
                        </ListItem>
                        <ListItem>
                          <strong>User information</strong> such as gender,
                          height and weight, User ID, and other information you
                          may provide to us about yourself or your account
                        </ListItem>
                        <ListItem>
                          <strong>Device information</strong> such as IP address
                          and location data
                        </ListItem>
                        <ListItem>
                          <strong>User activity and context information</strong>{' '}
                          such as activities, notes and tags
                        </ListItem>
                        <ListItem>
                          <strong>Measurement data</strong> such as heart rate,
                          movement data, and temperature data
                        </ListItem>
                        <ListItem>
                          <strong>
                            Calculated user, sleep and activity data
                          </strong>
                          , such as sleep phases (deep, light, REM, awake),
                          activity levels throughout the day, readiness level,
                          body mass index (calculated based on height and
                          weight).
                        </ListItem>
                      </List>
                      <Typography>
                        Please note that some of the personal data we process,
                        including any data concerning your health, is considered
                        special or sensitive personal data. Under applicable
                        law, such data is processed only if you have given your
                        consent for processing. If you access or use any of
                        Oura's location-based services, such as by enabling
                        GPS-based activity tracking through your app, Oura may
                        process the approximate or precise location of your
                        device while the service is active. This data may be
                        obtained via your device's service provider network ID,
                        GPS, and/or Wi-Fi data. Oura does not process such
                        location data without first obtaining your consent. You
                        may disable such location processing at any time using
                        your device's location permission settings.
                      </Typography>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      Online Store Customers &amp; Website Visitors
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="website-online-store-section">
                      <Typography
                        Element="h1"
                        variant="heading"
                        className="sr-only"
                      >
                        Online Store Customers &amp; Website Visitors
                      </Typography>
                      <H2>PROCESSING PURPOSES</H2>
                      <Typography>
                        If you visit Oura's website or complete orders on Oura's
                        online store, we process personal data for the following
                        purposes:
                      </Typography>
                      <List type="ul">
                        <ListItem>
                          <H3List>To complete and deliver your orders</H3List>
                          <Typography>
                            We process personal data to process, handle and
                            deliver your purchases, and to facilitate your
                            shopping.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To provide customer service</H3List>
                          <Typography>
                            We process personal data for the purpose of
                            providing customer service and managing
                            communication with our customers. If you contact our
                            support with questions regarding the Oura ring or
                            our services, we will use the provided information
                            to answer your questions, and to help solve any
                            issues you may have.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To develop and improve our services</H3List>
                          <Typography>
                            We process information regarding visitor use of our
                            site to improve the quality of our online services.
                            This may involve our use of web statistics and
                            trends on our website and in our online store. When
                            possible, we will do this using only aggregated and
                            anonymized data.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To advertise and market our services</H3List>
                          <Typography>
                            We process marketing data to provide online
                            advertising and Oura marketing communications. Oura
                            does not target people with online advertising based
                            on their health data in the Oura app. As explained
                            more fully in our{' '}
                            <Link href="/cookie-policy">
                              <BodyLink color="inherit">Cookie Policy</BodyLink>
                            </Link>
                            , we use cookies on our website in order to create
                            targeted audiences for online advertisement. You can
                            always opt out of marketing communications, and we
                            will only send you our newsletter if you have
                            requested it.
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <H3List>To comply with statutory obligations</H3List>
                          <Typography>
                            In certain cases, we must process certain data when
                            it is required by applicable legislation. Such
                            statutory obligations are related, for example, to
                            accounting and tax requirements, legal claims, or
                            other legal purposes.
                          </Typography>
                        </ListItem>
                      </List>
                      <H2>LEGAL BASIS FOR PROCESSING</H2>
                      <Typography>
                        Data protection law in Europe requires a "lawful basis"
                        for collecting and retaining personal information from
                        residents of the European Economic Area. Our lawful
                        bases for processing your data depends on the particular
                        processing purposes, including:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Contract:</strong> when processing personal
                          data to handle and deliver your purchases, we rely on
                          the legal basis of a user contract, which is created
                          when you place your order.
                        </ListItem>
                        <ListItem>
                          <strong>Consent:</strong> we process your personal
                          data for electronic direct marketing purposes if you
                          have provided your consent for it.
                        </ListItem>
                        <ListItem>
                          <strong>Legitimate Interest:</strong> when we process
                          your personal data for customer service purposes,
                          marketing, and developing our products, we do it on
                          the basis of our legitimate interest to run, maintain
                          and develop our business and to create and maintain
                          customer relationships. When choosing to use your data
                          on the basis of our legitimate interests, we carefully
                          weigh our own interests against your right to privacy
                          under applicable laws.
                        </ListItem>
                        <ListItem>
                          <strong>Legal obligation:</strong> Oura must process
                          certain information to comply with statutory
                          obligations which may vary in each country. For
                          example, such obligations can relate to consumer
                          protection or accounting legislation.
                        </ListItem>
                      </List>
                      <H2>PROCESSED DATA AND DATA SOURCE</H2>
                      <Typography>
                        In most cases, we collect personal data directly from
                        you if you choose to complete orders in our online store
                        or contact us with a question or complaint. When you
                        visit Oura's website or online store, we collect
                        analytical data about you via your device and browser
                        via cookies and various other technologies for service
                        development and advertising purposes.
                      </Typography>
                      <Typography>
                        We process the following personal data categories about
                        the website and online store visitors:
                      </Typography>
                      <List type="ul" unstyled>
                        <ListItem>
                          <strong>Contact information</strong> such as name,
                          email address and address
                        </ListItem>
                        <ListItem>
                          <strong>Delivery information</strong> such as your
                          purchases and chosen payment method
                        </ListItem>
                        <ListItem>
                          <strong>Device information</strong> such as IP
                          address, time of visit, and location data
                        </ListItem>
                        <ListItem>
                          <strong>User activity</strong> such as browsing
                          patterns on the site and any communications you have
                          with us.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                  <AccordionHeader>
                    <Typography Element="h2" variant="h6">
                      California Residents
                    </Typography>
                  </AccordionHeader>
                  <AccordionContent>
                    <section id="ccpa-notice-for-californian-consumers-section">
                      <Typography Element="h1" className="sr-only">
                        California Residents
                      </Typography>
                      <H2>CCPA NOTICE FOR CALIFORNIAN CONSUMERS</H2>
                      <Typography>
                        This notice supplements the information contained in
                        this Privacy Statement of Oura and its subsidiaries
                        (collectively, "we," "us," or "our") and applies solely
                        to all visitors, users, and others who reside in the
                        State of California ("customers" or "you"), and who
                        access Oura's website or the services provided by Oura.
                        We adopt this notice to comply with the California
                        Consumer Privacy Act of 2018 ("CCPA"), and any terms
                        defined in the CCPA have the same meaning when used in
                        this notice.
                      </Typography>
                      <H2>COLLECTION, USE AND SHARING OF INFORMATION</H2>
                      <Typography>
                        Where a customer interacts with Oura's products and/or
                        services, Oura collects information that identifies,
                        relates to, describes, references, is reasonably capable
                        of being associated with, or could reasonably be linked,
                        directly or indirectly, with a particular consumer or
                        device ("Personal Information").
                      </Typography>
                      <Typography>
                        Information about the categories of personal information
                        we collect, the purposes for which your personal
                        Information is processed, and any sharing of your
                        personal information can be found from relevant sections
                        of this privacy statement above:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          <a
                            href="#device-application-section"
                            onClick={(e) => handleAccordionClick(e, 1)}
                          >
                            Device and Application User: categories of collected
                            personal information and processing purposes
                          </a>
                        </ListItem>
                        <ListItem>
                          <a
                            href="#website-online-store-section"
                            onClick={(e) => handleAccordionClick(e, 3)}
                          >
                            Online Store and Website Visitor: categories of
                            collected personal information and processing
                            purposes
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href="#data-sharing-and-disclosures-section">
                            Sharing of personal data
                          </a>
                        </ListItem>
                      </List>
                      <Typography>
                        In the preceding twelve (12) months, we have not sold
                        Personal Information to third parties, including data
                        aggregators.
                      </Typography>
                      <H2>CALIFORNIA CONSUMER RIGHTS</H2>
                      <Typography>
                        If you are a California resident, you have certain
                        rights under the CCPA:
                      </Typography>
                      <H3>
                        Right to know about the personal information we collect
                        and share
                      </H3>
                      <Typography>
                        The CCPA gives you the right to request that we disclose
                        the personal information we have collected about you
                        over the past 12 months, which we do after we receive
                        and validate your request. Once we receive and confirm
                        your verifiable consumer request, we will disclose to
                        you:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          The categories of personal information we collected
                          about you;
                        </ListItem>
                        <ListItem>
                          The categories of personal information we have
                          disclosed about you (if any);
                        </ListItem>
                        <ListItem>
                          The categories of sources for the personal information
                          we collected about you;
                        </ListItem>
                        <ListItem>
                          Our business or commercial purposes for collecting or
                          selling that personal information;
                        </ListItem>
                        <ListItem>
                          The categories of third parties with whom we share
                          that personal information; and
                        </ListItem>
                        <ListItem>
                          The specific pieces of personal information we
                          collected about you. Please note that the CCPA
                          prohibits us from
                        </ListItem>
                      </List>
                      <H3>Right of deletion</H3>
                      <Typography>
                        You have the right to request erasure of your personal
                        information, subject to certain exceptions, such as
                        where we have a legal obligation to retain the data in
                        question. After we receive and validate your request, we
                        will delete your personal information, as well as direct
                        our service providers to delete your personal
                        information unless an exception applies.
                      </Typography>
                      <H3>
                        How to make disclosure, access or deletion requests
                      </H3>
                      <Typography>
                        If you are a California resident, you can request
                        disclosure, access to, and/or deletion of your personal
                        as described above by submitting a verifiable consumer
                        request to us by either:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>
                          By sending an e-mail to{' '}
                          <strong>dataprotection@ouraring.com</strong>,
                          including the following information along with your
                          request: your full name, company name (if applicable),
                          address, e-mail address and a phone number. We may
                          request that you provide additional information if
                          necessary to confirm your identity. This is for
                          security purposes, and is required by law in some
                          cases.
                        </ListItem>
                      </List>
                      <Typography>
                        Only you, or a person registered with the California
                        Secretary of State that you authorize to act on your
                        behalf, may make a verifiable consumer request related
                        to your personal information. You may also make a
                        verifiable consumer request on behalf of your minor
                        child.
                      </Typography>
                      <Typography>
                        You have the right to make a free request up to two
                        times in any 12-month period. We will respond to all
                        validated requests within 45 days of receiving your
                        request, unless we request an extension. In the event
                        that we reasonably require an extension in order to
                        respond to your request, we will notify you of any such
                        extension within the initial 45-day period.
                      </Typography>
                      <H3>Non-Discrimination</H3>
                      <Typography>
                        Oura does not discriminate against users who request
                        exercise their privacy rights under the CCPA. Unless an
                        exception applies, this includes our promise not to:
                      </Typography>
                      <List type="ul" condensed>
                        <ListItem>Deny you goods or services;</ListItem>
                        <ListItem>
                          Charge you different prices or rates for goods or
                          services, including granting discounts or other
                          benefits, or imposing penalties;
                        </ListItem>
                        <ListItem>
                          Provide you a different level or quality of goods or
                          services; or
                        </ListItem>
                        <ListItem>
                          Suggest that you may receive a different price or rate
                          for goods or services or a different level or quality
                          of goods or services.
                        </ListItem>
                      </List>
                    </section>
                  </AccordionContent>
                </Accordion>
              </div>
              <section id="data-sharing-and-disclosures-section">
                <Typography Element="h1" variant="heading">
                  DATA SHARING AND DISCLOSURES
                </Typography>
                <H2>Personal Data Sharing</H2>
                <Typography>
                  Oura does not sell or rent your personal information, and only
                  shares your personal data with certain trusted service
                  providers so that we can provide you with our services and
                  operate our business. Whenever we share data with third-party
                  service providers, we require that they use your information
                  only for the purposes we've authorized, and for the limited
                  reasons explained in this Privacy Statement. We also require
                  these service providers to protect your personal information
                  to at least the same standards that we do.
                </Typography>
                <Typography>
                  Like most companies, Oura uses service providers for purposes
                  such as:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    providing and improving our online service platform;
                  </ListItem>
                  <ListItem>storing our users' data;</ListItem>
                  <ListItem>providing customer services;</ListItem>
                  <ListItem>
                    managing and organizing our marketing activities. Oura only
                    shares website usage data with our advertising network
                    partners for the purposes of analyzing and optimizing our
                    marketing. Oura does not share the Oura app data with 3rd
                    party advertisers); and
                  </ListItem>
                  <ListItem>
                    analyzing information regarding the use of our online
                    service to improve our service quality.
                  </ListItem>
                </List>
                <Typography>
                  Oura stores personal data primarily within the geographic
                  region where it is collected. In cases where personal data is
                  processed outside of the area in which it was collected, we
                  always ensure your personal data is protected with appropriate
                  safeguards in accordance with applicable privacy laws. We also
                  use industry standard data protection measures to safeguard
                  all international transfers of personal data through data
                  protection agreements with our service providers.
                </Typography>
                <H2>Personal Data Disclosures</H2>
                <Typography>
                  We also reserve the right to disclose personal information
                  under certain specific circumstances, including:
                </Typography>
                <List type="ul" condensed>
                  <ListItem>
                    When we have your express consent to do so;
                  </ListItem>
                  <ListItem>
                    When it is reasonably necessary for our legitimate interests
                    in conducting our business, such as in the event a merger,
                    acquisition, or sale;
                  </ListItem>
                  <ListItem>
                    To protect Oura's legal rights and property; and
                  </ListItem>
                  <ListItem>
                    To comply with valid legal requirements. Oura will oppose
                    any request to provide legal authorities with access to user
                    data for surveillance or prosecution purposes,and will
                    notify users if we receive any such request.
                  </ListItem>
                </List>
                <Typography>
                  Otherwise, your personal information is never shared with any
                  individual or other organization.
                </Typography>
                <H2>SAFEGUARDING YOUR DATA</H2>
                <Typography>
                  Oura uses technical and organizational safeguards to keep your
                  data safe and secure. Where appropriate, these safeguards
                  include measures such as anonymization or pseudonymization of
                  personal data, strict access control, and the use of
                  encryption to protect the data we process.
                </Typography>
                <Typography>
                  We also ensure that our staff receives adequate training to
                  ensure personal data is processed only in accordance with our
                  internal policies, consistent with our obligations under
                  applicable law. We also limit access to your sensitive
                  personal data to personnel that have specifically been granted
                  such access.
                </Typography>
                <Typography>
                  Online services that we provide, such as the Oura online store
                  and Oura on the Web, protect your personal data in-transit
                  using encryption and other security measures. We also
                  regularly test our service, systems, and other assets for
                  possible security vulnerabilities.
                </Typography>
                <Typography>
                  We update the Oura App and the Oura Ring firmware regularly.
                  We recommend that you make sure that you always have the
                  latest app and firmware versions installed in order to
                  maximize protection of your data.
                </Typography>
                <H2>DATA RETENTION</H2>
                <Typography>
                  The retention period for your personal data generally depends
                  on the duration of your Oura account lifecycle. Your personal
                  data will be deleted when it is no longer needed for the
                  purpose it was originally collected, unless we have a legal
                  obligation to retain data for a longer period of time. For
                  example, your measurement data regarding your sleep, readiness
                  and activity is stored only so long as your Oura account is
                  active.
                </Typography>
                <Typography>
                  Oura also has legal obligations to retain certain personal
                  data for a specific period of time, such as for tax purposes.
                  These required retention periods may include, for example,
                  accounting and tax requirements, legal claims, or for any
                  other legal purposes. Please note that obligatory retention
                  periods for personal data vary based on the relevant law.
                </Typography>
                <Typography>
                  If you wish, you may request deletion of your Oura account by
                  contacting <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H2>USE OF COOKIES</H2>
                <Typography>
                  We use cookies and various other technologies to collect and
                  store analytics and other information when customers use our
                  site, as well as for personalization and advertising purposes.
                  The cookies we use include both first party and third party
                  cookies.
                </Typography>
                <Typography>
                  Cookies are small text files sent and saved on your device
                  that allows us to identify visitors of our websites and
                  facilitate the use of our site and to create aggregate
                  information of our visitors. This helps us to improve our
                  service and better serve our customers, and will not harm your
                  device or files. We use cookies to tailor our site and the
                  information we provide in accordance with the individual
                  interests of our customers. Cookies are also used for tracking
                  your browsing habits and for targeting and optimizing
                  advertising, both on our site as well as on other sites you
                  may visit. We also use cookies for integrating our social
                  media accounts on our website.
                </Typography>
                <Typography>
                  Please see our{' '}
                  <Link href="/cookie-policy">
                    <BodyLink color="inherit">Cookie Policy</BodyLink>
                  </Link>{' '}
                  for more information on Oura's use of cookies, and how you can
                  set your cookie preferences.
                </Typography>
                <H2>YOUR RIGHTS AS A DATA SUBJECT</H2>
                <Typography>
                  Whenever Oura processes your data, you have certain rights
                  that enable you to control how your personal data is being
                  processed. This section provides you with information about
                  each of those rights. If you wish to exercise your rights as a
                  data subject, please contact{' '}
                  <strong>dataprotection@ouraring.com</strong> with your request
                  to do so.
                </Typography>
                <H3>Right to access data</H3>
                <Typography>
                  You have the right to know what personal data is processed
                  about you. You may contact us to request access to the
                  personal data we have collected about you, and we will confirm
                  whether we are processing your data, and provide you with
                  information about the personal data we have collected and
                  processed about you.
                </Typography>
                <Typography>
                  Please note that by using the Oura App, you can easily access
                  the sleep, readiness and activity data that we process about
                  you. You can also access your data via Oura on the Web at{' '}
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
                <H3>Right to erasure</H3>
                <Typography>
                  You have the right to request the deletion of your personal
                  data in certain circumstances. We will comply with such
                  requests unless we have a valid legal basis or legal
                  obligation to preserve the data.
                </Typography>
                <H3>Right to rectification (of inaccurate data)</H3>
                <Typography>
                  You have the right to request correction of any incorrect or
                  incomplete personal data we have stored about you.
                </Typography>
                <Typography>
                  Please note that you can correct and update some of your basic
                  information via the Oura App and via Oura on the Web.
                </Typography>
                <H3>Right to data portability</H3>
                <Typography>
                  You have the right to request receipt of the personal data you
                  have provided to us in a structured and commonly used format.
                  The right to data portability only applies when we process
                  your personal data for certain reasons, such as by contract or
                  by your consent.
                </Typography>
                <Typography>
                  Please note that Oura on the Web provides you with the ability
                  to export your own data.
                </Typography>
                <H3>Right to object to processing</H3>
                <Typography>
                  You have the right to object to the processing of your
                  personal data under certain circumstances. In the event that
                  we do not have legitimate grounds to continue processing such
                  personal data, we will no longer process your personal data
                  after we have received and verified your objection. You also
                  have the right to object processing of your personal data for
                  direct marketing purposes at any time.
                </Typography>
                <H3>Right to restrict processing</H3>
                <Typography>
                  You have the right to request that we restrict processing of
                  your personal data under certain circumstances. For example,
                  if you contest the accuracy of your data, you can make a
                  restriction request that we do not process your data until
                  Oura has verified the accuracy of your data.
                </Typography>
                <H3>Right to withdraw consent</H3>
                <Typography>
                  If we have requested your consent in order to process your
                  personal data, you have the right to withdraw your consent for
                  such processing at any time. It should be noted, however, that
                  withdrawing your consent may lead to issues or restrictions on
                  your ability to fully utilize Oura services.
                </Typography>
                <Typography>
                  Please note that you can always unsubscribe from receiving our
                  newsletter and other marketing emails by using the
                  ‘Unsubscribe'-link provided in the emails you receive from us.
                </Typography>
                <Typography>
                  Oura strives to address your privacy concerns. If you have
                  contacted Oura about your issue and are still unhappy with our
                  response, subject to applicable law, you may contact your
                  local supervisory authority regarding your issue. However, we
                  urge you to first contact us at{' '}
                  <strong>dataprotection@ouraring.com</strong> so that we can
                  more quickly resolve your issue before escalating the issue.
                </Typography>
                <Typography>
                  Please read Oura's CCPA Privacy Notice if you are a resident
                  of the state of California to read more about your rights
                  under California law.
                </Typography>
                <H2>CONTROLLER CONTACT INFORMATION</H2>
                <Typography>
                  Ouraring Inc. is the data controller of user personal data
                  processed for marketing purposes. The controller of personal
                  data processed for all other processing purposes is Oura
                  Health Oy. Please find our contact details below:
                </Typography>
                <H3>Oura Health Oy</H3>
                <Typography>
                  Address: Elektroniikkatie 10, 90590 Oulu Finland
                </Typography>
                <Typography>
                  Data Protection Officer:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
                <H3>Ouraring Inc.</H3>
                <Typography>
                  Address: 415 Mission Street, 37th Floor San Francisco, CA
                  94105 United States
                </Typography>
                <Typography>
                  Data Protection Officer:{' '}
                  <strong>dataprotection@ouraring.com</strong>
                </Typography>
              </section>

              <H2>CHANGES TO THIS PRIVACY NOTICE</H2>
              <Typography>
                This Privacy Statement is effective as of{' '}
                <strong>September 15, 2021</strong>. We reserve the right to
                update this Policy from time to time at our sole discretion, but
                if we do, we'll let you know about any material changes either
                by notifying you on the website or by sending you an email or
                push notification. If you keep using Oura services after a
                change, your continued use means that you accept any such
                changes.
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
