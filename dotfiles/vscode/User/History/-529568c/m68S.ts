import { INITIAL_STATE as appInitialState } from '../../stores/app/initialState';
import { INITIAL_STATE as checkoutInitialState } from '../../stores/checkout/initialState';
import CartState, { CartLineItem } from '../../types/CartState';
import State from '../../types/State';

export const SizingKitDiscount = '79JQ1Z2WW13E';
export const HeritageSilverProduct = '4319831752758';
export const HeritageSilverVariantId = 31029748826166;
export const HeritageSilverVariantId2 = 31029748858934;
export const HeritageBlackVariantId = 31029700919350;
export const SizingKitProduct = 21266804768822;
export const UsMessage =
  'Shipping and taxes will be calculated during checkout. All prices in USD.';
export const FinlandMessage =
  'Shipping and taxes will be calculated during checkout.';

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function emptyCart(): CartState {
  return {
    isLoading: false,
    currency: 'USD',
    discounts: [],
    lineItems: [],
    totalCount: 0,
    totalPrice: 0,
    totalDiscount: 0,
    totalPriceAfterDiscount: 0,
    cartDiscount: false,
    cartId: false,
    updateVersion: 1,
  };
}

export function sampleState(): State {
  return {
    app: clone(appInitialState),
    discounts: {
      lineItemsDiscounts: [],
      cartDiscounts: [],
      discountError: false,
      skipSizingStep: false,
    },
    cart: emptyCart(),
    checkout: clone(checkoutInitialState),
    myOrder: {
      update: false,
      error: false,
      isLoading: true,
      // @ts-ignore
      paymentMethod: {
        status: null,
        type: null,
        last4: null,
        cardType: null,
        shipToContact: null,
        billToContact: null,
      },
      updatePayment: {
        initiated: false,
        isLoading: false,
        billingAddress: {
          fname: '',
          lname: '',
          address: '',
          address2: '',
          city: '',
          country: '',
          state: '',
          postal: '',
          organization: '',
          vat: '',
          phone: '',
        },
      },
    },
  };
}

interface LineItemOptions {
  title?: string;
  sku?: string;
  quantity?: number;
  parentId?: string;
}

const getLineItem = (options?: LineItemOptions): CartLineItem =>
  Object.assign(
    {
      title: 'Oura Ring Generation 3',
      id: 'TEST_ID',
      available: true,
      unitPrice: 100,
      price: 100,
      totalDiscountPrice: 100,
      productId: 1,
      sku: 'TEST_SKU',
      image: [{ originalSrc: '', alt: '' }],
      selectedOptions: [],
      quantity: 1,
      discounts: null,
      parentId: null,
    },
    options,
  );

export function multipleRingsInCart(): CartState {
  return {
    isLoading: false,
    currency: 'USD',
    discounts: [],
    lineItems: [
      getLineItem({
        title: 'Oura Sizing Kit',
        parentId: '1',
      }),
      getLineItem(),
      getLineItem(),
      getLineItem(),
    ],
    totalCount: 0,
    totalPrice: 0,
    totalDiscount: 0,
    totalPriceAfterDiscount: 0,
    cartDiscount: false,
    cartId: false,
    updateVersion: 1,
  };
}
