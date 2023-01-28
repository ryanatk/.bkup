import { merge } from 'lodash';

export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE: 'update',
};

export const isZero = (num) => num <= 0;

export const getIncrement = ({
  quantity,
  addIncrement,
  updateIncrement,
  max,
}) => {
  const newQuantity = quantity + updateIncrement;

  if (newQuantity > max) {
    return max;
  } else if (newQuantity < addIncrement) {
    return addIncrement;
  } else {
    return newQuantity;
  }
};

export const getDecrement = ({
  quantity,
  addIncrement,
  updateIncrement,
  min,
}) => {
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

export const INIT_STATE = {
  quantity: 0,
  min: 0,
  max: Infinity,
  addIncrement: 1,
  updateIncrement: 1,
};

export const init = (currentState) => {
  const state = merge({}, INIT_STATE, currentState);

  return {
    ...state,
    incrementTo: getIncrement(state),
    decrementTo: getDecrement(state),
  };
};

const reducer = (state, { type, payload }) => {
  // console.log({ state, type, payload });

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
