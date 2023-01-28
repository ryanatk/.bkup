import { merge } from 'lodash';

import { isZero } from 'common/utils';

export const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  UPDATE: 'update',
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

const reducer = (prevState, { type, payload: newState }) => {
  // console.log({ state, type, payload });

  const state = merge({}, prevState, newState);

  switch (type) {
    case TYPE.UPDATE: {
      return {
        ...state,
        incrementTo: getIncrementTo(state),
        decrementTo: getDecrementTo(state),
      };
    }

    default:
      throw new Error('Unrecognized `type` in QuantityButton reducer');
  }
};

export default reducer;