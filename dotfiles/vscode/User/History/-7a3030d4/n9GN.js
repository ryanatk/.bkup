import { createRef, useMemo, useState } from 'react';
import { number } from 'prop-types';

import { TEXT, VALID } from 'common/const';
import { Accordion, AccordionGroup } from 'common/components';
import { remoteSubmit } from 'common/utils';
import {
  Content,
  Form,
  Icon,
  Input,
  Require,
  Step,
  TextLink,
} from 'common/components';

import useAssessmentResponse from '../useAssessmentResponse';

import styles from './Size.module.css';

const LXW = 'length-x-width';
const AREA = 'area';
const UNSURE = 'unsure';

const Size = ({ templateId, maskInput, parseValues }) => {
  console.log('<Size>', { templateId });

  const {
    response,
    question,
    required,
    submit,
    error,
    isSubmitting,
    backTo,
    buttonText,
  } = useAssessmentResponse(templateId);
  console.log({
    response,
    question,
    required,
    submit,
    error,
    isSubmitting,
    backTo,
    buttonText,
  });

  const answerType = useMemo(
    () => (response ? (isNaN(response) ? LXW : AREA) : undefined),
    [response],
  );

  const defaultActive = useMemo(() => answerType ?? LXW, [answerType]);
  const [active, setActive] = useState(defaultActive);

  const ref = {
    [LXW]: createRef(),
    [AREA]: createRef(),
  };

  return (
    <Require data={[question]}>
      <Content isLoading={isSubmitting} error={error?.message}>
        <Step
          submit={() => {
            active === UNSURE
              ? submit({ response: '' })
              : remoteSubmit(ref[active].current);
          }}
          isSubmitting={isSubmitting}
          buttonText={{ submit: buttonText }}
          backTo={backTo}
        >
          <h1 className={styles.p}>{question}</h1>

          <AccordionGroup
            radios
            defaultActive={defaultActive}
            onChange={(id) => setActive(id)}
          >
            <Accordion id={LXW} summary="Enter length and width">
              <Form
                ref={ref[LXW]}
                defaultValues={parseValues(response)}
                onPass={({ length, width }) => {
                  submit({ response: maskInput(length, width) });
                }}
                validation={{
                  length: VALID.NUMBER.required('Length is required'),
                  width: VALID.NUMBER.required('Width is required'),
                }}
              >
                <div className={styles.measurements}>
                  <Input number name="length" suffix="ft" />

                  <div className={styles.x}>
                    <Icon name="close" />
                  </div>

                  <Input number name="width" suffix="ft" />
                </div>
              </Form>
            </Accordion>

            <Accordion id={AREA} summary="Enter square footage">
              <Form
                ref={ref[AREA]}
                defaultValues={parseValues(response)}
                onPass={({ area }) => {
                  submit({ response: area });
                }}
                validation={{
                  area: VALID.NUMBER.required('Area is required'),
                }}
              >
                <Input
                  number
                  name="area"
                  label="Square Footage"
                  suffix={
                    <>
                      ft<sup className={TEXT.OVERLINE}>2</sup>
                    </>
                  }
                />
              </Form>
            </Accordion>

            {!required && (
              <Accordion id={UNSURE} summary="Not Sure / Not Listed" />
            )}
          </AccordionGroup>

          <p className={styles.more}>
            <TextLink href="https://edlen.com/exhibitor-resources/?exhibitor=floor-plans">
              View Size Charts
            </TextLink>
          </p>
        </Step>
      </Content>
    </Require>
  );
};

Size.propTypes = {
  templateId: number,
};

export default Size;
