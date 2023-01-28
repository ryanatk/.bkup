import mockAxios from 'axios';

import getEventCatalog from './getEventCatalog';
import mock from './getEventCatalog.mock';

import { eventId, ooId, boothLocation, boothType } from 'data/mock-data';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const DEFAULT_PARAMS = {
  ooId,
  eventId,
  boothLocation,
  boothType,
};
const EXPECTED_BASE_URL = 'http://localhost/2/';

const { data } = mock();

const setup = (paramOptions = {}) => {
  const params = {
    ...DEFAULT_PARAMS,
    ...paramOptions,
  };

  const mockResolved = () => mockAxios.get.mockResolvedValueOnce(mock());
  const mockReject = () => mockAxios.get.mockRejectedValueOnce();

  const getCatalog = () => getEventCatalog(params);

  return { mockResolved, mockReject, getCatalog };
};

it('successfully calls events/catalog/{eventId}', async () => {
  const expectedUrl = `${EXPECTED_BASE_URL}events/catalog/${eventId}/${ooId}/${boothType}/${boothLocation}`;
  const { mockResolved, getCatalog } = setup({});

  mockResolved();
  await getCatalog();

  expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl);
});

describe('Parameter Validation', () => {
  const setupValidation = (params) => {
    const { mockReject, getCatalog } = setup(params);
    mockReject();
    return { getCatalog };
  };

  it('throws an expected error with eventId missing', async () => {
    const { getCatalog } = setupValidation({ eventId: undefined });

    await expect(() => getCatalog()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid eventId parameter', async () => {
    const { getCatalog } = setupValidation({ eventId: {} });

    await expect(() => getCatalog()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with ooId missing', async () => {
    const { getCatalog } = setupValidation({ ooId: undefined });

    await expect(() => getCatalog()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid ooId parameter', async () => {
    const { getCatalog } = setupValidation({ ooId: {} });

    await expect(() => getCatalog()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });
});

it('returns an object with the expected shape and data', async () => {
  const { mockResolved, getCatalog } = setup({});

  mockResolved();

  const { catalog } = await getCatalog();
  const item = data.categoryData[0].subCategories[0].items[0];

  expect(catalog[0].description).toEqual(data.categoryData[0].description);
  expect(catalog[0].categories[0].items[0]).toEqual({
    id: item.itemID,
    cartId: item.id,
    ooSummaryId: item.ooSummaryID,
    name: item.itemDescription,
    image: item.picturePath,
    addIncrement: 1,
    updateIncrement: 1,
    quantity: item.quantity,
    advancedPrice: item.price[0].itemPrice,
    floorPrice: item.price[1].itemPrice,
    price: item.price,
    priceListId: item.priceListID,
    min: item.minQty,
    max: item.maxQty,
    category: item.categoryDescription,
    associatedCategory: item.associatedCategory,
    isRequired: item.isAutoAdded,
    isPackage: item.itemID > 99000,
    isFree: (item.price[0].itemPrice ?? item.price[1].itemPrice) === 0,
    requiredItems: item.requiredItems,
    suggestedItems: item.suggestedItems,
    description: item.itemLongDescription,
    blurb: item.itemShortDescription,
  });
});

it('returned data is defined where expected', async () => {
  const { mockResolved, getCatalog } = setup({});

  mockResolved();

  const { catalog } = await getCatalog();

  const item = catalog[0].categories[0].items[0];

  expect(item.id).toBeDefined();
  expect(item.name).toBeDefined();
  expect(item.image).toBeDefined();
  expect(item.advancedPrice).toBeDefined();
  expect(item.floorPrice).toBeDefined();
  expect(item.priceListId).toBeDefined();

  expect(item.quantity).toBeDefined();
  expect(item.addIncrement).toBeDefined();
  expect(item.updateIncrement).toBeDefined();
});
