import { useState } from 'react';
import { number } from 'prop-types';
import cx from 'classnames';

import { BOOTH_TYPE, TEXT } from 'common/const';
import { Content, OptionButton, Require, Step } from 'common/components';

import ErrorMessage from '../ErrorMessage';
import useAssessmentResponse from './useAssessmentResponse';

import styles from './Type.module.css';

const Type = ({ templateId }) => {
  // console.log('<Type>', { templateId });

  const {
    answer,
    question,
    options = [],
    required,
    submit,
    error,
    isSubmitting,
    backTo,
    buttonText,
  } = useAssessmentResponse(templateId);

  const [hasError, setHasError] = useState();
  const [selected, setSelected] = useState(answer);

  return (
    <Require data={[question]}>
      <Content isLoading={isSubmitting} error={error?.message}>
        <Step
          submit={() => {
            if (required && !selected) {
              setHasError(true);
            } else {
              submit({ answer: selected });
            }
          }}
          isSubmitting={isSubmitting}
          backTo={backTo}
          buttonText={{ submit: buttonText }}
        >
          <h1 className={styles.p}>{question}</h1>

          <ul className={styles.types}>
            {Object.values(BOOTH_TYPE)
              // TODO: remove once we have all the types setup
              .filter(({ value }) => options.includes(value))
              .map(({ value, title, description, image }) => (
                <li key={value}>
                  <OptionButton
                    value={value}
                    selected={selected === value}
                    onClick={(value) => setSelected(value)}
                    className={styles.type}
                  >
                    <img src={image} alt={value} className={styles.icon} />
                    <div>
                      <h4 className={TEXT.SUBTITLE}>{title}</h4>
                      {description && (
                        <p className={cx(TEXT.REGULAR, TEXT.BODY_2)}>
                          {description}
                        </p>
                      )}
                    </div>
                  </OptionButton>
                </li>
              ))}
          </ul>

          <ErrorMessage isOpen={hasError} close={() => setHasError(false)}>
            Please select an option to continue.
          </ErrorMessage>
        </Step>
      </Content>
    </Require>
  );
};

Type.propTypes = {
  templateId: number,
};

export default Type;
