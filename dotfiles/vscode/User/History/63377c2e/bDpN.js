import { merge } from 'lodash';
import reducer, {
  TYPE,
  INIT_STATE,
  init,
  getIncrementTo,
  getDecrementTo,
} from './reducer';

describe('on init', () => {
  const value = init();

  it('returns INIT_STATE props', () => {
    expect(value).toEqual(expect.objectContaining(INIT_STATE));
  });

  it('sets incrementTo', () => {
    const key = 'incrementTo';
    expect(value).toHaveProperty(key);
    expect(value).toBeDefined();
    expect(value[key]).toBe(getIncrementTo(value));
  });

  it('sets decrementTo', () => {
    const key = 'decrementTo';
    expect(value).toHaveProperty(key);
    expect(value).toBeDefined();
    expect(value[key]).toBe(getDecrementTo(value));
  });
});

describe('helper functions', () => {
  const helper =
    (fn) =>
    (options = {}) =>
      fn(merge({}, INIT_STATE, options));

  describe('getIncrementTo', () => {
    const setup = helper(getIncrementTo);

    describe('first add', () => {
      it('returns addIncrement', () => {
        const addIncrement = 7;
        const result = setup({ addIncrement });

        expect(result).toBe(addIncrement);
      });
    });

    describe('update quantity', () => {
      const quantity = 5;
      const updateIncrement = 5;
      const max = 7;

      it('returns max when it hits the max', () => {
        const result = setup({ quantity, updateIncrement, max });

        expect(result).toBe(max);
      });

      it('returns quantity + updateIncrement', () => {
        const result = setup({ quantity, updateIncrement });

        expect(result).toBe(quantity + updateIncrement);
      });
    });
  });

  describe('getDecrementTo', () => {
    const setup = helper(getDecrementTo);
    const quantity = 15;
    const min = 12;
    const addIncrement = 13;
    const updateIncrement = 5;

    it('returns 0 when it hits 0', () => {
      const result = setup({ quantity: 1, updateIncrement });

      expect(result).toBe(0);
    });

    it('returns min when it hits min', () => {
      const result = setup({ quantity, updateIncrement, min });

      expect(result).toBe(min);
    });

    it('returns addIncrement when it hits the addIncrement', () => {
      const result = setup({ quantity, updateIncrement, addIncrement });

      expect(result).toBe(addIncrement);
    });

    it('returns quantity - updateIncrement', () => {
      const result = setup({ quantity, updateIncrement });

      expect(result).toBe(quantity - updateIncrement);
    });
  });
});

describe('UPDATE', () => {
  const setup = (quantity, options) =>
    reducer(init(options), { type: TYPE.UPDATE, payload: { quantity } });
  const QTY = 7;
  const updateIncrement = 3;

  it('returns quantity', () => {
    const { quantity } = setup(QTY);
    expect(quantity).toBe(QTY);
  });

  it('returns incrementTo', () => {
    const { incrementTo } = setup(QTY, { updateIncrement });
    expect(incrementTo).toBe(QTY + updateIncrement);
  });

  it('returns decrementTo', () => {
    const { decrementTo } = setup(QTY, { updateIncrement });
    expect(decrementTo).toBe(QTY - updateIncrement);
  });
});
