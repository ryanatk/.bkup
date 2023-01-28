const EXPERIMENT_IDS = {
  production: '',
  staging: '',
  development: '',
};

export const ACTIVE_EXPERIMENT_ID =
  process.env.OURA_ENV === 'production'
    ? EXPERIMENT_IDS.production
    : process.env.OURA_ENV === 'staging'
    ? EXPERIMENT_IDS.staging
    : EXPERIMENT_IDS.development;
