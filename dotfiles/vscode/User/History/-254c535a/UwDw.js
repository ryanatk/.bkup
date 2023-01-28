import getUpdateIncrement, {
  LABOR_INCREMENT,
  DEFAULT_INCREMENT,
  LABOR_RANGES,
} from './getUpdateIncrement';

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

it('returns correct increment for labor items', () => {
  LABOR_IDS.map((id) => expect(getUpdateIncrement(id)).toBe(LABOR_INCREMENT));
});

it('returns correct increment for non-labor items', () => {
  ITEM_IDS.map((id) => {
    expect(getUpdateIncrement(id)).toBe(DEFAULT_INCREMENT);
  });
});
