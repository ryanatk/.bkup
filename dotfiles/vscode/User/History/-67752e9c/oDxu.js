import { createRef, useMemo } from 'react';
import { object } from 'prop-types';

import { TEXT, VALID } from 'common/const';
import { remoteSubmit } from 'common/utils';
import { Content, Form, Input, Require, Select } from 'common/components';

import Step from './Step';

import styles from './Number.module.css';

const Number = ({ step }) => {
  // console.log('<Number>', { step });

  const {
    defaultValue,
    response,
    options,
    question,
    required,
    submit,
    error,
    isLoading,
    isSubmitting,
    back,
    buttonText,
  } = step ?? {};

  const form = createRef();

  // If we get back a list of options, use a Select
  const { Control, ...controlProps } = useMemo(
    () => (options?.length ? { Control: Select, options } : { Control: Input }),
    [options],
  );

  return (
    <Require data={[question]}>
      <Content isLoading={!step || isLoading} error={error?.message}>
        <Step
          submit={() => remoteSubmit(form.current)}
          back={back}
          buttonText={buttonText}
          isSubmitting={isSubmitting}
        >
          <h1 className={styles.p}>{question}</h1>

          <h4 className={TEXT.SUBTITLE}>For Third-Party Contractors</h4>
          <p className={styles.p}>
            You must enter a separate order for each booth. If one order is
            placed for multiple booths, a $25 charge
            <strong className={TEXT.BOLD}> per</strong> booth will be applied.
          </p>

          <Form
            ref={form}
            defaultValues={{
              number: response === defaultValue ? undefined : response,
            }}
            onPass={async (data) => {
              submit(data.number || defaultValue);
            }}
            validation={{ number: VALID.STRING }}
          >
            <Control
              {...controlProps}
              name="number"
              label={'Booth Number' + (required ? '' : ' (optional)')}
            />
          </Form>
        </Step>
      </Content>
    </Require>
  );
};

Number.propTypes = {
  step: object,
};

export default Number;
