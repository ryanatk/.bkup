import { MessageKey } from '../public/locales/setup';

export const RING_SIZES = ['6', '7', '8', '9', '10', '11', '12', '13'];

export const RING_SIZE_NOT_SELECTED = 'Size later';

export enum RingSizeType {
  later = 'size_later',
  now = 'size_now',
}

const RING_SIZES_LEADING_ZEROS = RING_SIZES.map((size) =>
  size.length === 1 ? `0${size}` : size,
);

const BLACK_SKU_BASE = 'JZ90-1001';
const blackSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${BLACK_SKU_BASE}-${size}`,
);

const GOLD_SKU_BASE = 'JZ90-1002';
const goldSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${GOLD_SKU_BASE}-${size}`,
);

const SILVER_SKU_BASE = 'JZ90-1003';
const silverSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${SILVER_SKU_BASE}-${size}`,
);

const STEALTH_SKU_BASE = 'JZ90-1004';
const stealthSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${STEALTH_SKU_BASE}-${size}`,
);

const HORIZON_BLACK_SKU_BASE = 'JZ90-51382';
const horizonBlackSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${HORIZON_BLACK_SKU_BASE}-${size}`,
);

const HORIZON_GOLD_SKU_BASE = 'JZ90-51383';
const horizonGoldSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${HORIZON_GOLD_SKU_BASE}-${size}`,
);

const HORIZON_ROSE_SKU_BASE = 'JZ90-51386';
const horizonRoseSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${HORIZON_ROSE_SKU_BASE}-${size}`,
);

const HORIZON_SILVER_SKU_BASE = 'JZ90-51384';
const horizonSilverSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${HORIZON_SILVER_SKU_BASE}-${size}`,
);

const HORIZON_STEALTH_SKU_BASE = 'JZ90-51385';
const horizonStealthSkus = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${HORIZON_STEALTH_SKU_BASE}-${size}`,
);

const RECURRING_TEST_SKU_BASE = 'JZ90-test-recurring';

export const RING_SKUS = [
  BLACK_SKU_BASE,
  ...blackSkus,
  GOLD_SKU_BASE,
  ...goldSkus,
  SILVER_SKU_BASE,
  ...silverSkus,
  STEALTH_SKU_BASE,
  ...stealthSkus,
  HORIZON_BLACK_SKU_BASE,
  ...horizonBlackSkus,
  HORIZON_GOLD_SKU_BASE,
  ...horizonGoldSkus,
  HORIZON_ROSE_SKU_BASE,
  ...horizonRoseSkus,
  HORIZON_SILVER_SKU_BASE,
  ...horizonSilverSkus,
  HORIZON_STEALTH_SKU_BASE,
  ...horizonStealthSkus,
  RECURRING_TEST_SKU_BASE,
];

const CHARGER_SET_SKU_BASE = 'JZ95-1005';

export const ROSE_GOLD_FINISH_HANDLE = 'horizon-rose';

export const CHARGER_SET_SKUS = RING_SIZES_LEADING_ZEROS.map(
  (size) => `${CHARGER_SET_SKU_BASE}-${size}`,
);

interface RingsByFinishData {
  finish: {
    slug: string;
    label: MessageKey;
  };
  swatch: string;
  styles: {
    horizon: boolean;
    heritage: boolean;
  };
}

export const RINGS_BY_FINISH: RingsByFinishData[] = [
  {
    finish: {
      slug: 'silver',
      label: 'pdp_ring_color_silver_label',
    },
    swatch: 'product/simple/pdp-swatch-horizon-silver@2x',
    styles: {
      horizon: true,
      heritage: true,
    },
  },
  {
    finish: {
      slug: 'black',
      label: 'pdp_ring_color_black_title',
    },
    swatch: 'product/simple/pdp-swatch-horizon-black@2x',
    styles: {
      horizon: true,
      heritage: true,
    },
  },
  {
    finish: {
      slug: 'stealth',
      label: 'pdp_ring_color_stealth_title',
    },
    swatch: 'product/simple/pdp-swatch-horizon-stealth@2x',
    styles: {
      horizon: true,
      heritage: true,
    },
  },
  {
    finish: {
      slug: 'gold',
      label: 'pdp_ring_color_gold_title',
    },
    swatch: 'product/simple/pdp-swatch-horizon-gold@2x',
    styles: {
      horizon: true,
      heritage: true,
    },
  },
  {
    finish: {
      slug: 'rose',
      label: 'pdp_ring_color_rose_gold_title',
    },
    swatch: 'product/simple/pdp-swatch-horizon-rose@2x',
    styles: {
      horizon: true,
      heritage: false,
    },
  },
];
