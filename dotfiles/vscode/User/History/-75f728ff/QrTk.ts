const EXPERIMENT_IDS = {
  production: 'jhUP6JNVQWeO17N9I2WXhg',
  staging: 'XD2hiN9jR4anNLW6w_OZTw',
  development: '',
};

export const ACTIVE_EXPERIMENT_ID =
  process.env.OURA_ENV === 'production'
    ? EXPERIMENT_IDS.production
    : process.env.OURA_ENV === 'staging'
    ? EXPERIMENT_IDS.staging
    : EXPERIMENT_IDS.development;
