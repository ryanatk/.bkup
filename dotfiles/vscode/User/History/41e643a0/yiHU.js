import { merge } from 'lodash';

export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE: 'update',
};

export const isZero = (num) => num <= 0;

export const getQuantity = ({
  quantity,
  addIncrement,
  updateIncrement,
  max,
  min,
}) => {
  const remainder = (quantity - addIncrement) % updateIncrement;

  if (isZero(quantity)) {
    return { quantity: 0 };
  } else if (quantity < min) {
    return { quantity: min, message: '' };
  } else if (quantity < addIncrement) {
    return {
      quantity: quantity > addIncrement ? addIncrement : 0,
      message: '',
    };
  } else if (quantity > max) {
    return { quantity: max, message: '' };
  } else if (remainder) {
    return { quantity: quantity - remainder + updateIncrement, message: '' };
  } else {
    return { quantity: quantity, message: '' };
  }
};

export const getIncrementTo = ({
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

export const getDecrementTo = ({
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
    incrementTo: getIncrementTo(state),
    decrementTo: getDecrementTo(state),
  };
};

const reducer = (state, { type, payload }) => {
  // console.log({ state, type, payload });

  const obj = { ...state, quantity: payload };
  const { quantity, message } = getQuantity(obj);

  switch (type) {
    case TYPE.UPDATE: {
      return {
        ...state,
        quantity,
        message,
        incrementTo: getIncrementTo(obj),
        decrementTo: getDecrementTo(obj),
      };
    }

    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;
