import CartService from '../cartService';
import { mockDiscounts } from '../../tests/commonFixtures/discounts';
import {
  sampleState,
  emptyCart,
  HeritageSilverVariantId,
  HeritageSilverVariantId2,
  HeritageBlackVariantId,
  ChargerVariantIds,
} from '../../tests/commonFixtures/cart';
import { SIZING_KIT_DISCOUNT } from '../../consts/discounts';
import { fetchDiscount } from '../../queries/GetOneDiscount';

jest.mock('../../utils/api.js');
jest.mock('../../queries/Products');

jest.mock('../../queries/GetOneDiscount', () => ({
  fetchDiscount: jest.fn(({ discountCode }) => {
    if (mockDiscounts[discountCode])
      return { discount: mockDiscounts[discountCode] };

    return {
      discount: {
        valid: true,
        title: discountCode,
      },
    };
  }),
}));

jest.mock('../../utils/backendAPI', () => ({
  async post(url, body) {
    if (url.startsWith('/v1/api/public/discount/findOneValid')) {
      const { productId, discountCodes } = body;

      for (const code of discountCodes) {
        const found = mockDiscounts[code];

        if (!found) continue;

        if (
          body.productId &&
          !found.products.includes(`gid://shopify/Product/${productId}`)
        )
          continue;

        return { matchingDiscount: found };
      }
      return { matchingDiscount: null };
    }

    console.error('unhandled backendAPI POST: ' + url);
  },
}));

