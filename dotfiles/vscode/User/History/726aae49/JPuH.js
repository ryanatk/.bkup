import { any, string } from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router';

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
  const back = () => {
    const to = getTo(-1, backTo);
    history.push(to);
  };
  const next = () => {
    const to = getTo(1, nextTo);
    history.push(to);
  };
  const buttonText =
    currentIndex === steps?.length - 1 ? 'Complete' : undefined;

  return (
    <Wizard.Provider
      value={{
        back,
        next,
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
