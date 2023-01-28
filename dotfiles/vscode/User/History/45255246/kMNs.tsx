import { Close } from '@material-ui/icons';
import {
  ConsentManager,
  onPreferencesSaved,
  openConsentManager,
  savePreferences,
} from '@segment/consent-manager';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BodyLink, Box, Button } from '..';
import { EventType, sendGTMWithGA4Event } from '../../../analytics';
import { t } from '../../../public/locales/LocaleContext';
import checkPreferences from '../../../utils/checkPreferences';
import { eraseCookie, getCookie } from '../../../utils/cookie';
import Typography from '../Typography';

interface CookieBannerProps {
  isEU?: boolean;
}

const ACCEPT_ALL = {
  customPreferences: {
    advertising: true,
    functional: true,
    marketingAndAnalytics: true,
  },
  destinationPreferences: {
    All: true,
    Amplitude: true,
    Appboy: true,
    'Facebook Pixel Server Side': true,
    FullStory: true,
    'Google Tag Manager': true,
    Hindsight: true,
    'Visual Tagger': true,
    Webhooks: true,
    'Impact Partnership Cloud': true,
  },
};

const CookieBanner = ({ isEU }: CookieBannerProps) => {
  console.log('!!!!!!!!!!!     COOKIE BANNER       !!!!!!!!!!!!!');
  console.log({ isEU });
  isEU = true;
  console.log({ isEU });

  const { asPath } = useRouter();
  const checkCookie = () => getCookie('tracking-preferences');
  const [consentCookie, setConsentCookie] = useState(checkCookie());
  const [closeBanner, setCloseBanner] = useState(false);
  const processNewConsent = () => {
    sendGTMWithGA4Event({
      type: EventType.ProcessNewConsent,
      payload: {
        path: asPath,
      },
    });
  };

  const acceptAllCookies = () => savePreferences(ACCEPT_ALL);

  const handleClose = () => setCloseBanner(true);

  useEffect(() => {
    if (!isEU && !consentCookie) return acceptAllCookies();
    if (consentCookie) {
      if (!checkPreferences(getCookie('tracking-preferences'))) {
        eraseCookie('tracking-preferences');
        return setConsentCookie(null);
      } else return handleClose();
    }
  }, [consentCookie]);

  onPreferencesSaved(() => {
    processNewConsent();
    setConsentCookie(checkCookie());
  });

  const BannerContent = () => (
    <div className="max-w-2xl lg:max-w-xl text-left" data-cy="cookie-banner">
      <Typography variant="h5" className="mb-4">
        {t('cookie_title')}
      </Typography>
      <Typography variant="caption">
        {t('banner_content', {
          managecookies_link: (
            <button id="open-consent" onClick={openConsentManager}>
              <BodyLink data-cy="managecookies">{t('manage_cookies')}</BodyLink>
            </button>
          ),
          accept_link: (
            <button id="accept-all" onClick={acceptAllCookies}>
              <BodyLink data-cy="acceptcookies">{t('accept_cookies')}</BodyLink>
            </button>
          ),
        })}
      </Typography>
    </div>
  );

  const BannerButtons = () => (
    <div className="mt-4 flex-row gap-4 items-center lg:flex-row-reverse">
      <Button
        variant="primary"
        id="accept"
        onClick={acceptAllCookies}
        data-cy="button-accept-all-cookies"
      >
        Accept
      </Button>
      <Button
        variant="basic"
        className="text-helsinkiBlue"
        data-cy="manage_cookies"
        onClick={openConsentManager}
      >
        {t('manage_cookies')}
      </Button>
    </div>
  );

  return (
    <>
      {!closeBanner && (
        <div className="tailwind">
          <div className="fixed bottom-0 w-screen bg-white py-4 z-50 border-t border-t-helsinkiBlue">
            <Box className="flex flex-col lg:flex-row lg:justify-around items-start lg:items-center">
              <ConsentManager
                writeKey={process.env.SEGMENT_KEY}
                bannerHideCloseButton={true}
                bannerBackgroundColor="#fff"
                bannerContent={<BannerContent />}
                preferencesDialogContent={''}
                cancelDialogContent={''}
              />
              <BannerButtons />
            </Box>
            <Close
              className="cursor-pointer absolute top-4 right-4"
              onClick={acceptAllCookies}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
