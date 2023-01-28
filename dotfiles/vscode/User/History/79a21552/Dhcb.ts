import { NextRouter, useRouter } from 'next/router';

interface UtmValues {
  medium?: string | string[];
  source?: string | string[];
  campaign?: string | string[];
  content?: string | string[];
}

interface ReturnType extends UtmValues {
  router: NextRouter;
  isMatch: boolean;
}

export const STORAGE_KEY = 'parner-utm-data';
export const getStoredValues = (): { [x: string]: string } =>
  JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};

const usePartnerUtm = (matchParams: UtmValues = {}): ReturnType => {
  // get params from url
  const router = useRouter();

  const utmParams: UtmValues = {
    medium: router.query.utm_medium,
    source: router.query.utm_source,
    campaign: router.query.utm_campaign,
    content: router.query.utm_content,
  };

  // if utmParams, write to sessionStorage
  const hasUtm = Object.values(utmParams).some((utm) => utm);

  if (hasUtm) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmParams));
  }

  // else check for sessionStorage
  const utm = hasUtm ? utmParams : getStoredValues();
  const isMatch = Object.entries(matchParams).every(([key, val]) => {
    console.log({ key, val }, utm[key], val === utm[key]);
    return val === utm[key];
  });

  console.log('!!!!!!', {
    router,
    storedValues,
    utmParams,
    hasUtm,
    utm,
    isMatch,
  });

  // return object
  return {
    router, // return full router object, to help debugging
    ...utm,
    isMatch,
  };
};

export default usePartnerUtm;
