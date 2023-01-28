import { getNewQuantity } from '..';
import { CHARGER_SET_SKUS } from '../../../../../consts/ring';
import { getLineItem } from '../../../../../tests/commonFixtures/cart';

it('returns 1 when there was no quantity', () => {
  const quantity = getNewQuantity(getLineItem({ sku: CHARGER_SET_SKUS[0] }));
  expect(quantity).toBe(1);
});
