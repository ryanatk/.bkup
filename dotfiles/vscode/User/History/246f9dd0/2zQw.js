import { merge } from 'lodash';
import { CHAT, HREF, PHONE, TITLE } from './props';

// Common props, to use for each host
const getProps = (key, isTest) => {
  const COMMON_PROPS = isTest ? { CHAT: CHAT.PROD } : { CHAT: CHAT.TRAINING };

  return merge({}, COMMON_PROPS, HREF[key], PHONE[key], TITLE[key]);
};

// Default site objects, to use for each host
const BJCC = {
  owner: 'BJCC',
  theme: 'BJCC',
  props: getProps('BJCC'),
};

const CAJUN = {
  owner: 'Cajun',
  theme: 'Cajun',
  props: getProps('CAJUN'),
};

const EDLEN = {
  owner: 'Edlen',
  theme: 'Edlen',
  props: getProps('EDLEN'),
};

const SITE = {
  // Cajundome
  'cajundomeordering.com': CAJUN,
  'cdootest.edlen.com:8020': merge({}, CAJUN, {
    theme: 'cajun-test',
    props: TEST_PROPS,
  }),
  'cdootrain.edlen.com': merge({}, CAJUN, { props: TEST_PROPS }),

  // BJCC
  'bjccordering.edlen.com': BJCC,
  'bjccootest.edlen.com:8010': merge({}, BJCC, { props: TEST_PROPS }),
  'trainbjcc.edlen.com': merge({}, BJCC, { props: TEST_PROPS }),

  // Edlen
  'ordering.edlen.com': EDLEN,
  'testoo.edlen.com': merge({}, EDLEN, {
    theme: 'edlen-test',
    props: TEST_PROPS,
  }),
  'trainoo.edlen.com': merge({}, EDLEN, {
    theme: 'edlen-training',
    props: TEST_PROPS,
  }),

  // TEMPORARY Staging Url's
  'stageoo.edlen.com': EDLEN,
  '72.196.63.173:8010': EDLEN,
  '72.196.63.173:8020': CAJUN,
  '72.196.63.173:8030': BJCC,

  // Default to Edlen, for local development, QA, etc
  default: merge({}, EDLEN, { props: TEST_PROPS }),
};

export default SITE;