describe('addItemsToCart', () => {
  const setup = (options = {}) => {
    return CartService({
      ...sampleState(),
      ...options,
    });
  };

  beforeEach(() => {
    fetchDiscount.mockClear();
  });

  describe('add ring', () => {
    it('supports adding a single ring', async () => {
      const { addItemsToCart } = setup();
      const cart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageBlackVariantId,
        quantity: 1,
      });

      expect(cart.lineItems.length).toEqual(1);
      expect(cart.lineItems[0].title).toEqual('Heritage - Black');
      expect(cart.cartId).toBeDefined();
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(0);
      expect(cart.totalPrice).toEqual(299);
      expect(cart.totalPriceAfterDiscount).toEqual(299);
    });

    it('supports adding a second ring', async () => {
      const { addItemsToCart } = setup();
      const oneItemCart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageBlackVariantId,
        quantity: 1,
      });
      const cart = await addItemsToCart({
        cart: oneItemCart,
        variantId: HeritageSilverVariantId,
        quantity: 1,
      });

      expect(cart.lineItems.length).toEqual(2);
      expect(cart.lineItems[1].title).toEqual('Heritage - Silver');
      expect(cart.cartId).toBeDefined();
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(0);
      expect(cart.totalPrice).toEqual(598);
      expect(cart.totalPriceAfterDiscount).toEqual(598);
    });
  });

  describe('add charger', () => {
    const TITLE = 'Charger Set';
    const PRICE = 59;

    it('supports adding a single charger', async () => {
      const { addItemsToCart } = setup();
      const cart = await addItemsToCart({
        cart: emptyCart(),
        variantId: ChargerVariantIds[0],
        quantity: 1,
      });

      expect(cart.lineItems.length).toEqual(1);
      expect(cart.lineItems[0].title).toEqual(TITLE);
      expect(cart.cartId).toBeDefined();
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(0);
      expect(cart.totalPrice).toEqual(PRICE);
      expect(cart.totalPriceAfterDiscount).toEqual(PRICE);
    });

    it('supports adding a second charger', async () => {
      const { addItemsToCart } = setup();
      const oneItemCart = await addItemsToCart({
        cart: emptyCart(),
        variantId: ChargerVariantIds[0],
        quantity: 1,
      });
      const cart = await addItemsToCart({
        cart: oneItemCart,
        variantId: ChargerVariantIds[1],
        quantity: 1,
      });

      expect(cart.lineItems.length).toEqual(2);
      expect(cart.lineItems[1].title).toEqual(TITLE);
      expect(cart.cartId).toBeDefined();
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(0);
      expect(cart.totalPrice).toEqual(PRICE * 2);
      expect(cart.totalPriceAfterDiscount).toEqual(PRICE * 2);
    });
  });

  describe('discounts', () => {
    it('handles a line item discount', async () => {
      const { addItemsToCart } = setup({
        discounts: {
          lineItemsDiscounts: ['50_off_heritage_silver'],
        },
      });

      const cart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageSilverVariantId,
        quantity: 1,
        variantParentId: '',
      });

      expect(cart.lineItems.length).toEqual(1);
      expect(cart.lineItems[0].title).toEqual('Heritage - Silver');
      expect(cart.lineItems[0].price).toEqual(299);
      expect(cart.lineItems[0].totalDiscountPrice).toEqual(50);
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(50);
      expect(cart.totalPrice).toEqual(299);
      expect(cart.totalPriceAfterDiscount).toEqual(249);
    });

    it('handles a discount on two items', async () => {
      const { addItemsToCart } = setup({
        discounts: {
          lineItemsDiscounts: ['50_off_heritage_silver'],
        },
      });
      const oneItemCart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageSilverVariantId,
        quantity: 1,
        variantParentId: '',
      });
      const cart = await addItemsToCart({
        cart: oneItemCart,
        variantId: HeritageSilverVariantId2,
        quantity: 1,
        variantParentId: '',
      });

      expect(cart.lineItems[0].discounts).toEqual({
        code: '50_off_heritage_silver',
        value: 50,
      });
      expect(cart.lineItems[1].discounts).toEqual({
        code: '50_off_heritage_silver',
        value: 50,
      });

      expect(cart.lineItems.length).toEqual(2);
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(100);
      expect(cart.totalPrice).toEqual(598);
      expect(cart.totalPriceAfterDiscount).toEqual(498);
    });

    it('only discounts first sku for appliesOncePerCustomer=false', async () => {
      const { addItemsToCart } = setup({
        discounts: {
          lineItemsDiscounts: ['50_off_heritage_silver_applies_once'],
        },
      });
      const oneItemCart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageSilverVariantId,
        quantity: 1,
        variantParentId: '',
      });
      const cart = await addItemsToCart({
        cart: oneItemCart,
        variantId: HeritageSilverVariantId2,
        quantity: 1,
        variantParentId: '',
      });

      expect(cart.lineItems[0].discounts).toEqual({
        code: '50_off_heritage_silver_applies_once',
        value: 50,
      });
      expect(cart.lineItems[1].discounts).toEqual(false);

      expect(cart.lineItems.length).toEqual(2);
      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(50);
      expect(cart.totalPrice).toEqual(598);
      expect(cart.totalPriceAfterDiscount).toEqual(548);
    });

    it('only discounts once per quantity with appliesOncePerCustomer=false', async () => {
      const { addItemsToCart } = setup({
        ...sampleState(),
        discounts: {
          lineItemsDiscounts: ['50_off_heritage_silver_applies_once'],
        },
      });
      const cart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageSilverVariantId,
        quantity: 5,
        variantParentId: '',
      });

      expect(cart.lineItems[0].discounts).toEqual({
        code: '50_off_heritage_silver_applies_once',
        value: 50,
      });

      expect(cart.cartDiscount).toEqual(0);
      expect(cart.totalDiscount).toEqual(50);
      expect(cart.totalPrice).toEqual(1495);
      expect(cart.totalPriceAfterDiscount).toEqual(1445);
    });

    it('includes the currencyCode when fetching discounts', async () => {
      const state = sampleState();

      const { addItemsToCart } = CartService({
        ...state,
        app: { ...state.app, currency: 'EUR' },
        discounts: {
          lineItemsDiscounts: ['50_off_heritage_silver_applies_once'],
        },
      });

      await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageSilverVariantId,
        quantity: 1,
      });

      expect(fetchDiscount).toHaveBeenCalledWith({
        currencyCode: 'EUR',
        discountCode: '50_off_heritage_silver_applies_once',
      });
    });

    it('Sizing kit is not added if there is cart discount allowing it', async () => {
      const { addItemsToCart } = setup({
        discounts: {
          lineItemsDiscounts: [SIZING_KIT_DISCOUNT, '100_off_no_sizingkit'],
        },
      });
      const cart = await addItemsToCart({
        cart: emptyCart(),
        variantId: HeritageSilverVariantId,
        quantity: 1,
      });

      expect(cart.lineItems.length).toEqual(1);
    });
  });
});

it("reloadCart doesn't loop infinitely on bad data", async () => {
  // Targeting a specific issue - the code inside reloadCart could get into a state
  // where it's looping infinitely. Seems to happen if the cart products have empty
  // items for some reason.
  const state = sampleState();
  state.cart.lineItems.push({});
  state.cart.lineItems.push({});

  const { reloadCart } = CartService(state);

  await reloadCart();
});
