import { CHARGER_SET_SKUS, RING_SKUS } from '../consts/ring';
import CartState, { CartLineItem } from '../types/CartState';

export const isARing = (lineItem: CartLineItem) => {
  if (RING_SKUS.includes(lineItem.sku)) return true;
  return false;
};

export const isCharger = (lineItem: CartLineItem): boolean =>
  CHARGER_SET_SKUS.includes(lineItem.sku);

export const isHardware = (lineItem: CartLineItem) => {
  if (
    RING_SKUS.includes(lineItem.sku) ||
    CHARGER_SET_SKUS.includes(lineItem.sku)
  )
    return true;
  return false;
};

export function getCartRingCount(cart: CartState) {
  const lineItems = cart && cart.lineItems;
  if (lineItems) {
    return lineItems.filter((lineItem: CartLineItem) => isARing(lineItem))
      .length;
  }
}

export function getCartChargerCount(cart: CartState) {
  const lineItems = cart && cart.lineItems;
  if (lineItems) {
    return lineItems.filter((lineItem: CartLineItem) => isCharger(lineItem))
      .length;
  }
}

export function getCartIconCount(cart: CartState) {
  const lineItems = cart && cart.lineItems;
  if (lineItems) {
    const items = lineItems.filter((lineItem: CartLineItem) =>
      isHardware(lineItem),
    );
    const count = items.reduce((total, { quantity }) => total + quantity, 0);

    return count;
  }
}
