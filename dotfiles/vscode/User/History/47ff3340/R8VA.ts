import { getNewQuantity } from '..';
import { CHARGER_SET_SKUS } from '../../../../../consts/ring';
import { getLineItem } from '../../../../../tests/commonFixtures/cart';

it('returns 1 for a ring with no quantity', () => {
  const quantity = getNewQuantity(getLineItem());
  expect(quantity).toBe(1);
});

it('returns 1 for a ring with a quantity', () => {
  const quantity = getNewQuantity(getLineItem({ quantity: 5 }));
  expect(quantity).toBe(1);
});

it('returns 1 for a charger with no quantity', () => {
  const quantity = getNewQuantity(getLineItem({ sku: CHARGER_SET_SKUS[0] }));
  expect(quantity).toBe(1);
});

it('returns new quantity for a charger with a quantity', () => {
  const inCart = 3;
  const quantity = getNewQuantity(
    getLineItem({ sku: CHARGER_SET_SKUS[0], quantity: inCart }),
  );
  expect(quantity).toBe(inCart + 1);
});
