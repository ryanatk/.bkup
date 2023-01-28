import mockAxios from 'axios';

import updateQuantity from './updateQuantity';
import mock from './addItemToCart.mock';

import {
  customerId,
  eventId,
  ooSummaryId,
  catalogItem,
  cartId,
} from 'data/mock-data';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

const ITEM = {
  ...catalogItem,
  priceListId: catalogItem.priceListID,
  id: catalogItem.itemID,
  cartId: cartId,
};
const CART = {
  customerId,
  eventId,
  ooSummaryId,
  items: [ITEM],
};
const EXPECTED_BASE_URL = 'http://localhost/2/';

const setup = ({
  cart: cartOptions = {},
  item: itemOptions = {},
  quantity = 1,
} = {}) => {
  const cart = Object.assign({}, CART, cartOptions);
  const item = Object.assign({}, ITEM, itemOptions);

  const mockReject = () => mockAxios.post.mockRejectedValueOnce();
  const mockResolved = () => mockAxios.post.mockResolvedValueOnce(mock());

  const updateAmount = () => updateQuantity(cart, item, quantity);

  return { mockReject, mockResolved, updateAmount };
};

it('successfully calls orders2/update_cart', async () => {
  const expectedUrl = `${EXPECTED_BASE_URL}orders2/update_cart`;

  const { mockResolved, updateAmount } = setup();
  mockResolved();

  await updateAmount();

  const expectedParameter = {
    cartDetails: [
      {
        customerId,
        eventId,
        itemId: ITEM.id,
        priceListId: ITEM.priceListID,
        quantity: 1,
        onlineOrderId: CART.ooSummaryId,
        id: cartId,
      },
    ],
    customerId,
    eventId,
    ooId: ooSummaryId,
  };

  expect(mockAxios.post).toHaveBeenCalledWith(expectedUrl, expectedParameter);
});

describe('Parameter Validation', () => {
  const setupValidation = (params) => {
    const { mockReject, updateAmount } = setup(params);
    mockReject();
    return { updateAmount };
  };

  it('throws an expected error with the item to update missing from the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        items: [],
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with customerId missing from the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        customerId: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with eventId missing from the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        eventId: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with ooSummaryId missing from the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        ooSummaryId: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with priceListId missing from the item object', async () => {
    const { updateAmount } = setupValidation({
      item: {
        ...ITEM,
        priceListId: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with id missing from the item object', async () => {
    const { updateAmount } = setupValidation({
      item: {
        ...ITEM,
        id: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with cartId missing', async () => {
    const { updateAmount } = setupValidation({
      item: {
        ...ITEM,
        cartId: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid customerId in the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        customerId: undefined,
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid eventId in the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        eventId: {},
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid ooSummaryId in the cart object', async () => {
    const { updateAmount } = setupValidation({
      cart: {
        ...CART,
        ooSummaryId: {},
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid priceListId in the item object', async () => {
    const { updateAmount } = setupValidation({
      item: {
        ...ITEM,
        priceListId: 'iaminvalid',
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error with an invalid id in the item object', async () => {
    const { updateAmount } = setupValidation({
      item: {
        ...ITEM,
        id: {},
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error an invalid quantity', async () => {
    const { updateAmount } = setupValidation({ quantity: 'iaminvalid' });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });

  it('throws an expected error an invalid cartId', async () => {
    const { updateAmount } = setupValidation({
      item: {
        ...ITEM,
        cartId: 'iaminvalid',
      },
    });

    await expect(() => updateAmount()).rejects.toThrow();
    expect(mockAxios.post).not.toHaveBeenCalled();
  });
});
