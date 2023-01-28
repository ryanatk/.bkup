import { any, bool, func, object, shape, string } from 'prop-types';
import { useHistory } from 'react-router';

import { Button, SubmitButton } from 'common/components';
import { useWizard } from 'app/context';

import withStep from './withStep';

import styles from './Step.module.css';

const Step = ({
  backTo,
  buttonText,
  cancel,
  id,
  submit,
  isSubmitting,
  children,
}) => {
  // console.log('<Step>', { buttonText, id, backTo });

  const history = useHistory();
  const { back } = useWizard();

  const handleCancel = () => {
    cancel();
  };

  const handleBack = backTo ? () => history.push(backTo) : back;

  return (
    <div id={'wizard-step' + id}>
      {/* back button */}
      {(back || backTo) && (
        <div className={styles.back}>
          <Button onClick={handleBack} startIcon="caret-left" text size="small">
            Back
          </Button>
        </div>
      )}

      {/* content */}
      <div className={styles.content}>{children}</div>

      <div className={styles.actions}>
        {/* submit button */}
        <SubmitButton isSubmitting={isSubmitting} onClick={submit}>
          {buttonText.submit}
        </SubmitButton>

        {/* optional cancel button */}
        {cancel && (
          <Button text onClick={handleCancel}>
            {buttonText.cancel}
          </Button>
        )}
      </div>
    </div>
  );
};

Step.propTypes = {
  backTo: string,
  buttonText: shape({
    cancel: string,
    submit: string,
  }),
  cancel: func,
  id: string,
  isSubmitting: bool,
  submit: func,
  validation: object,
  children: any,
};

export default withStep(Step);