import { merge } from 'lodash';

const COMMON = {
  MAIN: '8005533536',
};

const PHONE = {
  BJCC: merge({}, COMMON),
  CAJUN: merge({}, COMMON),
  EDLEN: merge({}, COMMON),
};

export default PHONE;
