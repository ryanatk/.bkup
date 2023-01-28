import axios from 'axios';
import { ENV } from 'common/const';
import { getBaseUrl, log } from 'common/utils';
import { makeOption } from 'common/utils';

import mock from './getCountries.mock';

const baseUrl = getBaseUrl(2);

/**
 * Returns a list of countries
 * @returns Array of objects with country data
 */
const getCountries = async () => {
  try {
    const { data } = ENV.IS_MOCK
      ? mock()
      : await axios.get(`${baseUrl}lookup/countries`);

    const { countries } = data;

    // $TODO: Remove the states check and states return
    return countries.states
      ? countries.map(({ name, twoLetterIsoCode: code, states }) => ({
          label: name,
          value: code,
          code,
          states: states.map(({ abbreviation }) => ({
            ...makeOption(abbreviation),
            code: abbreviation,
          })),
        }))
      : countries.map(({ name, twoLetterIsoCode: code }) => ({
          label: name,
          value: code,
          code,
        }));
  } catch (error) {
    log('getCountries', {
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default getCountries;
