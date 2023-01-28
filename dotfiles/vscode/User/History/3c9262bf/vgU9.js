import { date } from 'common/utils';
import { merge } from 'lodash';

export const TYPE = {
  LOAD_COMPLETED: 'load-completed-orders',
  LOAD_INCOMPLETE: 'load-incomplete-orders',
  COMPLETED_ERROR: 'error-loading-completed-orders',
  INCOMPLETE_ERROR: 'error-loading-incomplete-orders',
  RESET: 'reset-orders',
};

const INIT_VALUE = {
  isLoading: true,
  data: [],
  error: null,
};

export const INIT_STATE = {
  completed: INIT_VALUE,
  incomplete: INIT_VALUE,
  orders: INIT_VALUE,
};

export const init = () => merge({}, INIT_STATE);

// sort in reverse chronological order
// if same date, sort by reverse order id
const sortOrders = (orders) =>
  orders.sort((a, b) => date(b.date) - date(a.date) || b.id - a.id);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case TYPE.LOAD_COMPLETED:
      return {
        ...state,
        completed: {
          ...INIT_VALUE,
          isLoading: false,
          data: sortOrders(payload),
        },
        orders: {
          ...INIT_VALUE,
          isLoading: state.incomplete.isLoading, // check the other one
          data: sortOrders([...state.incomplete.data, ...payload]),
        },
      };

    case TYPE.LOAD_INCOMPLETE:
      return {
        ...state,
        incomplete: {
          ...INIT_VALUE,
          isLoading: false,
          data: sortOrders(payload),
        },
        orders: {
          ...INIT_VALUE,
          isLoading: state.completed.isLoading, // check the other one
          data: sortOrders([...state.completed.data, ...payload]),
        },
      };

    case TYPE.COMPLETED_ERROR:
      return {
        ...state,
        completed: {
          ...INIT_VALUE,
          isLoading: false,
          error: payload,
        },
        orders: {
          ...INIT_VALUE,
          isLoading: false,
          error: payload,
          data: state.incomplete.data,
        },
      };

    case TYPE.INCOMPLETE_ERROR:
      return {
        ...state,
        incomplete: {
          ...INIT_VALUE,
          isLoading: false,
          error: payload,
        },
        orders: {
          ...INIT_VALUE,
          isLoading: false,
          error: payload,
          data: state.completed.data,
        },
      };

    case TYPE.RESET:
      return INIT_STATE;

    default:
      throw Error('Mismatched type for useOrders dispatch');
  }
};

export default reducer;
