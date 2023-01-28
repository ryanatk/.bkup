import { useState } from 'react';
import { object } from 'prop-types';
import cx from 'classnames';

import { BOOTH_TYPE, TEXT } from 'common/const';
import { Content, OptionButton, Require } from 'common/components';

import ErrorMessage from '../ErrorMessage';
import Step from './Step';

import styles from './Type.module.css';

const Type = ({ step }) => {
  // console.log('<Type>', { step });

  const {
    response,
    options = [],
    question,
    required,
    submit,
    error,
    isSubmitting,
    back,
    buttonText,
  } = step ?? {};

  const [hasError, setHasError] = useState();
  const [selected, setSelected] = useState(response);

  return (
    <Require data={[question]}>
      <Content isLoading={isSubmitting} error={error?.message}>
        <Step
          submit={() => {
            if (required && !selected) {
              setHasError(true);
            } else {
              submit({ response: selected });
            }
          }}
          isSubmitting={isSubmitting}
          back={back}
          buttonText={buttonText}
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
  step: object,
};

export default Type;
