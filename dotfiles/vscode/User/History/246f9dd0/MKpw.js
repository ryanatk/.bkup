import { merge } from 'lodash';
import { CHAT, HREF } from './props';

// Common props, to use for each host
const COMMON_PROPS = {
  CHAT: CHAT.PROD,
  HREF: HREF.EDLEN,
  PHONE: '8005533536',
};

const TEST_PROPS = {
  CHAT: CHAT.TRAINING,
};

// Default site objects, to use for each host
const BJCC = {
  owner: 'BJCC',
  theme: 'BJCC',
  props: merge({}, COMMON_PROPS, { title: 'BJCC' }),
};

const CAJUN = {
  owner: 'Cajun',
  theme: 'Cajun',
  props: merge({}, COMMON_PROPS, { title: 'Cajundome' }),
};

const EDLEN = {
  owner: 'Edlen',
  theme: 'Edlen',
  props: merge({}, COMMON_PROPS, { title: 'Edlen' }),
};

const SITE = {
  // Cajundome
  'cajundomeordering.com': CAJUN,
  'cdootest.edlen.com': merge({}, CAJUN, {
    theme: 'cajun-test',
    props: TEST_PROPS,
  }),
  'cdootrain.edlen.com': merge({}, CAJUN, { props: TEST_PROPS }),

  // BJCC
  'bjccordering.edlen.com': BJCC,
  'bjccootest.edlen.com': merge({}, BJCC, { props: TEST_PROPS }),
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
