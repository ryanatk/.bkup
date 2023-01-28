import reducer, { TYPE, INIT_STATE, init } from './reducer';

describe('on init', () => {
  it('returns INIT_STATE props', () => {
    expect(init()).toEqual(INIT_STATE);
  });

  // const addSetup = (amount) => {
  //   const payload = {
  //     addIncrement: 2,
  //     updateIncrement: 1,
  //     max: 2,
  //     min: 0,
  //   };

  //   const quantity = amount;
  //   return { payload, quantity };
  // };

  // const subSetup = (amount) => {
  //   const payload = {
  //     updateIncrement: 1,
  //     max: 3,
  //     min: 2,
  //   };

  //   const quantity = amount;
  //   return { payload, quantity };
  // };

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
});
