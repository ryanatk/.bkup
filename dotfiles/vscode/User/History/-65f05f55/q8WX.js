import axios from 'axios';

import { getBaseUrl, getSiteOwnership, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

import mock from './authenticate.mock';

const baseUrl = getBaseUrl(2);
const ownership = getSiteOwnership();

/**
 * Authenticates a user
 * @param {string} user.email
 * @param {string} user.password
 * @returns Object with users data
 */
const authenticate = async ({ email, password }) => {
  await VALID.checkAll(
    ['Email', email, VALID.EMAIL],
    ['Password', password, VALID.PASSWORD],
  );

  try {
    const { data: auth = {} } = ENV.IS_MOCK
      ? mock()
      : await axios.post(`${baseUrl}customer/authenticate`, {
          email: `${email}`,
          password: `${password}`,
          ownership: `${ownership}`,
        });

    return {
      customerId: auth.customerData.id,
      jwtToken: auth.jwtToken ?? 'jwt-auth-token-not-returned', // keep this in case jwt fails
      // jwtToken: auth.jwtToken,
    };
  } catch (error) {
    log('authenticate', {
      // data, don't pass PII data to logs
      data: { email },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default authenticate;
