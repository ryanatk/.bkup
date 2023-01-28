import { SIZING_KIT_DISCOUNT } from '../consts/discounts';
import { Discount } from '../types/CartState';
import CheckoutState from '../types/CheckoutState';
import State from '../types/State';
import SentryErrorHandler from '../utils/sentryErrorHandler';
import Utils from '../utils/utils';
import {
  BuildAnalyticsCartItems,
  BuildCartLineItems,
  GA4CheckoutStepType,
  PayloadItems,
} from './types';

export const hashString = (str: string): string => Utils.hashString(str);

export const getCoupon = (order: CheckoutState['order']): string => {
  const couponCode: Pick<GA4CheckoutStepType, 'coupon'> = {
    coupon: '',
  };
  order?.cart?.lineItems?.forEach(({ discounts }) => {
    if (discounts?.code !== SIZING_KIT_DISCOUNT) {
      couponCode.coupon = discounts?.code;
    }
  });

  return couponCode.coupon;
};

const category = {
  ['Oura Sizing Kit']: 'Sizing Kit',
  ['Charger Set']: 'Charger Set',
  ['Oura Membership']: 'Subscription',
  ['2-Year Protection Plan']: 'Warranty',
  ['3-Year Protection Plan']: 'Warranty',
};

export const productCategory = (title: PayloadItems['title']): string => {
  return category[title] ?? 'Ring';
};

// Return total discounts amount
//
export const totalDiscounts = (discounts: Discount[]): number => {
  if (!Array.isArray(discounts)) return 0;

  return discounts.reduce((acc, cur) => acc + cur.value, 0);
};

// Format cart line items
//
export const buildCartLineItems = (
  state?: State,
  isCheckout = false,
): BuildCartLineItems[] => {
  const cart = { ...state?.cart };

  if (!cart.lineItems || isCheckout) {
    if (state?.checkout?.order) {
      cart.lineItems = state.checkout.order.cart.lineItems;
    } else {
      SentryErrorHandler(
        {
          error: 'buildCartLineItems error',
          type: 'analytics error',
          message: 'buildCartLineItems failed because data is missing',
        },
        {
          message: 'state.checkout.order is missing from state',
          category: 'marketing',
        },
      );
    }
  }
  if (!cart.lineItems) return [];
  return cart.lineItems.map(({ id, sku, title, price, quantity, image }) => ({
    product_id: id,
    sku,
    name: title,
    price,
    position: 1,
    quantity,
    category: productCategory(title),
    url: `https://www.ouraring.com/product/${title}`,
    image_url: image[0].originalSrc,
  }));
};

// Format cart line items for analytics v4
//
export const buildAnalyticsCartItems = (
  state: State,
  isCheckout = false,
): BuildAnalyticsCartItems[] => {
  const cart = { ...state?.cart };
  if (!cart.lineItems || isCheckout) {
    if (state?.checkout?.order) {
      cart.lineItems = state.checkout.order.cart.lineItems;
    } else {
      SentryErrorHandler(
        {
          error: 'buildAnalyticsCartItems error',
          type: 'analytics error',
          message: 'buildAnalyticsCartItems failed because data is missing',
        },
        {
          message: 'state.checkout.order is missing from state',
          category: 'marketing',
        },
      );
    }
  }
  if (!cart.lineItems) return [];
  return cart.lineItems.map(
    ({ id, title, price, quantity, discounts, totalDiscountPrice }) => {
      const coupon =
        discounts && discounts?.code !== SIZING_KIT_DISCOUNT && discounts.code;

      return {
        item_id: id,
        item_name: title,
        price: price,
        quantity: quantity,
        item_category: productCategory(title),
        coupon,
        currency: state.app.currency,
        discount: totalDiscountPrice,
        item_variant: id,
        item_brand: 'Oura Ring',
      };
    },
  );
};
