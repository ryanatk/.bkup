import { createRef, useMemo } from 'react';
import { number, string } from 'prop-types';

import { TEXT, VALID } from 'common/const';
import { remoteSubmit } from 'common/utils';
import { Content, Form, Input, Require, Select } from 'common/components';

import Step from './Step';

import styles from './Number.module.css';

const Number = ({ step }) => {
  console.log('<Number>', { step });

  const {
    defaultValue,
    response,
    options,
    question,
    required,
    submit,
    error,
    isSubmitting,
    back,
    buttonText,
  } = step;

  const form = createRef();
  const { Control, ...controlProps } = useMemo(
    () => (options?.length ? { Control: Select, options } : { Control: Input }),
    [options],
  );

  return (
    <Require data={[question]}>
      <div></div>
      <Content isLoading={isSubmitting} error={error?.message}>
        <Step
          submit={() => remoteSubmit(form.current)}
          back={back}
          buttonText={{ submit: buttonText }}
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
              submit({ response: data.number || defaultValue });
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
  defaultValue: string,
  templateId: number,
};

export default Number;
