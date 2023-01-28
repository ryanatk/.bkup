import { src } from '../../../../utils/imageHelpers';

// DRY helper
const getSrc = (image: string) => src(image, 'jpg', 80);

const PRODUCT_QUOTES = [
  {
    text: 'pdp_horizon_quote_1_text',
    name: 'Matthew Walker',
    title: '@drmattwalker',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-walker@2x'),
  },
  {
    text: 'pdp_horizon_quote_2_text',
    name: 'Shara Raqs',
    title: '@shara.raqs',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-shara@2x'),
  },
  {
    text: 'pdp_horizon_quote_3_text',
    name: 'Odell Beckham Junior',
    title: '@obj',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-obj@2x'),
  },
  {
    text: 'pdp_horizon_quote_4_text',
    name: 'Jenny McGuckian',
    title: '@gonourishwithjenny',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-jenny@2x'),
  },
  {
    text: 'pdp_horizon_quote_5_text',
    name: 'Katie Ledecky',
    title: '@katieledecky',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-ledecky@2x'),
  },
  {
    text: 'pdp_horizon_quote_6_text',
    name: 'August Marie Ball',
    title: '@philosophica82',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-amb@2x'),
  },
  {
    text: 'pdp_horizon_quote_7_text',
    name: 'Pam',
    title: '@pamelabaizas',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-pam@2x'),
  },
  {
    text: 'pdp_horizon_quote_8_text',
    name: 'Chris Paul',
    title: '@cp3',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-cp3@2x'),
  },
  {
    text: 'pdp_horizon_quote_9_text',
    name: 'Jess',
    title: '@scijess',
    avatarUrl: getSrc('product/simple/pdp-community-quote-avatar-jess@2x'),
  },
]: QuoteSliderProps;

export default PRODUCT_QUOTES;
