import { merge } from 'lodash';

const COMMON = {};

const DETAILS = {
  BJCC: merge({}, COMMON, {
    title: 'BJCC',
  }),
  CAJUN: merge({}, COMMON, {
    title: 'Cajundome',
  }),
  EDLEN: merge({}, COMMON, {
    title: 'Edlen',
  }),
};

export default DETAILS;
