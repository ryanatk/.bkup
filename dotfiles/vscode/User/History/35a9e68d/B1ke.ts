import { IncomingMessage } from 'http';

export function countryCodeForRequest(
  req: IncomingMessage,
  router?: { locale: string },
) {
  console.log(process.env.LOCAL_OVERRIDE_COUNTRY);
  if (process.env.LOCAL_OVERRIDE_COUNTRY) {
    return process.env.LOCAL_OVERRIDE_COUNTRY;
  }

  if (router && router.locale === 'eu') return 'FI';
  if ('cloudfront-viewer-country' in req.headers)
    return req.headers['cloudfront-viewer-country'];
  return 'US';
}

export function getLocaleForPricing(locale: string) {
  if (!locale) return 'US';
  if (locale === 'eu') return 'FI';
  return locale.toUpperCase();
}
