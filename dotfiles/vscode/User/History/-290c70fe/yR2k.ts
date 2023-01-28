const EXPERIMENT_IDS = {
  production: '4Z__9Y2ySVulMjN8zMdCGw',
  staging: 'AvAwpjEuQLu1LBObjGw06w',
  development: '',
};

export const ACTIVE_EXPERIMENT_ID =
  process.env.OURA_ENV === 'production'
    ? EXPERIMENT_IDS.production
    : process.env.OURA_ENV === 'staging'
    ? EXPERIMENT_IDS.staging
    : EXPERIMENT_IDS.development;
