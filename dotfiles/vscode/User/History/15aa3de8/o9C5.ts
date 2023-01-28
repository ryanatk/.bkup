export const noIndex = process.env.OURA_ENV !== 'production' ? true : false;
export const noFollow = process.env.OURA_ENV !== 'production' ? true : false;

console.log('***', process.env.OURA_ENV);
