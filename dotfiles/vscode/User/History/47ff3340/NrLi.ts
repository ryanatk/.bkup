import { getNewQuantity } from '..';
import { CHARGER_SET_SKUS } from '../../../../../consts/ring';
import { getLineItem } from '../../../../../tests/commonFixtures/cart';

describe('quantity in cart is 0', () => {
  it('returns 1 quantity for a ring', () => {
    const quantity = getNewQuantity(getLineItem());
    expect(quantity).toBe(1);
  });

  it('returns 1 for a charger', () => {
    const quantity = getNewQuantity(
      getLineItem({ sku: CHARGER_SET_SKUS[0], quantity: 0 }),
    );
    expect(quantity).toBe(1);
  });
});

describe('quantity in cart is not 0', () => {
  it('returns 1 for a ring', () => {
    const quantity = getNewQuantity(getLineItem({ quantity: 5 }));
    expect(quantity).toBe(1);
  });

  it('returns accumulated quantity for a charger', () => {
    const inCart = 3;
    const quantity = getNewQuantity(
      getLineItem({ sku: CHARGER_SET_SKUS[0], quantity: inCart }),
    );
    expect(quantity).toBe(inCart + 1);
  });
});
