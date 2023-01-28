import { merge } from 'lodash';

const COMMON = {
  PHONE: '8005533536',
};

const HREF = {
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

export default HREF;
