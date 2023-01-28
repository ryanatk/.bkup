import { merge } from 'lodash';

import { useWizard } from 'app/context';

const withStep =
  (Step) =>
  ({ id, buttonText, ...props }) => {
    const { activeStep, defaults } = useWizard();

    // console.log('(withStep)', { id, buttonText, props, activeStep, defaults });

    // if using activeStep, check it
    if (activeStep && id !== activeStep) {
      return null;
    }

    return (
      <Step
        {...props}
        id={id}
        buttonText={merge({}, defaults.buttonText, buttonText)}
      />
    );
  };

export default withStep;
