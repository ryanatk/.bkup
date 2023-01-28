import { getNewQuantity } from '..';
import { getLineItem } from '../../../../../tests/commonFixtures/cart';

describe('quantity in cart is 0', () => {
  it('returns 1 for an item that does not accumulate', () => {
    const item = getLineItem();
    const quantity = getNewQuantity(item);
    expect(quantity).toBe(1);
  });

  it('returns 1 for an item that does accumulate', () => {
    const item = getLineItem();
    const quantity = getNewQuantity(item, true);
    expect(quantity).toBe(1);
  });
});

describe('quantity in cart is not 0', () => {
  it('returns 1 for an item that does not accumulate', () => {
    const item = getLineItem({ quantity: 5 });
    const quantity = getNewQuantity(item);
    expect(quantity).toBe(1);
  });

  it('returns accumulated quantity for a charger', () => {
    const IN_CART = 3;
    const item = getLineItem({ quantity: IN_CART });
    const quantity = getNewQuantity(item, true);
    expect(quantity).toBe(IN_CART + 1);
  });
});
