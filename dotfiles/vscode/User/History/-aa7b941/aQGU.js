import getItem from './getItem';

const ORIGINAL_NAME = 'original';
const originalItem = {
  itemDescription: ORIGINAL_NAME,
  itemID: 1234,
  price: [
    {
      itemPrice: '5',
    },
    {
      itemPrice: '10',
    },
  ],
};

const DEFAULT_NAME = 'default';
const OVERRIDE_NAME = 'override';

it('returns an object', () => {
  const item = getItem(originalItem);

  expect(typeof item).toBe('object');
});

it('scrubs the original item data', () => {
  const item = getItem(originalItem);

  expect(item).not.toHaveProperty('itemDescription');
  expect(item).not.toHaveProperty('itemID');
});

it('returns adds an id property using itemID', () => {
  const item = getItem(originalItem);

  expect(item.id).toEqual(originalItem.itemID);
});

it('uses override properties', () => {
  const item = getItem(originalItem, { name: OVERRIDE_NAME });

  expect(item.name).toEqual(OVERRIDE_NAME);
});

it('uses default properties', () => {
  const item = getItem(originalItem, {}, { test: DEFAULT_NAME });

  expect(item.test).toEqual(DEFAULT_NAME);
});

it('does not override with defaults', () => {
  const item = getItem(originalItem, {}, { name: DEFAULT_NAME });

  expect(item.name).toEqual(ORIGINAL_NAME);
});
