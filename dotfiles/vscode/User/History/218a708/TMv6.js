import { merge } from 'lodash';

const COMMON = {
  PHONE: '8005533536',
};

const DETAILS = {
  BJCC: merge({}, COMMON),
  CAJUN: merge({}, COMMON),
  EDLEN: merge({}, COMMON),
};

export default DETAILS;
