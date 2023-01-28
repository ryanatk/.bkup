import { merge } from 'lodash';

export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE: 'update',
};

export const isZero = (num) => num <= 0;

const getIncrement = ({ quantity, addIncrement, updateIncrement, max }) => {
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
        ...state,
        quantity: payload,
        incrementTo: getIncrement({ ...state, quantity: payload }),
        decrementTo: getDecrement({ ...state, quantity: payload }),
      };
    }

    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;
