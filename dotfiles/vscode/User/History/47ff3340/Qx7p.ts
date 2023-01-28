import { getNewQuantity } from '..';

it('returns 1 when there was no quantity', () => {
  const quantity = getNewQuantity({});
  expect(quantity).toBe(1);
});
