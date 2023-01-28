import { getEmailTokenCookie } from './emailTokenCookie';

require('isomorphic-fetch');

const OURA_KEY = process.env.OURA_KEY;
const ECOM_API_ENDPOINT = process.env.ECOM_API_ENDPOINT;

export const GraphQLEndpoint = `${ECOM_API_ENDPOINT}/graphql`;

async function parseResponse(response) {
  if (
    response.status >= 400 ||
    response.status === 204 ||
    response.status === 205
  )
    return response;

  try {
    return await response.json();
  } catch (err) {
    return err;
  }
}

interface RequestOptions {
  headers?: { [name: string]: string };
  method?: string;
  body?: any;
}

function setOptions(method = 'GET', options: RequestOptions = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json; charset=utf-8',
    ...(options.headers || {}),
  };

  const emailTokenCookie = getEmailTokenCookie();
  // Add email token to headers if it's set.
  if (emailTokenCookie) headers['X-Email-Token'] = emailTokenCookie;

  if (OURA_KEY)
    // Bearer key is only available on the server.
    headers['Authorization'] = `Bearer ${OURA_KEY}`;

  return {
    ...options,
    method,
    headers,
  };
}

class BackendAPI {
  get(path: string, options: RequestOptions = {}) {
    const url = `${ECOM_API_ENDPOINT}${path}`;
    options = setOptions('GET', options);
    return fetch(url, options).then(parseResponse);
  }

  post(path: string, data, options: RequestOptions = {}) {
    const url = `${ECOM_API_ENDPOINT}${path}`;
    options = {
      body: JSON.stringify(data),
      ...setOptions('POST', options),
    };
    return fetch(url, options)
      .then((res) => {
        console.log({ url, options, res });
        return res;
      })
      .then(parseResponse)
      .catch((err) => {
        console.log({ url, options, err });
      });
  }

  put(path: string, data, options: RequestOptions = {}) {
    const url = `${ECOM_API_ENDPOINT}${path}`;
    options = {
      body: JSON.stringify(data),
      ...setOptions('PUT', options),
    };
    return fetch(url, options).then(parseResponse);
  }

  delete(path: string, options: RequestOptions) {
    const url = `${ECOM_API_ENDPOINT}${path}`;
    options = setOptions('DELETE', options);
    return fetch(url, options).then(parseResponse);
  }

  patch(path: string, options: RequestOptions) {
    const url = `${ECOM_API_ENDPOINT}${path}`;
    options = setOptions('PATCH', options);
    return fetch(url, options).then(parseResponse);
  }
}

export default new BackendAPI();
