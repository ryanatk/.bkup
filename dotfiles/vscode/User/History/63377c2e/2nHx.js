import { merge } from 'lodash';
import reducer, {
  TYPE,
  INIT_STATE,
  init,
  getIncrement,
  getDecrement,
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
    expect(value[key]).toBe(getIncrement(value));
  });

  it('sets decrementTo', () => {
    const key = 'decrementTo';
    expect(value).toHaveProperty(key);
    expect(value).toBeDefined();
    expect(value[key]).toBe(getDecrement(value));
  });
});

describe('helper functions', () => {
  const helper =
    (fn) =>
    (options = {}) =>
      fn(merge({}, INIT_STATE, options));

  describe('getIncrement', () => {
    const setup = helper(getIncrement);

    it('returns addIncrement on first add', () => {
      const addIncrement = 7;
      const result = setup({ addIncrement });

      expect(result).toBe(addIncrement);
    });

    it('returns quantity + updateIncrement once in cart', () => {
      const quantity = 5;
      const updateIncrement = 2;
      const result = setup({ quantity, updateIncrement });

      expect(result).toBe(quantity + updateIncrement);
    });
  });
});

// it('increment adds 1 to quantity when it is less than the max', () => {
//   const type = TYPE.INCREMENT;
//   const { payload, quantity } = addSetup(0);

//   expect(reducer(quantity, { type, payload })).toBe(2);
// });

// it('increment sets quantity to the max when incremented value is more than the max', () => {
//   const type = TYPE.INCREMENT;
//   const { payload, quantity } = addSetup(2);

//   expect(reducer(quantity, { type, payload })).toBe(2);
// });

// it('decrement subtracts 1 to quantity when it is greater than the min', () => {
//   const type = TYPE.DECREMENT;
//   const { payload, quantity } = subSetup(3);

//   expect(reducer(quantity, { type, payload })).toBe(2);
// });

// it('decrement returns 0 if decremented value is 0', () => {
//   const type = TYPE.DECREMENT;
//   const { payload, quantity } = subSetup(1);

//   expect(reducer(quantity, { type, payload })).toBe(0);
// });

// it('decrement sets quantity to the min when decremented value is less than the min', () => {
//   const type = TYPE.DECREMENT;
//   const { payload, quantity } = subSetup(2);

//   expect(reducer(quantity, { type, payload })).toBe(2);
// });

// it('invalid type throws an error', () => {
//   const type = 'INVALID';
//   const { payload, quantity } = subSetup(2);

//   expect(() => {
//     reducer(quantity, { type, payload });
//   }).toThrow();
// });
// });
