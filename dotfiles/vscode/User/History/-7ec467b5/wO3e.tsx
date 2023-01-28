import {
  BodyLink,
  Box,
  Footer,
  Header,
  PageContainer,
  Typography,
  TypographyRhythm,
} from '../../components/sormus';

const Page = () => {
  return (
    <div className="tailwind">
      <Header bordered />
      <PageContainer name="cookie-policy">
        <Box className="max-w-3xl">
          <TypographyRhythm>
            <Typography Element="h1" variant="h2">
              Oura Cookie Policy
            </Typography>

            <Typography Element="h2" variant="h4">
              1. Introduction
            </Typography>

            <Typography>
              Oura is committed to respecting your privacy and complying with
              all applicable data protection and privacy laws. Oura’s privacy
              vision is guided by our desire to foster user trust using ethical
              data protection principles. This policy explains our use of
              cookies and related technologies to operate, improve, and protect
              our website, services, and applications. Please read this Cookie
              Policy carefully, as it contains important information on our use
              of cookies and similar technologies on our website. This policy
              should be read together with our Privacy Policy (available at{' '}
              <BodyLink
                href="https://ouraring.com/privacy-policy"
                target="_blank"
              >
                https://ouraring.com/privacy-policy
              </BodyLink>
              ), which explains how and why we collect, store, use and share
              personal information.
            </Typography>

            <Typography Element="h2" variant="h4">
              2. Who We Are
            </Typography>

            <Typography>
              This website is operated by Oura Health Oy and Ouraring, Inc.
              (collectively, “Oura”). Oura’s products and services help you
              track key signals from your body, and delivers critical wellness
              insights to help you build good habits and harness your body’s
              potential. For more information on our products and services,
              please visit{' '}
              <BodyLink href="https://ouraring.com/meet-oura">
                https://ouraring.com/meet-oura
              </BodyLink>
              .
            </Typography>

            <Typography Element="h2" variant="h4">
              3. Our Website
            </Typography>

            <Typography>
              This Cookie Policy only governs use of our website,
              https://ouraring.com/ (the “Site”). Throughout our website, we may
              link to other websites owned and operated by certain third parties
              who may also use cookies or similar technologies in accordance
              with their own separate privacy and cookie policies. For privacy
              information relating to these other third party websites, please
              consult their privacy and cookie policies as appropriate.
            </Typography>

            <Typography Element="h2" variant="h4">
              4. What Cookies Are
            </Typography>

            <Typography>
              A cookie is a small file that is placed onto your device (e.g.,
              computer, smartphone or other electronic device) that stores
              information when you visit a website. Pixel tags (also called web
              beacons, clear gifs, or tags) are a similar technology that
              consists of small images or snippets of code that can help the
              website owners learn how you interact with websites and emails.
              Cookies allow websites to save all sorts of useful information,
              which helps websites improve your online experience.
            </Typography>

            <Typography Element="h2" variant="h4">
              5. Why We Use Cookies
            </Typography>

            <Typography>
              Oura uses cookies and related technologies on our website to help
              us recognize your device as a repeat visitor, and enable certain
              website features and functionalities. Some of this data will be
              aggregated or statistical, which means that we will not be able to
              identify you individually. More specifically, we use cookies and
              other similar technologies on this website to:
            </Typography>

            <div className="pl-8">
              <Typography>
                Help users complete tasks, such as making purchases, without
                having to re-enter information when browsing from one page to
                another or when visiting the site later. Support security and
                authentication features on our website;
              </Typography>

              <Typography>
                Obtain information about your preferences and use of our website
                to help deliver products and services that meet your interests;
              </Typography>

              <Typography>
                Carry out research and statistical analysis to help improve our
                content, products, and services, and to help us better
                understand our users’ requirements;
              </Typography>

              <Typography>
                Improve the speed and performance of our website; and
              </Typography>

              <Typography>
                Make your online experience more enjoyable and efficient.
              </Typography>
            </div>

            <Typography Element="h2" variant="h4">
              6. Type of Cookies
            </Typography>
            <Typography>
              The cookies we place on your device fall into one of the following
              two categories:
            </Typography>

            <div className="pl-8">
              <Typography>
                <strong>Session cookies:</strong> these allow our website to
                link your actions during a particular browser session. These
                expire each time you close your browser and do not remain on
                your device afterwards.
              </Typography>

              <Typography>
                <strong>Persistent cookies:</strong> these are stored on your
                device in between browser sessions. These allow your preferences
                or actions across our website to be remembered. These will
                remain on your device until they expire, or you delete them from
                your cache.
              </Typography>
            </div>

            <Typography>
              The cookies that we place on your device may also be:
            </Typography>

            <div className="pl-8">
              <Typography>
                <strong>Strictly necessary cookies:</strong> these cookies are
                essential for you to be able to navigate our website and use its
                basic features. Without these cookies, we could not provide you
                with functional access to the website. These cookies do not
                store any personally identifiable information.
              </Typography>

              <Typography>
                <strong>Performance cookies:</strong> these cookies collect
                information about how you use our website, for example, which
                pages you go to most often. These cookies do not collect
                personally identifiable information about you. All information
                collected by these cookies is aggregated and anonymous, and is
                only used to improve how our website works.
              </Typography>

              <Typography>
                <strong>Marketing cookies:</strong> also known as advertising
                cookies, these cookies are used to deliver advertisements more
                relevant to you and your interests. They are also used to limit
                the number of times you see an advertisement on our website and
                help measure the effectiveness of the advertising campaign.
                However, in some cases, our partners may use cookies to provide
                us with information about your interactions with their services.
                These cookies remember that you have visited a website, and this
                information is shared with other organizations such as
                advertisers. Those third-party cookies would be subject to the
                third party service’s policies.
              </Typography>

              <Typography>
                You can opt-out of online behavioral advertising cookies and
                similar technologies by using the Digital Advertising Alliance’s
                Consumer Choice Tool available{' '}
                <BodyLink
                  href="https://optout.aboutads.info/?c=2&lang=EN"
                  target="_blank"
                >
                  here
                </BodyLink>
                , Canadian users may visit{' '}
                <BodyLink href="https://youradchoices.ca" target="_blank">
                  https://youradchoices.ca
                </BodyLink>
                , or if located in the European Union you can make your choices{' '}
                <BodyLink
                  color="success"
                  href="https://www.youronlinechoices.eu/"
                  target="_blank"
                >
                  here
                </BodyLink>
                . Please note you may continue to receive generic ads.
              </Typography>
            </div>

            <Typography Element="h2" variant="h4">
              7. Controlling Cookies
            </Typography>

            <Typography>
              You can change your cookie preferences at any time by following
              the “Cookie Settings” link. Your browser may also give you the
              ability to control some types of cookies. If you do not want to
              accept the kinds of cookies you can control, you can change your
              browser settings so that certain types of cookies are not
              accepted.
            </Typography>

            <Typography>
              If you turn off any cookies, please be aware that you may lose
              some of the functionality of this website. For more information
              about cookies and how to disable them please check one or more of
              the following resources:
            </Typography>

            <Typography Element="span">
              <BodyLink href="http://www.allaboutcookies.org/">
                http://www.allaboutcookies.org/
              </BodyLink>
            </Typography>

            <Typography Element="span">
              <BodyLink href="https://ico.org.uk/for-the-public/online/cookies/">
                https://ico.org.uk/for-the-public/online/cookies/
              </BodyLink>
            </Typography>

            <Typography>
              You can also read more about how specific browsers regulate
              cookies here:
            </Typography>

            <div className="ml-8">
              <Typography>
                <BodyLink href="https://support.google.com/chrome/answer/95647?hl=en-GB">
                  Google Chrome
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://support.microsoft.com/en-us/help/260971/description-of-cookies">
                  Internet Explorer
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy">
                  Edge
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">
                  Mozilla Firefox
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://support.apple.com/kb/PH5042?locale=en_US">
                  Safari (Desktop)
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://support.apple.com/en-us/HT201265">
                  Safari (Mobile)
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://support.google.com/nexus/answer/54068?visit_id=1-636604520716077258-2795024285&hl=en&rd=1">
                  Android Browser
                </BodyLink>
              </Typography>

              <Typography>
                <BodyLink href="https://www.opera.com/help/tutorials/security/privacy/">
                  Opera
                </BodyLink>
              </Typography>
            </div>

            <Typography Element="h2" variant="h4">
              8. Consent to Use Cookies
            </Typography>

            <Typography>
              The first time you visit our website, a cookie notice is displayed
              that describes our use of cookies and links to this Cookie Policy.
              By selecting the “Cookie Settings” option, you may select or
              decline certain categories of cookies according to your personal
              preference. We record the cookie selection preferences that you
              make, and will continue to abide by those preferences each time
              you visit our site from the same device. You can change your
              cookie preferences at any time returning to the Cookie Settings
              page.
            </Typography>

            <Typography>
              Please note that declining some cookies will prevent you from
              experiencing the full functionality of our website.
            </Typography>

            <Typography Element="h2" variant="h4">
              9. How to Contact Us
            </Typography>

            <Typography>
              Please contact us if you have any questions about this Cookie
              Policy or the information we hold about you. You can reach us by
              email at{' '}
              <BodyLink href="mailto:dataprotection@ouraring.com">
                dataprotection@ouraring.com
              </BodyLink>
              .
            </Typography>

            <Typography Element="h2" variant="h4">
              10. Our Do Not Track Policy
            </Typography>

            <Typography>
              Certain browsers have “do not track” features that allow you to
              tell a website not to track you over time and across websites.
              These features are not all uniform. We do not currently respond to
              those signals. If you block cookies, certain features on our sites
              may not work. If you block or reject cookies, not all of the
              tracking described here will stop. Many of these options are
              specific to your device or browser.
            </Typography>

            <Typography Element="h2" variant="h4">
              11. Changes to This Policy
            </Typography>

            <Typography>
              This Cookie Policy is effective from May 3, 2021. We may update
              this policy from time to time. If we do, we’ll let you know about
              any material changes, either by notifying you on the Site or by
              sending you an email. If you continue using our Site after a
              change and do not change your cookie preferences on the site, you
              accept this Policy.
            </Typography>
          </TypographyRhythm>
        </Box>
      </PageContainer>
      <Footer />
    </div>
  );
};

Page.isSormusCompatible = true;
Page.pageName = 'Cookie Policy';
export default Page;
