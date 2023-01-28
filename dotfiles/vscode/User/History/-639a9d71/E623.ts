import { CHARGER_SET_SKUS, RING_SKUS } from '../consts/ring';
import CartState, { CartLineItem } from '../types/CartState';

export const isARing = (lineItem: CartLineItem): boolean =>
  RING_SKUS.includes(lineItem?.sku);

export const isCharger = (lineItem: CartLineItem): boolean =>
  CHARGER_SET_SKUS.includes(lineItem?.sku);

export const isHardware = (lineItem: CartLineItem): boolean =>
  isARing(lineItem) || isCharger(lineItem);

// helper to use for utils below
const getCount = (
  cart: CartState,
  filterItems: (lineItem: CartLineItem) => boolean,
): number => {
  if (!cart?.lineItems?.length) {
    return 0;
  }

  const items = cart.lineItems.filter((lineItem: CartLineItem) => filterItems);
  const count = items.reduce(
    (total, { quantity = 1 }) => total + Number(quantity),
    0,
  );

  return count;
};

export const getCartRingCount = (cart: CartState): number =>
  getCount(cart, () => isARing(lineItem));

export const getCartChargerCount = (cart: CartState): number =>
  getCount(cart, (lineItem: CartLineItem) => isCharger(lineItem));

export const getCartIconCount = (cart: CartState): number =>
  getCount(cart, (lineItem: CartLineItem) => isHardware(lineItem));
