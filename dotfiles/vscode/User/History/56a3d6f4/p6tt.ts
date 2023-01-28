/**
 * This hook returns a preset list of utm query params, from the url.
 *
 * It also accepts a list of `matchParams`, and returns a boolean
 * to show if at least 1 of the values passed in for each key is found.
 *
 * The goal is to make it easy to:
 * 1. get utm params from the url
 * 2. determine if a match is made
 *
 * When found, writes the params to session storage, to maintain state.
 * This can optionally be turned off, by setting `readOnly`.
 */

import { intersection } from 'lodash';
import { useRouter } from 'next/router';
import { clearState, loadState, saveState } from '../../utils/stateStorage';
import { PartnerUtm } from './partner/types';

interface Options extends PartnerUtm {
  readOnly?: boolean; // optionally do not write to storage
}

interface ReturnType {
  utm: PartnerUtm; // return the object, for debugging
  isMatch: boolean; // at least 1 match for each param is found
  isMatchParams: boolean; // match is from query (not storage)
  isMatchStorage: boolean; // match is from storage (not query)
  clear: () => void; // clear storage
}

export const STORAGE_KEY = 'parner-utm-data';

const usePartnerUtm = ({
  readOnly,
  ...matchParams
}: Options = {}): ReturnType => {
  // get params from url
  const { query } = useRouter();
  const queryUtm: PartnerUtm = {
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
        const utmValue = utm?.[key];
        const utmList = Array.isArray(utmValue) ? utmValue : [utmValue];
        const valuesList = Array.isArray(val) ? val : [val];

        return intersection(utmList, valuesList).length;
      })
    : false;

  // method to clear local storage & state
  const clear = () => {
    clearState(STORAGE_KEY);
  };

  return {
    utm,
    isMatch,
    isMatchParams: isMatch && hasQueryUtm,
    isMatchStorage: isMatch && !hasQueryUtm,
    clear,
  };
};

export default usePartnerUtm;
