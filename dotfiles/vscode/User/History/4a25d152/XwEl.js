import { EMPTY_CART } from 'common/const';
import getItem from './getItem';
import getCart from './getCart';

const ID = 8;
const ITEMS = [
  {
    ooSummaryID: ID,
    totalsData: undefined,
    price: [
      {
        itemPrice: 10,
      },
      {
        itemPrice: 11,
      },
    ],
  },
];
const SERVER_DATA = ITEMS;

it('returns proper data structure from server data', () => {
  const { ooSummaryId, totalsData, items } = getCart(SERVER_DATA);

  expect(ooSummaryId).toEqual(ID);
  expect(totalsData).toEqual(EMPTY_CART.TOTALS);
  expect(items).toEqual(ITEMS.map(getItem));
});

it('does not error with undefined', () => {
  const args = undefined;
  expect(() => getCart(args)).not.toThrow();
});

it('does not error with empty array', () => {
  const args = [];
  expect(() => getCart(args)).not.toThrow();
});
