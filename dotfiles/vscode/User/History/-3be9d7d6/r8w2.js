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
const item = order.items[0];

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

  describe('NEW_CART', () => {
    const type = TYPE.NEW_CART;
    const setup = action(type);
    const payload = { ooSummaryId: 2, eventId: 1 };

    it('updates ooSummaryId', () => {
      const { ooSummaryId } = setup({ payload });
      expect(ooSummaryId).toBe(payload.ooSummaryId);
    });

    it('updates eventId', () => {
      const { eventId } = setup({ payload });
      expect(eventId).toBe(payload.eventId);
    });
  });

  describe('QUEUE', () => {
    const type = TYPE.QUEUE;
    const setup = action(type);
    const payload = { item, quantity: 4 };

    it('sets the touched flag', () => {
      const { isTouched } = setup({ payload });
      expect(isTouched).toBe(true);
    });

    it('adds the item to the queue', () => {
      const { queue } = setup({ payload });
      expect(queue).toHaveProperty(item.id.toString());
      expect(queue[item.id]).toEqual({ ...item, quantity: payload.quantity });
    });

    it('adds the item to items', () => {
      const { items } = setup({ payload });
      expect(items).toEqual(
        expect.arrayContaining([{ ...item, quantity: payload.quantity }]),
      );
    });
  });

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

    it('resets refreshing flag', () => {
      const { isRefreshing } = setup();
      expect(isRefreshing).toBe(false);
    });

    it('removes existing error message', () => {
      const state = { error: 'fail' };
      const { error } = setup({ state });
      expect(error).not.toBe(state.error);
    });
  });

  describe('UPDATE', () => {
    const type = TYPE.UPDATE;
    const setup = action(type);
    const payload = { item };

    it('removes the item from the queue', () => {
      const { queue } = setup({ payload });
      expect(queue).not.toHaveProperty(item.id.toString());
    });

    it('adds the item id to the unsettled list', () => {
      const { unsettled } = setup({ payload });
      expect(unsettled).toContain(payload.item.id);
    });
  });

  describe('UPDATE_SETTLED', () => {
    const type = TYPE.UPDATE_SETTLED;
    const setup = action(type);
    const state = { items: [item] };
    const payload = { item };

    it('updates quantity the item', () => {
      const { items } = setup({ state, payload });

      expect(items[0]).toEqual(payload.item);
    });

    it('removes the item from the unsettled list', () => {
      const { unsettled } = setup({ state, payload });
      expect(unsettled).not.toContain(payload.item.id);
    });
  });

  // describe('UPDATE_ITEM_ERROR', () => {
  //   const type = TYPE.UPDATE_ITEM_ERROR;
  //   const setup = action(type);

  //   it('sets error message', () => {
  //     const payload = { error: 'this new error message' };
  //     const { error } = setup({ payload });

  //     expect(error).toBe(payload.error);
  //   });
  // });

  // describe('default', () => {
  //   const type = 'not listed';
  //   const setup = action(type);

  //   it('throws an error when not choosing a proper type', () => {
  //     expect(() => setup()).toThrow();
  //   });
  // });
});
