import CartService from '../cartService';
import { mockDiscounts } from '../../tests/commonFixtures/discounts';
import {
  sampleState,
  emptyCart,
  HeritageSilverVariantId,
  HeritageSilverVariantId2,
  HeritageBlackVariantId,
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

beforeEach(() => {
  fetchDiscount.mockClear();
});

describe('addItemsToCart', () => {
  const { addItemsToCart } = CartService(sampleState());

  beforeEach(() => {
    fetchDiscount.mockClear();
  });

  it('updateItemsToCart supports adding a single item', async () => {
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

  it('updateItemsToCart supports adding a second item', async () => {
    let cart = emptyCart();
    console.log({ cart });
    cart = await addItemsToCart({
      cart,
      variantId: HeritageBlackVariantId,
      quantity: 1,
    });
    console.log({ cart });
    cart = await addItemsToCart({
      cart,
      variantId: HeritageSilverVariantId,
      quantity: 1,
    });
    console.log({ cart });

    expect(cart.lineItems.length).toEqual(2);
    expect(cart.lineItems[1].title).toEqual('Heritage - Silver');
    expect(cart.cartId).toBeDefined();
    expect(cart.cartDiscount).toEqual(0);
    expect(cart.totalDiscount).toEqual(0);
    expect(cart.totalPrice).toEqual(598);
    expect(cart.totalPriceAfterDiscount).toEqual(598);
  });

  it('updateItemsToCart handles a line item discount', async () => {
    const { addItemsToCart } = CartService({
      ...sampleState(),
      discounts: {
        lineItemsDiscounts: ['50_off_heritage_silver'],
      },
    });
    let cart = emptyCart();

    cart = await addItemsToCart({
      cart,
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

  it('updateItemsToCart handles a discount on two items', async () => {
    const { addItemsToCart } = CartService({
      ...sampleState(),
      discounts: {
        lineItemsDiscounts: ['50_off_heritage_silver'],
      },
    });
    let cart = emptyCart();
    cart = await addItemsToCart({
      cart,
      variantId: HeritageSilverVariantId,
      quantity: 1,
      variantParentId: '',
    });
    cart = await addItemsToCart({
      cart,
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

  it('updateItemsToCart only discounts first sku for appliesOncePerCustomer=false', async () => {
    const { addItemsToCart } = CartService({
      ...sampleState(),
      discounts: {
        lineItemsDiscounts: ['50_off_heritage_silver_applies_once'],
      },
    });
    let cart = emptyCart();
    cart = await addItemsToCart({
      cart,
      variantId: HeritageSilverVariantId,
      quantity: 1,
      variantParentId: '',
    });
    cart = await addItemsToCart({
      cart,
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

  it('updateItemsToCart only discounts once per quantity with appliesOncePerCustomer=false', async () => {
    const { addItemsToCart } = CartService({
      ...sampleState(),
      discounts: {
        lineItemsDiscounts: ['50_off_heritage_silver_applies_once'],
      },
    });
    let cart = emptyCart();
    cart = await addItemsToCart({
      cart,
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

  it('updateItemsToCart includes the currencyCode when fetching discounts', async () => {
    const state = sampleState();

    state.app.currency = 'EUR';

    const { addItemsToCart } = CartService({
      ...state,
      discounts: {
        lineItemsDiscounts: ['50_off_heritage_silver_applies_once'],
      },
    });

    let cart = emptyCart();
    cart = await addItemsToCart({
      cart,
      variantId: HeritageSilverVariantId,
      quantity: 1,
    });

    expect(fetchDiscount).toHaveBeenCalledWith({
      currencyCode: 'EUR',
      discountCode: '50_off_heritage_silver_applies_once',
    });
  });

  it('Sizing kit is not added if there is cart discount allowing it', async () => {
    const { addItemsToCart } = CartService({
      ...sampleState(),
      discounts: {
        lineItemsDiscounts: [SIZING_KIT_DISCOUNT, '100_off_no_sizingkit'],
      },
    });
    let cart = await addItemsToCart({
      cart: emptyCart(),
      variantId: HeritageSilverVariantId,
      quantity: 1,
    });
    expect(cart.lineItems.length).toEqual(1);
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
