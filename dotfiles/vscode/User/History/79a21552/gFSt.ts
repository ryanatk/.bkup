/**
 * This hook returns a preset list of utm query params, from the url.
 * It also accepts a list of `matchParams`, and returns a boolean
 * to show if at least 1 of the values passed in for each key is found.
 *
 * The goal is to make it easy to:
 * 1. get utm params from the url
 * 2. determine if a match is made
 *
 * Also writes the params to session storage, to maintain state.
 * This can optionally be turned off, by setting `readOnly`.
 */

import { useRouter } from 'next/router';
import { loadState, saveState } from '../utils/stateStorage';

/**
 * More params can be added here, when applicable.
 *
 * Note that each can be a string or an array of strings, because:
 * 1. consumer can match on a list of values for a single key
 * 2. url query params can include multiple values for the same key
 */
interface UtmParams {
  utm_medium?: string | string[];
  utm_source?: string | string[];
  utm_campaign?: string | string[];
  utm_content?: string | string[];
}

interface Options extends UtmParams {
  readOnly?: boolean; // optionally do not write to storage
}

interface ReturnType {
  utm: UtmParams; // return the object, for debugging
  isMatch: boolean; // at least 1 match for each param is found
  isMatchParams: boolean; // match is from query (not storage)
  isMatchStorage: boolean; // match is from storage (not query)
}

export const STORAGE_KEY = 'parner-utm-data';

const usePartnerUtm = ({
  readOnly,
  ...matchParams
}: Options = {}): ReturnType => {
  console.log({ readOnly, matchParams });
  // get params from url
  const { query } = useRouter();
  const queryUtm: UtmParams = {
    utm_medium: query.utm_medium,
    utm_source: query.utm_source,
    utm_campaign: query.utm_campaign,
    utm_content: query.utm_content,
  };

  // if we have utmParams, write to sessionStorage
  const hasQueryUtm = Object.values(queryUtm).some((utm) => utm);

  if (hasQueryUtm && !readOnly) {
    saveState(queryUtm, STORAGE_KEY);
  }

  // else check for existing sessionStorage
  const utm = hasQueryUtm ? queryUtm : loadState(STORAGE_KEY);

  // check if all matchParams are present
  const isMatch = Object.keys(matchParams).length
    ? Object.entries(matchParams).every(([key, val]) => {
        // for comparison, cast to array (query can have the same param multiple times, which returns an array)
        const utmValue = utm[key];
        const utmList = Array.isArray(utmValue) ? utmValue : [utmValue];

        // can pass in multiple matching values
        if (Array.isArray(val)) {
          return val.some((item) => utmList.includes(item));
        } else {
          return utmList.includes(val);
        }
      })
    : false;

  return {
    utm,
    isMatch,
    isMatchParams: isMatch && hasQueryUtm,
    isMatchStorage: isMatch && !hasQueryUtm,
  };
};

export default usePartnerUtm;
