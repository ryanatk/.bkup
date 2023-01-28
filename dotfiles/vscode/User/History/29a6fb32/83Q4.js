// local development
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_TEST = NODE_ENV === 'test';
const PUBLIC_URL = process.env.PUBLIC_URL;

const IS_MOCK = process.env.REACT_APP_IS_MOCK === 'true';
/**
 * TODO: do we also want to have our unit tests use mock data this way?
 *
 * const IS_MOCK = process.env.REACT_APP_IS_MOCK === 'true' || IS_TEST;
 *
 * It's not much different than what we currently do.
 * It would simplify our tests and remove the need for mocking axios.
 * But I think we'll need to remove all the axios mocks from our tests
 * before we make this change, so the tests don't fail.
 */

// deployed to qa, demo, or dev environments
const QA_URLS = ['184.184.231.238'];

const ENV = {
  IS_DEV,
  IS_TEST,
  IS_MOCK,
  PUBLIC_URL,
  NODE_ENV,
  QA_URLS,
};

export default ENV;
