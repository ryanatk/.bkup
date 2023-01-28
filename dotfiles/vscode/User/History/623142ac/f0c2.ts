import { MAX_QUANTITY } from '../../../../consts/cart';
import CartState from '../../../../types/CartState';
import { isCharger } from '../../../../utils/cartCount';

export const getAddQuantity = (cart: CartState, variantId: number): number => {
  const lineItem = cart.lineItems.find(({ id }) => Number(id) === variantId);
  const isCumulative = isCharger(lineItem);
  const original = isCumulative ? lineItem?.quantity ?? 0 : 0;
  const updated = original + 1;
  const quantity = updated > MAX_QUANTITY ? MAX_QUANTITY : updated;

  return quantity;
};
