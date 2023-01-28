import { NextRouter, useRouter } from 'next/router';

interface UtmParams {
  medium?: string | string[];
  source?: string | string[];
  campaign?: string | string[];
  content?: string | string[];
}

interface ReturnType extends UtmParams {
  router: NextRouter;
  isMatch: boolean;
}

export const STORAGE_KEY = 'parner-utm-data';
export const getStoredUtm = (): { [x: string]: string } =>
  JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};

const usePartnerUtm = (matchParams: UtmParams = {}): ReturnType => {
  // get params from url
  const router = useRouter();
  const queryUtm: UtmParams = {
    medium: router.query.utm_medium,
    source: router.query.utm_source,
    campaign: router.query.utm_campaign,
    content: router.query.utm_content,
  };

  // if utmParams, write to sessionStorage
  const hasUtm = Object.values(queryUtm).some((utm) => utm);

  if (hasUtm) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queryUtm));
  }

  // else check for sessionStorage
  const utm = hasUtm ? queryUtm : getStoredUtm();

  // check if all matchParams are present
  const isMatch = Object.entries(matchParams).every(([key, val]) => {
    const utmValue = utm[key];
    const utmList = Array.isArray(utmValue) ? utmValue : [utmValue];

    if (Array.isArray(val)) {
      return val.some((item) => utmList.includes(item));
    } else {
      return utmList.includes(val);
    }
  });

  // return object
  return {
    router, // return full router object, to help debugging
    ...utm,
    isMatch,
  };
};

export default usePartnerUtm;
