import { merge } from 'lodash';

import getProps from './getProps';

const PROPS = {
  BJCC: 'BJCC',
  CAJUN: 'CAJUN',
  EDLEN: 'EDLEN',
};

// Default site objects, to use for each host
const BJCC = {
  owner: 'BJCC',
  theme: 'BJCC',
  props: getProps(PROPS.BJCC),
};

const CAJUN = {
  owner: 'Cajun',
  theme: 'Cajun',
  props: getProps(PROPS.CAJUN),
};

const EDLEN = {
  owner: 'Edlen',
  theme: 'Edlen',
  props: getProps(PROPS.EDLEN),
};

const SITE = {
  // Cajundome
  'cajundomeordering.com': CAJUN,
  'cdootest.edlen.com:8020': merge({}, CAJUN, {
    theme: 'cajun-test',
    props: getProps(PROPS.CAJUN, true),
  }),
  'cdootrain.edlen.com': merge({}, CAJUN, {
    props: getProps(PROPS.CAJUN, true),
  }),

  // BJCC
  'bjccordering.edlen.com': BJCC,
  'bjccootest.edlen.com:8010': merge({}, BJCC, {
    props: getProps(PROPS.BJCC, true),
  }),
  'trainbjcc.edlen.com': merge({}, BJCC, { props: getProps(PROPS.BJCC, true) }),

  // Edlen
  'ordering.edlen.com': EDLEN,
  'testoo.edlen.com': merge({}, EDLEN, {
    theme: 'edlen-test',
    props: getProps(PROPS.EDLEN, true),
  }),
  'trainoo.edlen.com': merge({}, EDLEN, {
    theme: 'edlen-training',
    props: getProps(PROPS.EDLEN, true),
  }),

  // Alternate/Legacy IP's
  '72.196.63.173:8010': EDLEN,
  '72.196.63.173:8020': CAJUN,
  '72.196.63.173:8030': BJCC,

  // Default to Edlen, for local development, QA, etc
  default: CAJUN,
  // default: merge({}, EDLEN, { props: getProps(PROPS.EDLEN, true) }),
};

export default SITE;
