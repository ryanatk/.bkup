import { useRouter } from 'next/router';

interface UtmParams {
  medium?: string | string[];
  source?: string | string[];
  campaign?: string | string[];
  content?: string | string[];
}

interface Options {
  matchParams: UtmParams;
  shouldWrite: boolean;
}

interface ReturnType {
  utm: UtmParams;
  isMatch: boolean; // all conditions are matched
}

export const STORAGE_KEY = 'parner-utm-data';
export const getStoredUtm = (): { [x: string]: string } =>
  JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};

const usePartnerUtm = ({
  matchParams = {},
  shouldWrite = true,
}: Options): ReturnType => {
  // get params from url
  const { query } = useRouter();
  const queryUtm: UtmParams = {
    medium: query.utm_medium,
    source: query.utm_source,
    campaign: query.utm_campaign,
    content: query.utm_content,
  };

  // if we have utmParams, write to sessionStorage
  const hasQueryUtm = Object.values(queryUtm).some((utm) => utm);

  if (hasQueryUtm) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queryUtm));
  }

  // else check for existing sessionStorage
  const utm = hasQueryUtm ? queryUtm : getStoredUtm();

  // check if all matchParams are present
  const isMatch = Object.entries(matchParams).every(([key, val]) => {
    // for comparison, cast to array (query can have the same param multiple times, which returns an array)
    const utmValue = utm[key];
    const utmList = Array.isArray(utmValue) ? utmValue : [utmValue];

    // can pass in multiple matching values
    if (Array.isArray(val)) {
      return val.some((item) => utmList.includes(item));
    } else {
      return utmList.includes(val);
    }
  });

  // return object
  return {
    utm, // return the object, for debugging
    isMatch,
  };
};

export default usePartnerUtm;
