import { createRef } from 'react';
import { number, string } from 'prop-types';

import { TEXT, VALID } from 'common/const';
import { remoteSubmit } from 'common/utils';
import { Content, Form, Input, Require, Select, Step } from 'common/components';

import useAssessmentResponse from '../useAssessmentResponse';

import styles from './Number.module.css';

const Number = ({ templateId, defaultValue }) => {
  console.log('<Number>', { templateId, defaultValue });

  const {
    answer,
    options,
    question,
    required,
    submit,
    error,
    isSubmitting,
    backTo,
    buttonText,
  } = useAssessmentResponse(templateId);

  const form = createRef();
  const { Control, ...controlProps } = options?.length
    ? { Control: Select, options }
    : { Control: Input };

  return (
    <Require data={[question]}>
      <Content isLoading={isSubmitting} error={error?.message}>
        <Step
          submit={() => remoteSubmit(form.current)}
          backTo={backTo}
          buttonText={{ submit: buttonText }}
        >
          <h1 className={styles.p}>{question}</h1>

          {/* <p className={styles.p}>
        We may be able to provide exisiting booth information from previous
        exhibitors at the facility. If we cannot find it in our records, we will
        continue to ask questions.
      </p> */}

          <h4 className={TEXT.SUBTITLE}>For Third-Party Contractors</h4>
          <p className={styles.p}>
            You must enter a separate order for each booth. If one order is
            placed for multiple booths, a $25 charge
            <strong className={TEXT.BOLD}> per</strong> booth will be applied.
          </p>

          <Form
            ref={form}
            defaultValues={{
              number: answer === defaultValue ? undefined : answer,
            }}
            onPass={async (data) => {
              submit({ answer: data.number || defaultValue });
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
