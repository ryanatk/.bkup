import { any, bool, func, string } from 'prop-types';

import { Button, SubmitButton } from 'common/components';

import styles from './Step.module.css';

const Step = ({ back, buttonText, id, isSubmitting, submit, children }) => {
  // console.log('<Step>', { buttonText, id, isSubmitting });

  return (
    <div id={'step' + id}>
      <div className={styles.back}>
        <Button onClick={back} startIcon="caret-left" text size="small">
          Back
        </Button>
      </div>

      <div className={styles.content}>{children}</div>

      <div className={styles.actions}>
        <SubmitButton isSubmitting={isSubmitting} onClick={submit}>
          {buttonText}
        </SubmitButton>
      </div>
    </div>
  );
};

Step.propTypes = {
  back: func,
  buttonText: string,
  id: string,
  isSubmitting: bool,
  submit: func,
  children: any,
};

export default Step;
