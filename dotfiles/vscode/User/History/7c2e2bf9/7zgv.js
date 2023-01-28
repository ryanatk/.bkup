import mockAxios from 'axios';

import addItemToCart from './addItemToCart';
import mock from './addItemToCart.mock';

import {
  customerId,
  eventId,
  itemId,
  ooSummaryId,
  priceListId,
} from 'data/mock-data';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

const CART = {
  customerId,
  eventId,
  ooSummaryId,
  items: [],
};
const ITEM = {
  priceListId,
  id: itemId,
  quantity: 1,
};
const EXPECTED_BASE_URL = 'http://localhost/2/';

const expectedParams = {
  cartDetails: [
    {
      customerId,
      eventId,
      onlineOrderId: ooSummaryId,
      priceListId,
      itemId,
      quantity: 1,
    },
  ],
  customerId: customerId,
  eventId: eventId,
  ooId: ooSummaryId,
};

const { data } = mock();

const setup = ({ cart: cartOptions = {}, item: itemOptions = {} }) => {
  const cart = Object.assign({}, CART, cartOptions);
  const item = Object.assign({}, ITEM, itemOptions);

  const mockResolved = () => mockAxios.post.mockResolvedValueOnce(mock());
  const mockReject = () => mockAxios.post.mockRejectedValueOnce();

  const addItem = () => addItemToCart(cart, item);

  return { mockResolved, mockReject, addItem };
};

it('successfully calls orders/add_to_cart', async () => {
  const expectedUrl = `${EXPECTED_BASE_URL}orders2/add_to_cart`;
  const { mockResolved, addItem } = setup({});

  mockResolved();
  await addItem();

  expect(mockAxios.post).toHaveBeenCalledWith(expectedUrl, expectedParams);
});

describe('Parameter Validation', () => {
  const setupValidation = (params) => {
    const { mockReject, addItem } = setup(params);
    mockReject();
    return { addItem };
  };

  it('throws an expected error with cart.customerId missing', async () => {
    const { addItem } = setupValidation({
      cart: {
        customerId: undefined,
      },
    });

    await expect(() => addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with cart.eventId missing', async () => {
    const { addItem } = setupValidation({
      cart: {
        eventId: undefined,
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with cart.ooSummaryId missing', async () => {
    const { addItem } = setupValidation({
      cart: {
        ooSummaryId: undefined,
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with item.priceListId missing', async () => {
    const { addItem } = setupValidation({
      item: {
        priceListId: undefined,
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with item.id missing', async () => {
    const { addItem } = setupValidation({
      item: {
        id: undefined,
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with item.quantity missing', async () => {
    const { addItem } = setupValidation({
      item: {
        quantity: undefined,
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid cart.customerId parameter', async () => {
    const { addItem } = setupValidation({
      cart: {
        customerId: 'iaminvalid',
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid cart.eventId parameter', async () => {
    const { addItem } = setupValidation({
      cart: {
        eventId: {},
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid cart.ooSummaryId parameter', async () => {
    const { addItem } = setupValidation({
      cart: {
        ooSummaryId: 'iaminvalid',
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid item.priceListId parameter', async () => {
    const { addItem } = setupValidation({
      item: {
        priceListId: 'iaminvalid',
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid item.id parameter', async () => {
    const { addItem } = setupValidation({
      item: {
        id: 'iaminvalid',
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid item.quantity parameter', async () => {
    const { addItem } = setupValidation({
      item: {
        quantity: 'iaminvalid',
      },
    });

    await expect(addItem()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });
});

it('returns an object with the expected shape and data', async () => {
  const { mockResolved, addItem } = setup({});

  mockResolved();
  const item = data.cartData[0];

  const result = await addItem();

  expect(result).toEqual({
    item: {
      cartId: item.id,
      id: item.itemID,
      name: item.itemDescription,
      image: item.picturePath,
      quantity: item.quantity,
      ooSummaryId: item.ooSummaryID,
      advancedPrice: item.prices[0].itemPrice,
      floorPrice: item.prices[1].itemPrice,
      price: item.price,
      priceListId: item.priceListID,
      category: item.categoryDescription,
      associatedCategory: item.associatedCategory,
      isRequired: item.isAutoAdded,
      isPackage: item.itemID > 99000,
      increment: 1,
      requiredItems: item.requiredItems,
      suggestedItems: item.suggestedItems,
      description: item.itemLongDescription,
      blurb: item.itemShortDescription,
    },
  });
});

it('returned data is defined where expected', async () => {
  const { mockResolved, addItem } = setup({});

  mockResolved();

  const result = await addItem();

  expect(result).toBeDefined();
});
