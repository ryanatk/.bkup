// local development
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_TEST = NODE_ENV === 'test';
const IS_TRACKING = !IS_DEV && !IS_TEST;
const PUBLIC_URL = process.env.PUBLIC_URL;

const IS_MOCK = process.env.REACT_APP_IS_MOCK === 'true';

// deployed to qa, demo, or dev environments
const QA_URLS = ['184.184.231.238'];

const ENV = {
  IS_DEV,
  IS_TEST,
  IS_TRACKING,
  IS_MOCK,
  PUBLIC_URL,
  NODE_ENV,
  QA_URLS,
};

export default ENV;
