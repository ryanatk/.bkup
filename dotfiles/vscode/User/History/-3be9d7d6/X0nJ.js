import { incompleteOrders } from 'data/mock-data';
import { getOrder } from 'data/utils';
import { EMPTY_CART } from 'common/const';

import reducer, { init, TYPE } from './reducer';

const orderData = incompleteOrders[0];
const order = getOrder({
  ...orderData,
  id: orderData.ooSummaryID,
  items: orderData.cartDetails,
  totals: orderData.cartTotal,
  boothNumber: orderData.boothData?.number,
});

describe('on init', () => {
  const setup = (opt = {}) => init(opt);

  it('sets ooSummaryId to empty cart id', () => {
    const { ooSummaryId } = setup();
    expect(ooSummaryId).toBe(EMPTY_CART.ID);
  });

  it('sets totalsData to empty cart totals', () => {
    const { totalsData } = setup();
    expect(totalsData).toEqual(EMPTY_CART.TOTALS);
  });
});

describe('actions', () => {
  const action =
    (type) =>
    ({ state = {}, payload = {} } = {}) =>
      reducer(init(state), { type, payload });

  describe('REFRESH', () => {
    const type = TYPE.REFRESH;
    const setup = action(type);

    it('resets touched flag', () => {
      const { isTouched } = setup();
      expect(isTouched).toBe(false);
    });

    it('sets refreshing flag', () => {
      const { isRefreshing } = setup();
      expect(isRefreshing).toBe(true);
    });
  });

  describe('REFRESH_SETTLED', () => {
    const type = TYPE.REFRESH_SETTLED;
    const setup = action(type);

    it('updates items', () => {
      const { items } = setup({ payload: { order } });
      expect(items).toEqual(order.items);
    });

    it('removes existing error message', () => {
      const state = { error: 'fail' };
      const { error } = setup({ state });
      expect(error).not.toBe(state.error);
    });
  });

  // TODO: add the rest of the tests for the new actions

  describe('NEW_CART', () => {
    const type = TYPE.NEW_CART;
    const setup = action(type);

    it('updates ooSummaryId', () => {
      const payload = { ooSummaryId: 2, eventId: 1 };
      const { eventId, ooSummaryId } = setup({ payload });
      expect({ ooSummaryId, eventId }).toEqual(payload);
    });
  });

  describe('UPDATE', () => {
    const type = TYPE.UPDATE;
    const setup = action(type);

    it('updates items to include new item and sets quantity to the increment', () => {
      const payload = { id: 'item 1', addIncrement: 4 };
      const { items } = setup({ payload });
      expect(items).toContainEqual({
        ...payload,
        quantity: payload.addIncrement,
      });
    });
  });

  describe('UPDATE', () => {
    const type = TYPE.UPDATE;
    const setup = action(type);

    it('updates quantity for specific item, without changing others', () => {
      const ITEM_1 = { id: 'item 1', quantity: 3 };
      const ITEM_2 = { id: 'item 2', quantity: 1 };
      const ITEM_3 = { id: 'item 3', quantity: 5 };
      const state = { items: [ITEM_1, ITEM_2, ITEM_3] };
      const payload = { ...ITEM_2, quantity: 4 };
      const { items } = setup({ state, payload });

      expect(items).toContainEqual(ITEM_1);
      expect(items).toContainEqual(payload);
      expect(items).toContainEqual(ITEM_3);
      expect(items).not.toContainEqual(ITEM_2);
    });
  });

  describe('UPDATE_ITEM_ERROR', () => {
    const type = TYPE.UPDATE_ITEM_ERROR;
    const setup = action(type);

    it('sets error message', () => {
      const payload = { error: 'this new error message' };
      const { error } = setup({ payload });

      expect(error).toBe(payload.error);
    });
  });

  describe('default', () => {
    const type = 'not listed';
    const setup = action(type);

    it('throws an error when not choosing a proper type', () => {
      expect(() => setup()).toThrow();
    });
  });
});
