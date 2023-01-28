import { merge } from 'lodash';
import { CHAT, HREF, PHONE, TITLE } from './props';

const KEY = {
  BJCC: 'BJCC',
  CAJUN: 'CAJUN',
  EDLEN: 'EDLEN',
};

// Common props, to use for each host
const getProps = (key, isTest) => {
  const COMMON_PROPS = isTest ? { CHAT: CHAT.PROD } : { CHAT: CHAT.TRAINING };

  return merge({}, COMMON_PROPS, HREF[key], PHONE[key], TITLE[key]);
};

// Default site objects, to use for each host
const BJCC = {
  owner: 'BJCC',
  theme: 'BJCC',
  props: getProps(KEY.BJCC),
};

const CAJUN = {
  owner: 'Cajun',
  theme: 'Cajun',
  props: getProps(KEY.CAJUN),
};

const EDLEN = {
  owner: 'Edlen',
  theme: 'Edlen',
  props: getProps(KEY.EDLEN),
};

const SITE = {
  // Cajundome
  'cajundomeordering.com': CAJUN,
  'cdootest.edlen.com:8020': merge({}, CAJUN, {
    theme: 'cajun-test',
    props: getProps(KEY.CAJUN, true),
  }),
  'cdootrain.edlen.com': merge({}, CAJUN, { props: getProps(KEY.CAJUN, true) }),

  // BJCC
  'bjccordering.edlen.com': BJCC,
  'bjccootest.edlen.com:8010': merge({}, BJCC, {
    props: getProps(KEY.BJCC, true),
  }),
  'trainbjcc.edlen.com': merge({}, BJCC, { props: getProps(KEY.BJCC, true) }),

  // Edlen
  'ordering.edlen.com': EDLEN,
  'testoo.edlen.com': merge({}, EDLEN, {
    theme: 'edlen-test',
    props: getProps(KEY.EDLEN, true),
  }),
  'trainoo.edlen.com': merge({}, EDLEN, {
    theme: 'edlen-training',
    props: getProps(KEY.EDLEN, true),
  }),

  // TEMPORARY Staging Url's
  'stageoo.edlen.com': EDLEN,
  '72.196.63.173:8010': EDLEN,
  '72.196.63.173:8020': CAJUN,
  '72.196.63.173:8030': BJCC,

  // Default to Edlen, for local development, QA, etc
  default: merge({}, EDLEN, { props: getProps(KEY.EDLEN, true) }),
};

export default SITE;
