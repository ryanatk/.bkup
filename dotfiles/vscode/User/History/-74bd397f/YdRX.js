import mockAxios from 'axios';

import getEventPackages, { FILTER_LABEL } from './getEventPackages';
import mock from './getEventPackages.mock';

import { eventId, ooId } from 'data/mock-data';
import { getItem } from 'data/utils';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const DEFAULT_PARAMS = {
  eventId,
  ooId,
};
const EXPECTED_BASE_URL = 'http://localhost/2/';

const setup = (paramOptions = {}) => {
  const params = {
    ...DEFAULT_PARAMS,
    ...paramOptions,
  };

  const mockResolved = () => mockAxios.get.mockResolvedValueOnce(mock());
  const mockReject = () => mockAxios.get.mockRejectedValueOnce();

  const getPackages = () => getEventPackages(params);
  const mockData = mock().data.packageData;

  return { mockResolved, mockReject, getPackages, mockData };
};

it('successfully calls order2/event_packages', async () => {
  const expectedUrl = `${EXPECTED_BASE_URL}orders2/event_packages/${eventId}/${ooId}`;
  const { mockResolved, getPackages } = setup({});

  mockResolved();
  await getPackages();

  expect(mockAxios.get).toHaveBeenCalledWith(expectedUrl);
});

describe('Parameter Validation', () => {
  const setupValidation = (params) => {
    const { mockReject, getPackages } = setup(params);
    mockReject();
    return { getPackages };
  };

  it('throws an expected error with eventId missing', async () => {
    const { getPackages } = setupValidation({ eventId: undefined });

    await expect(() => getPackages()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid eventId parameter', async () => {
    const { getPackages } = setupValidation({ eventId: {} });

    await expect(() => getPackages()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with ooId missing', async () => {
    const { getPackages } = setupValidation({ ooId: undefined });

    await expect(() => getPackages()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid ooId parameter', async () => {
    const { getPackages } = setupValidation({ ooId: {} });

    await expect(() => getPackages()).rejects.toThrow();
    expect(mockAxios.get).not.toHaveBeenCalled();
  });
});

it('returns an object with the expected shape and data', async () => {
  const { mockResolved, getPackages, mockData } = setup({});

  mockResolved();

  const result = await getPackages();
  const category = result.categories[0];

  expect(result.description).toEqual(FILTER_LABEL);
  expect(category.description).toEqual(mockData[0].categoryGroup);
  expect(category.items).toEqual([getItem(mockData[0])]);
});

it('returned data is defined where expected', async () => {
  const { mockResolved, getPackages } = setup({});

  mockResolved();

  const result = await getPackages();

  const item = result[0].categories[0].items[0];

  expect(item.id).toBeDefined();
  expect(item.name).toBeDefined();
  expect(item.image).toBeDefined();
  expect(item.advancedPrice).toBeDefined();
  expect(item.floorPrice).toBeDefined();
  expect(item.priceListId).toBeDefined();

  expect(item.quantity).toBeDefined();
});
