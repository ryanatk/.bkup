if (ownership === 'Edlen') return 'https://legacy.edlen.com:8010';
if (ownership === 'BJCC') return 'https://bjcclegacy.edlen.com:8020';
if (ownership === 'Cajun') return 'https://cajundomelegacy.edlen.com:8030';
const HREF = {
  BJCC: { LEGACY: 'https://bjcclegacy.edlen.com:8020' },
  CAJUN: { LEGACY: 'https://cajundomelegacy.edlen.com:8030' },
  EDLEN: { LEGACY: 'https://legacy.edlen.com:8010' },
  COMMON: {
    POWER_FAQ: 'https://edlen.com/exhibitor-resources/?exhibitor=power',
    POWER_USAGE_FAQ:
      'https://edlen.com/exhibitor-resources/?exhibitor=power-usage-guide',
    LABOR_FAQ: 'https://edlen.com/exhibitor-resources/?exhibitor=labor',
    SAVINGS_FAQ:
      'https://edlen.com/exhibitor-resources/?exhibitor=cost-saving-tips',
    CONTACT_US: 'https://edlen.com/contact/',
  },
};

export default HREF;
