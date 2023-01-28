import { merge } from 'lodash';

import { ORDER, STEP } from '../const';

export const BUTTON = {
  CONTINUE: 'Continue',
  SAVE: 'Save',
};

const initialState = {
  [STEP.BOOTH_QUESTIONS]: [],
  [STEP.CONTACT]: {},
  [STEP.PAYMENT]: {},
  activeStep: STEP.BOOTH_QUESTIONS,
  completedSteps: [],
  isDone: false,
  buttonText: BUTTON.CONTINUE,
  error: {},
  // i don't think we use these
  // for placeOrder
  // [ORDER.PAYMENT]: {},
  // [ORDER.CART]: '',
  // [ORDER.CUSTOMER]: '',
  // [ORDER.MERCHANT]: '',
  // [ORDER.EVENT]: '',
  // [ORDER.IS_THIRD_PARTY]: false,
};

export const init = (data) => merge({}, initialState, data);

export const TYPE = {
  ACTIVATE: 'activate-step',
  COMPLETE: 'complete-step',
  UPDATE: 'update-data',
  LOAD_QUESTIONS: 'load-questions',
};

const getIsDone = (steps) =>
  steps.includes(STEP.CONTACT) && steps.includes(STEP.PAYMENT);

const reducer = (state, { type, payload }) => {
  const { completedSteps } = state;
  const { id } = payload;

  switch (type) {
    case TYPE.ACTIVATE:
      return {
        ...state,
        activeStep: id,
        completedSteps: completedSteps.filter((id) => !id),
        isDone: getIsDone(completedSteps.filter((id) => !id)),
        error: {},
      };

    case TYPE.COMPLETE:
      const updatedSteps = [...completedSteps, id];
      const isDone = getIsDone(updatedSteps);
      console.log({ updatedSteps, isDone });

      return {
        ...state,
        [id]: payload.value,
        activeStep: getIsDone(updatedSteps) ? undefined : payload.next,
        buttonText: getIsDone(updatedSteps) ? BUTTON.SAVE : state.buttonText,
        completedSteps: updatedSteps,
        isDone: getIsDone(updatedSteps),
      };

    case TYPE.UPDATE:
      return {
        ...state,
        [id]: payload.value,
      };

    case TYPE.LOAD_QUESTIONS:
      return {
        ...state,
        [STEP.BOOTH_QUESTIONS]: payload,
      };

    case TYPE.ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      throw new Error('Checkout reducer payload.type not recognized');
  }
};

export default reducer;
