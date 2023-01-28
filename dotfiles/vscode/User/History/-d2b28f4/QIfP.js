import { useMemo, useCallback, useState } from 'react';
import { array, shape } from 'prop-types';
import cx from 'classnames';
import { useMutation } from 'react-query';

import {
  SubmitButton,
  OptionButton,
  Content,
  UploadFloorPlan,
} from 'common/components';
import { useShop, useAuth, useOrders } from 'app/context';

import withStep from './withStep';

import styles from './BoothQuestions.module.css';
import { TEXT } from 'common/const';
import {
  addCustomerAssessmentResponse,
  updateCustomerAssessmentResponse,
} from 'data/orders';
import { getAssessmentData } from 'common/utils';

const Display = ({ data: initialData }) => {
  const data = getAssessmentData(initialData.questions, initialData.responses);

  return (
    <ol className={styles.list}>
      {data.map(({ question, response, assessmentQ_ID }) => (
        <li key={assessmentQ_ID} className={styles.item}>
          <p>{question}</p>
          <p className={cx(TEXT.SUBTITLE)}>{response}</p>
        </li>
      ))}
    </ol>
  );
};

Display.propTypes = {
  data: shape({
    questions: array,
    responses: array,
  }),
};

const Edit = ({
  buttonText,
  data: initialData = {},
  onContinue,
  isLoading,
}) => {
  const { customerId } = useAuth();
  const { ooSummaryId: ooId, eventId } = useShop();
  const { refetch, STATUS } = useOrders();
  const [disabled, setDisabled] = useState(false);

  const data = useMemo(() => {
    setDisabled(false);

    return getAssessmentData(initialData.questions, initialData.responses);
  }, [initialData, setDisabled]);

  const { mutate: updateResponse, error: updateError } = useMutation(
    ({ response, assessmentQ_ID, id }) => {
      return updateCustomerAssessmentResponse({
        assessmentResponseData: { response, assessmentQ_ID, id },
        ooId,
        isOptional: true,
      });
    },
    { onSuccess: () => refetch(STATUS.INCOMPLETE) },
  );

  const { mutate: addResponse, error: addError } = useMutation(
    ({ response, assessmentQ_ID }) => {
      return addCustomerAssessmentResponse({
        assessmentResponseData: { response, assessmentQ_ID },
        ooId,
        isOptional: true,
      });
    },
    { onSuccess: () => refetch(STATUS.INCOMPLETE) },
  );

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      onContinue(initialData);
    },
    [initialData, onContinue],
  );

  // Determine showFileUpload
  const showFileUpload = useMemo(() => {
    const ELECTRICAL_ID = 5;
    const PLUMBING_ID = 9;

    const result = data.some((question) => {
      return (
        question.assessmentQ_ID === PLUMBING_ID ||
        (question.assessmentQ_ID === ELECTRICAL_ID &&
          question.response === 'Yes')
      );
    });

    return result;
  }, [data]);

  return (
    <Content
      isLoading={isLoading}
      error={addError?.message || updateError?.message}
    >
      <form onSubmit={handleSubmit}>
        <ol className={styles.list}>
          {data.map(
            ({ question, response, id, assessmentQ_ID, options = [] }) => (
              <li key={assessmentQ_ID} className={styles.item}>
                <p className={styles.question}>{question}</p>

                {options?.map((value) => (
                  <OptionButton
                    key={`${id}-${value}`}
                    value={value}
                    selected={value === response}
                    onClick={(responseValue) => {
                      setDisabled(true);

                      // If the response doesn't exist, then add
                      if (!response) {
                        addResponse({
                          response: responseValue,
                          assessmentQ_ID,
                        });
                      } else if (response !== responseValue) {
                        // Answer is different than selected so update
                        updateResponse({
                          response: responseValue,
                          assessmentQ_ID,
                          id,
                        });
                      } else {
                        setDisabled(false);
                      }
                    }}
                    disabled={disabled}
                    className={styles.option}
                  />
                ))}
              </li>
            ),
          )}
          {showFileUpload && (
            <li>
              <p className={TEXT.BODY_1}>
                If you have your floor plan upload it now. The floor plan must
                show locations of all services ordered. If you don't have it,
                you can upload it later in your account.
              </p>

              <UploadFloorPlan
                buttonText={'Upload'}
                ooId={ooId}
                customerId={customerId}
                eventId={eventId}
              >
                Upload
              </UploadFloorPlan>
            </li>
          )}
        </ol>

        <div className={styles.submit}>
          <SubmitButton type="submit">{buttonText}</SubmitButton>
        </div>
      </form>
    </Content>
  );
};

Edit.propTypes = {
  data: shape({
    questions: array,
    responses: array,
  }),
};

export default withStep(Display, Edit, 'Booth Work');
