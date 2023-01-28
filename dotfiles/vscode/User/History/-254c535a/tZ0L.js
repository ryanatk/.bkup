import getItemUpdateIncrement, {
  LABOR_INC,
  DEFAULT_INC,
} from './getItemUpdateIncrement';

// short alias
const getInc = (id) => getItemUpdateIncrement(id);
const LABOR_IDS = [4000];
const ITEM_IDS = [1001];

it('returns correct increment for labor items', () => {
  LABOR_IDS.map((id) => expect(getInc(id)).toBe(LABOR_INC));
});

it('returns correct increment for non-labor items', () => {
  ITEM_IDS.map((id) => expect(getInc(id)).toBe(DEFAULT_INC));
});
