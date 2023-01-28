import { any, func, object, string } from 'prop-types';
import { createContext, useContext, useState } from 'react';

const Wizard = createContext();

export const WizardProvider = ({
  backTo,
  nextTo,
  data: initData,
  defaults,
  children,
}) => {
  const [steps, setSteps] = useState();
  const loadSteps = (payload) => setSteps(payload);

  // changing steps
  const currentIndex = steps?.findIndex(
    ({ sortOrder }) => sortOrder === steps?.sortOrder,
  );
  console.log({ currentIndex });

  const getTo = (increment, endRoute) => {
    const templateId = steps?.[currentIndex + increment]?.templateId;
    const to = templateId
      ? findStep(Object.values(BOOTH_SETUP)).path
      : endRoute;

    return to;
  };
  const backTo = getTo(-1, ROUTE.DASHBOARD);
  const next = () => {
    console.log('!!!!!!!!!!!!!!!!!! next !!!!!!!!!!!!!!!!!!');
    const to = getTo(1);

    history.push(to);
  };
  const buttonText =
    currentIndex === steps?.length - 1 ? 'Complete' : undefined;

  return (
    <Wizard.Provider
      value={{
        complete,
        defaults,
        next,
        update,
        loadSteps,
        steps,
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
