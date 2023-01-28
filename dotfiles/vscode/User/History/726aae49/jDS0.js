import { any, func, object, string } from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

import reducer, { init, TYPE } from './reducer';

const Wizard = createContext();

export const WizardProvider = ({
  activeStep: initActiveStep,
  complete, // submission for single-page wizard
  data: initData,
  defaults,
  children,
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    init({
      data: initData,
      activeStep: initActiveStep,
    }),
  );
  const { activeStep, breadcrumbs, data, steps } = state;

  const back = breadcrumbs.length
    ? () => dispatch({ type: TYPE.BACK })
    : defaults.back;
  const next = (payload) => dispatch({ type: TYPE.NEXT, payload });
  const update = (payload) => dispatch({ type: TYPE.UPDATE, payload });

  const loadSteps = (payload) => dispatch({ type: TYPE.LOAD, payload });
  const findStep = (templateId) =>
    steps?.find((step) => step.templateId === templateId);

  return (
    <Wizard.Provider
      value={{
        activeStep,
        complete,
        data,
        defaults,
        back,
        next,
        update,
        loadSteps,
        steps,
        findStep,
      }}
    >
      {children}
    </Wizard.Provider>
  );
};

WizardProvider.propTypes = {
  activeStep: string,
  complete: func,
  data: object,
  defaults: object,
  children: any,
};

export const useWizard = () => useContext(Wizard);
