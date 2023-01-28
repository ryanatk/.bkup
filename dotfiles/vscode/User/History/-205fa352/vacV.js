import { merge } from 'lodash';

export const TYPE = {
  // actions for multi-page wizard that submits at each step
  LOAD: 'load',
  // actions for single-page wizard that submits all at the end
  BACK: 'go-back',
  NEXT: 'next-step',
  UPDATE: 'update-data',
};

const INIT_STATE = {
  activeStep: '',
  breadcrumbs: [],
  data: {},
};

export const init = (currentState) => merge({}, INIT_STATE, currentState);

const reducer = (state, { type, payload }) => {
  // console.log({ state, type, payload });

  switch (type) {
    case TYPE.UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          [state.activeStep]: payload,
        },
      };
    case TYPE.NEXT:
      return {
        ...state,
        activeStep: payload,
        breadcrumbs: [...state.breadcrumbs, state.activeStep],
      };
    case TYPE.BACK:
      return {
        ...state,
        activeStep: state.breadcrumbs.at(-1),
        breadcrumbs: state.breadcrumbs.slice(0, -1),
      };
    default:
      throw Error('Mismatched type for wizard dispatch');
  }
};

export default reducer;
