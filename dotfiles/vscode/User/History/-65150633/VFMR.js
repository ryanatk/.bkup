import { merge } from 'lodash';

const COMMON = {
  POWER_FAQ: 'https://edlen.com/exhibitor-resources/?exhibitor=power',
  POWER_USAGE_FAQ:
    'https://edlen.com/exhibitor-resources/?exhibitor=power-usage-guide',
  LABOR_FAQ: 'https://edlen.com/exhibitor-resources/?exhibitor=labor',
  SAVINGS_FAQ:
    'https://edlen.com/exhibitor-resources/?exhibitor=cost-saving-tips',
  CONTACT_US: 'https://edlen.com/contact/',
};

const HREF = {
  BJCC: merge({}, COMMON, { LEGACY: 'https://bjcclegacy.edlen.com:8020' }),
  CAJUN: merge({}, COMMON, {
    LEGACY: 'https://cajundomelegacy.edlen.com:8030',
  }),
  EDLEN: merge({}, COMMON, { LEGACY: 'https://legacy.edlen.com:8010' }),
};

export default HREF;
