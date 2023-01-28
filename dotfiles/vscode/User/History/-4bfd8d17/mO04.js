import { useWizard } from 'app/context';

const withStep =
  (Step) =>
  ({ id, buttonText, ...props }) => {
    const { activeStep } = useWizard();

    // console.log('(withStep)', { id, buttonText, props, activeStep });

    // if using activeStep, check it
    if (activeStep && id !== activeStep) {
      return null;
    }

    return <Step {...props} id={id} buttonText={buttonText} />;
  };

export default withStep;
