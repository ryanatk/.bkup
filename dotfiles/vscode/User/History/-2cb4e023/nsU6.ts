import { CHARGER_SET_SKUS, RING_SKUS } from '../../consts/ring';
import { SIZINGKIT_SKU } from '../../consts/skus';
import CartState from '../../types/CartState';
import { getCartIconCount, getCartRingCount } from '../cartCount';

const MOCK_CART_WITH_RINGS_AND_CHARGER_SETS = {
  lineItems: [
    {
      sku: RING_SKUS[3],
    },
    {
      sku: RING_SKUS[9],
    },
    {
      sku: RING_SKUS[18],
    },
    {
      sku: CHARGER_SET_SKUS[5],
    },
    {
      sku: CHARGER_SET_SKUS[2],
    },
    {
      sku: SIZINGKIT_SKU,
    },
    {
      sku: SIZINGKIT_SKU,
    },
    {
      sku: 'another-sku',
    },
    {
      sku: 'another-sku',
    },
  ],
};

const MOCK_CART_WITH_NO_RINGS_OR_CHARGER_SETS = {
  lineItems: [
    {
      sku: SIZINGKIT_SKU,
    },
    {
      sku: SIZINGKIT_SKU,
    },
    {
      sku: 'another-sku',
    },
    {
      sku: 'another-sku',
    },
  ],
};

const MOCK_CART_EMPTY = { lineItems: [] };

describe('cartCount > getCartIconCount', () => {
  it('counts number of rings and charger sets correctly in a cart', () => {
    expect(
      getCartIconCount(
        MOCK_CART_WITH_RINGS_AND_CHARGER_SETS as unknown as CartState,
      ),
    ).toEqual(5);
  });

  it('counts number of rings and charger sets correctly when there are none in a cart', () => {
    expect(
      getCartIconCount(
        MOCK_CART_WITH_NO_RINGS_OR_CHARGER_SETS as unknown as CartState,
      ),
    ).toEqual(0);
  });

  it('counts number of rings and charger sets correctly when cart is empty', () => {
    expect(getCartIconCount(MOCK_CART_EMPTY as unknown as CartState)).toEqual(
      0,
    );
  });
});

describe('cartCount > getCartIconCount', () => {
  it('counts number of rings correctly in a cart', () => {
    expect(
      getCartRingCount(
        MOCK_CART_WITH_RINGS_AND_CHARGER_SETS as unknown as CartState,
      ),
    ).toEqual(3);
  });

  it('counts number of rings correctly in a cart when there are no rings', () => {
    expect(
      getCartRingCount(
        MOCK_CART_WITH_NO_RINGS_OR_CHARGER_SETS as unknown as CartState,
      ),
    ).toEqual(0);
  });

  it('counts number of rings correctly in a cart when empty', () => {
    expect(getCartRingCount(MOCK_CART_EMPTY as unknown as CartState)).toEqual(
      0,
    );
  });
});
