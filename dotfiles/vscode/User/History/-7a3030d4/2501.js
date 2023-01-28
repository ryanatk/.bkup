import { createRef, useMemo, useState } from 'react';
import { object } from 'prop-types';

import { TEXT, VALID } from 'common/const';
import {
  Accordion,
  AccordionGroup,
  Content,
  Form,
  Icon,
  Input,
  Require,
  TextLink,
} from 'common/components';
import { remoteSubmit } from 'common/utils';

import Step from './Step';

import styles from './Size.module.css';

const LXW = 'length-x-width';
const AREA = 'area';
const UNSURE = 'unsure';

const Size = ({ step }) => {
  // console.log('<Size>', { step });

  const {
    response,
    question,
    required,
    submit,
    error,
    isLoading,
    isSubmitting,
    back,
    buttonText,
    maskInput,
  } = step ?? {};

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
      <Content isLoading={!step || isLoading} error={error?.message}>
        <Step
          {...step}
          submit={() => {
            active === UNSURE ? submit('') : remoteSubmit(ref[active].current);
          }}
          isSubmitting={isSubmitting}
          buttonText={buttonText}
          back={back}
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
                defaultValues={response}
                onPass={({ length, width }) => {
                  submit(maskInput(length, width));
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
                defaultValues={response}
                onPass={({ area }) => {
                  submit(area);
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
  step: object,
};

export default Size;
