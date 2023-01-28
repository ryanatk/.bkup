import { merge } from 'lodash';

import { EMPTY_CART } from 'common/const';

export const TYPE = {
  NEW_CART: 'new-cart',
  QUEUE: 'queue',
  REFRESH: 'refresh-started',
  REFRESH_SETTLED: 'refresh-settled',
  UPDATE: 'update-item',
  UPDATE_SETTLED: 'update-item-settled',
  UPDATE_ERROR: 'update-item-error',
};

const INIT_STATE = {
  // cart data
  boothNum: '',
  eventId: '',
  ooSummaryId: EMPTY_CART.ID,
  items: [],
  error: '',
  totalsData: EMPTY_CART.TOTALS,

  // cart update handling
  isTouched: false, // array of item id's, to know if we're dirty
  isRefreshing: false,
  queue: {}, // items by id { id: { item, quantity }}
  unsettled: [],
};

const removeFromQueue = (queue, item) => {
  const { [item.id]: removing, ...rest } = queue;
  console.log('!removeFromQueue', { queue, rest });

  return rest;
};

const updateItems = (cartItems, item, quantity) => {
  const isNewItem = !cartItems.find((cartItem) => cartItem?.id === item?.id);
  console.log('!updateItems', { cartItems, item, isNewItem });

  const items = isNewItem
    ? [...cartItems, item]
    : cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? // if a quantity is passed in, use it
            // otherwise keep the quantity that's in the cart
            { ...item, quantity: quantity ?? cartItem.quantity }
          : cartItem,
      );

  console.log('!updateItems', { items });

  return items.filter(({ quantity }) => Boolean(quantity));
};

export const init = (currentState) => merge({}, INIT_STATE, currentState);

const reducer = (state, { type, payload }) => {
  console.log('!reducer', { state, type, payload });

  const { ooSummaryId, eventId, order, item, quantity, error } = payload ?? {};

  switch (type) {
    case TYPE.NEW_CART:
      return {
        ...state,
        ooSummaryId,
        eventId,
      };

    case TYPE.QUEUE:
      return {
        ...state,
        isTouched: true,
        queue: { ...state.queue, [item.id]: { ...item, quantity } },
        items: updateItems(state.items, item, quantity),
      };

    case TYPE.REFRESH:
      return {
        ...state,
        isTouched: false,
        isRefreshing: true,
      };

    case TYPE.REFRESH_SETTLED:
      return {
        ...state,
        ...order,
        isRefreshing: false,
        error: '', // clear error
      };

    case TYPE.UPDATE:
      return {
        ...state,
        queue: removeFromQueue(state.queue, item),
        unsettled: [...state.unsettled, item.id],
      };

    case TYPE.UPDATE_SETTLED:
      return {
        ...state,
        items: updateItems(state.items, item),
        unsettled: state.unsettled.filter((id) => id !== item?.id),
      };

    case TYPE.UPDATE_ERROR:
      return {
        ...state,
        queue: {}, // on error, empty the queue
        unsettled: state.unsettled.filter((id) => id !== item.id),
        error,
      };

    default:
      throw Error('Mismatched type for useCart dispatch');
  }
};

export default reducer;
