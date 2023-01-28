import reducer, { init, TYPE, BUTTON } from './reducer';
import { ORDER, STEP } from '../const';

const STEPS = Object.values(STEP);

describe('on init', () => {
  const setup = (opt = {}) => init(opt);

  it('sets an active step', () => {
    const { activeStep } = setup();
    expect(activeStep).not.toBe(undefined);
  });

  it('sets isDone to false', () => {
    const { isDone } = setup();
    expect(isDone).toBe(false);
  });
});

describe('actions', () => {
  const STEP_ID = STEPS[0];
  const NEXT_STEP_ID = STEPS[1];
  const PAYLOAD_DEFAULTS = { id: STEP_ID, next: NEXT_STEP_ID };
  const action =
    (type) =>
    ({ state = {}, payload = {} } = {}) =>
      reducer(init(state), {
        type,
        payload: Object.assign(PAYLOAD_DEFAULTS, payload),
      });

  describe('ACTIVATE', () => {
    const type = TYPE.ACTIVATE;
    const setup = action(type);

    it('removes step from completed steps', () => {
      const state = { completedSteps: STEP_ID };
      const { completedSteps } = setup({ state });
      expect(completedSteps).not.toContain(STEP_ID);
    });

    it('sets step as active step', () => {
      const { activeStep } = setup();
      expect(activeStep).toBe(STEP_ID);
    });

    it('sets isDone to false', () => {
      const { isDone } = setup();
      expect(isDone).toBe(false);
    });
  });

  describe('COMPLETE', () => {
    const type = TYPE.COMPLETE;
    const setup = action(type);

    it('adds step to completed steps', () => {
      const { completedSteps } = setup();
      expect(completedSteps).toContain(STEP_ID);
    });

    describe('not all steps are completed', () => {
      it('sets active step to next step', () => {
        const { activeStep } = setup();
        expect(activeStep).toBe(NEXT_STEP_ID);
      });

      it('sets button text to continue', () => {
        const { buttonText } = setup();
        expect(buttonText).toBe(BUTTON.CONTINUE);
      });

      it('sets isDone to false', () => {
        const { isDone } = setup();
        expect(isDone).toBe(false);
      });
    });

    describe('once all steps are completed', () => {
      const completedSteps = STEPS;
      // completedSteps.filter((id) => STEP_ID !== id);
      const state = { completedSteps };

      it('sets active step to undefined', () => {
        const { activeStep } = setup({ state });
        expect(activeStep).toBe(undefined);
      });

      it('sets button text to save', () => {
        const { buttonText } = setup({ state });
        expect(buttonText).toBe(BUTTON.SAVE);
      });

      it('sets isDone to true', () => {
        const { isDone } = setup({ state });
        expect(isDone).toBe(true);
      });
    });
  });

  describe('UPDATE', () => {
    const type = TYPE.UPDATE;
    const setup = action(type);

    it('sets object to payload', () => {
      const ID = Object.values(ORDER)[0];
      const expected = { key: 'value' };
      const state = setup({
        payload: {
          id: ID,
          value: expected,
        },
      });
      expect(state[ID]).toEqual(expected);
    });
  });

  describe('default', () => {
    const type = 'not listed';
    const setup = action(type);

    it('throws an error when not choosing a proper type', () => {
      expect(() => setup()).toThrow();
    });
  });
});
