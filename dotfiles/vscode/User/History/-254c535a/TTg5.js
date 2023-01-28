import getItemUpdateIncrement, {
  LABOR_INC,
  DEFAULT_INC,
} from './getItemUpdateIncrement';

// short alias
const getInc = (id) => getItemUpdateIncrement(id);
const LABOR_IDS = [4000];
const ITEM_IDS = [1001];

it('returns .25 for labor items', () => {
  LABOR_IDS.map((id) => expect(getInc(4000)).toBe(LABOR_INC));
});
