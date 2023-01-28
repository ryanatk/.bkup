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
  completedSteps: new Set(),
  isDone: false,
  buttonText: BUTTON.CONTINUE,
  // for placeOrder
  [ORDER.PAYMENT]: {},
  [ORDER.CART]: '',
  [ORDER.CUSTOMER]: '',
  [ORDER.MERCHANT]: '',
  [ORDER.EVENT]: '',
  [ORDER.IS_THIRD_PARTY]: false,
};

export const init = (data) => merge({}, initialState, data);

export const TYPE = {
  ACTIVATE: 'activate-step',
  COMPLETE: 'complete-step',
  UPDATE: 'update-data',
  LOAD_QUESTIONS: 'load-questions',
};

const reducer = (state, { type, payload }) => {
  console.log({ type, payload, state });

  const { completedSteps } = state;
  const { id } = payload;
  const getIsDone = (steps) =>
    steps.has(STEP.CONTACT) && steps.has(STEP.PAYMENT);

  switch (type) {
    case TYPE.ACTIVATE:
      completedSteps.delete(id); // delete method mutates

      return {
        ...state,
        activeStep: id,
        completedSteps,
        isDone: getIsDone(completedSteps),
      };

    case TYPE.COMPLETE:
      const updatedSteps = completedSteps.add(id);
      console.log('NEXT!', payload.next);

      return {
        ...state,
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

    default:
      throw new Error('Checkout reducer payload.type not recognized');
  }
};

export default reducer;
