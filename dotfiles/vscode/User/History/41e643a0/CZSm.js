import { merge } from 'lodash';

export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE: 'update',
};

export const isZero = (num) => num <= 0;

const getIncrement = ({ quantity, addIncrement, updateIncrement, max }) => {
  console.log('!getIncrement', {
    quantity,
    addIncrement,
    updateIncrement,
    max,
  });
  const newQuantity = quantity + updateIncrement;

  if (newQuantity > max) {
    return max;
  } else if (newQuantity < addIncrement) {
    return addIncrement;
  } else {
    return newQuantity;
  }
};

const getDecrement = ({ quantity, addIncrement, updateIncrement, min }) => {
  console.log('!getDecrement', {
    quantity,
    addIncrement,
    updateIncrement,
    min,
  });
  const newQuantity = quantity - updateIncrement;

  if (isZero(newQuantity)) {
    return 0;
  } else if (newQuantity < min) {
    return min;
  } else if (newQuantity < addIncrement) {
    return quantity > addIncrement ? addIncrement : 0;
  } else {
    return newQuantity;
  }
};

const INIT_STATE = {
  quantity: 0,
  min: 0,
  max: Infinity,
  addIncrement: 1,
  updateIncrement: 1,
};

export const init = (currentState) => {
  console.log('###', { currentState });
  const state = merge({}, INIT_STATE, currentState);
  const wtf = {
    ...state,
    incrementTo: getIncrement(state),
    decrementTo: getDecrement(state),
  };

  console.log({ wtf });

  return wtf;
};

const reducer = (state, { type, payload }) => {
  console.log({ state, type, payload });

  switch (type) {
    case TYPE.UPDATE: {
      return {
        quantity: payload.quantity,
        incrementTo: getIncrement(payload),
        decrementTo: getDecrement(payload),
      };
    }

    // case TYPE.INCREMENT: {
    //   const newQuantity = quantity + payload.updateIncrement;

    //   if (newQuantity > payload.max) {
    //     return payload.max;
    //   } else if (newQuantity < payload.addIncrement) {
    //     return payload.addIncrement;
    //   } else {
    //     return newQuantity;
    //   }
    // }

    // case TYPE.DECREMENT: {
    //   const newQuantity = quantity - payload.updateIncrement;

    //   if (isZero(newQuantity)) {
    //     return 0;
    //   } else if (newQuantity < payload.min) {
    //     return payload.min;
    //   } else if (newQuantity < payload.addIncrement) {
    //     return quantity > payload.addIncrement ? payload.addIncrement : 0;
    //   } else {
    //     return newQuantity;
    //   }
    // }

    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;
