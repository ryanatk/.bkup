import getIsLabor, { LABOR_RANGES } from './getIsLabor';

// list of ids that fall within the ranges
const LABOR_IDS = LABOR_RANGES.reduce(
  (list, [start, end]) => [...list, start, end],
  [],
);

// list of ids outside the ranges
const ITEM_IDS = LABOR_RANGES.reduce(
  (list, [start, end]) => [...list, start - 1, end + 1],
  [],
);

it('returns true for labor items', () => {
  LABOR_IDS.forEach((id) => {
    const result = getIsLabor(id);

    expect(result).toBe(true);
  });
});

it('returns false for non-labor items', () => {
  ITEM_IDS.forEach((id) => {
    const result = getIsLabor(id);

    expect(result).toBe(false);
  });
});
