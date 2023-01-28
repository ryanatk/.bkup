import { ENV } from 'common/const';
import { debug, track } from 'common/utils';
import { logToApi } from 'data/adapter';

/**
 * @namespace options
 * @prop {boolean} api - should we log to the api?
 * @prop {any} data - info to help with debugging
 * @prop {object|string} error - info to parse for error logging
 * @prop {boolean} ga - should we log to google analytics?
 * @prop {string} level - log, warn, error
 * @prop {boolean} throw - should we throw? (instead of log to console)
 * @prop {string} type - a log type/category, for grouping (for GA)
 */
const DEFAULT_OPTIONS = {
  api: true,
  data: undefined,
  error: undefined,
  ga: true,
  level: undefined,
  throw: false,
  type: undefined,
};

// helper to guess a "type", under certain conditions
const guessType = (err) => {
  // if there is no error, assume it's a simple log
  if (!err) return 'log';

  // if the error includes a response, assume it's a request
  if (err?.response) return 'request';

  return 'error';
};

/**
 * Parse an error
 * @param {string} label
 * @param {object} [options]
 */
const log = (label, options = {}) => {
  // console.log('!log', { label, options });

  const {
    api,
    data,
    error,
    ga,
    level = options.error ? 'error' : 'log',
    throw: isThrow,
    type = guessType(options.error),
  } = Object.assign({}, DEFAULT_OPTIONS, options);

  // parse err for headline
  const headline =
    error?.response?.data?.resultInformation?.displayMessage ??
    error?.message ??
    error ??
    data;
  const moreInfo = {
    api,
    data,
    error: error?.response ? error.response.status : error,
    ga,
    level,
    throw: isThrow,
    type,
    // env info
    isDev: ENV.IS_DEV,
  };

  // don't log for test or dev environments
  if (!ENV.IS_TEST && !ENV.IS_DEV) {
    // log to api endpoint
    if (api) {
      logToApi(JSON.stringify({ label, headline, ...moreInfo }));
    }

    // log to google analytics
    if (ga) {
      track([
        typeof type === 'string' ? type : 'log',
        typeof label === 'string' ? label : 'log',
        typeof headline === 'string' ? headline : 'log',
      ]);
    }
  }

  // log to console (only for dev)
  const debugFn = debug[level] ?? debug;

  debugFn('[Log]', label, '\n', headline, '\n', moreInfo);

  // throw
  if (isThrow) {
    throw new Error(headline);
  }

  return headline;
};

export default log;
