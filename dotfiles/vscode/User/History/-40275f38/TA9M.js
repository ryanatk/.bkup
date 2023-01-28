import { merge } from 'lodash';

import { STEP } from '../const';

export const BUTTON = {
  CONTINUE: 'Continue',
  SAVE: 'Save',
};

const initialState = {
  [STEP.BOOTH_QUESTIONS]: {
    questions: [],
    responses: [],
  },
  [STEP.CONTACT]: {},
  [STEP.PAYMENT]: {},
  activeStep: STEP.BOOTH_QUESTIONS,
  completedSteps: [],
  isDone: false,
  buttonText: BUTTON.CONTINUE,
  error: {},
};

export const init = (data) => merge({}, initialState, data);

export const TYPE = {
  ACTIVATE: 'activate-step',
  COMPLETE: 'complete-step',
  UPDATE: 'update-data',
  LOAD_QUESTIONS: 'load-questions',
  LOAD_RESPONSES: 'load-responses',
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
        completedSteps: completedSteps.filter((step) => step !== id),
        isDone: getIsDone(completedSteps.filter((step) => step !== id)),
        error: {},
      };

    case TYPE.COMPLETE:
      const updatedSteps = [...completedSteps, id];
      const isDone = getIsDone(updatedSteps);

      return {
        ...state,
        [id]: payload.value,
        activeStep: isDone ? undefined : payload.next,
        buttonText: isDone ? BUTTON.SAVE : state.buttonText,
        completedSteps: updatedSteps,
        isDone,
      };

    case TYPE.UPDATE:
      return {
        ...state,
        [id]: payload.value,
      };

    case TYPE.LOAD_QUESTIONS:
      return {
        ...state,
        [STEP.BOOTH_QUESTIONS]: {
          ...state[STEP.BOOTH_QUESTIONS],
          questions: payload,
        },
      };

    case TYPE.LOAD_RESPONSES:
      return {
        ...state,
        [STEP.BOOTH_QUESTIONS]: {
          ...state[STEP.BOOTH_QUESTIONS],
          responses: payload,
        },
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
