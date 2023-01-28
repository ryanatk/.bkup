import { any, string } from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import { BOOTH_SETUP } from 'common/const';

const Wizard = createContext();

export const WizardProvider = ({
  backTo,
  nextTo,
  data: initData,
  children,
}) => {
  const history = useHistory();
  const [steps, setSteps] = useState();
  const loadSteps = (payload) => setSteps(payload);

  // changing steps
  const getNav = (templateId) => {
    const currentIndex = steps?.findIndex(
      (step) => step.templateId === templateId,
    );
    // const currentStep = steps?.[currentIndex];

    const getPush = (increment, endRoute) => {
      const toId = steps?.[currentIndex + increment]?.templateId;
      const to = toId
        ? Object.values(BOOTH_SETUP).find(
            ({ templateId }) => templateId === toId,
          ).path
        : endRoute;

      return () => history.push(to);
    };

    const back = getPush(-1, backTo);
    const next = getPush(1, nextTo);

    const buttonText =
      currentIndex === steps?.length - 1 ? 'Complete' : undefined;

    return { back, next, buttonText };
  };

  return (
    <Wizard.Provider
      value={{
        getNav,
        loadSteps,
        steps,
      }}
    >
      {children}
    </Wizard.Provider>
  );
};

WizardProvider.propTypes = {
  backTo: string,
  nextTo: string,
  children: any,
};

export const useWizard = () => useContext(Wizard);
