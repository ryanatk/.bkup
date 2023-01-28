import getUpdateIncrement, {
  LABOR_INCREMENT,
  DEFAULT_INCREMENT,
} from './getUpdateIncrement';

it('returns correct increment for labor items', () => {
  const result = getUpdateIncrement(true);

  expect(result).toBe(LABOR_INCREMENT);
});

it('returns correct increment for non-labor items', () => {
  const result = getUpdateIncrement(false);

  expect(result).toBe(DEFAULT_INCREMENT);
});
