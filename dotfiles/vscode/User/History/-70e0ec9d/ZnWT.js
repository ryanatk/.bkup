import isZero from './isZero';

it('returns true when number is 0', () => {
  const result = isZero(0);

  expect(result).toBe(true);
});

it('returns true when number is less than 0', () => {
  const result = isZero(-1);

  expect(result).toBe(true);
});

it('returns false when number is more than 0', () => {
  const result = isZero(1);

  expect(result).toBe(false);
});
