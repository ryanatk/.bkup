import { useMemo, useCallback, useState } from 'react';
import { array, shape } from 'prop-types';

import {
  SubmitButton,
  OptionButton,
  Content,
  UploadFloorPlan,
} from 'common/components';
import { useShop, useAuth } from 'app/context';
import { TEXT } from 'common/const';
import { answerQuestions } from 'common/utils';
import { useBoothAssessment } from 'common/hooks';

import styles from './BoothQuestions.module.css';

const Edit = ({
  buttonText,
  data: initialData = {},
  onContinue,
  isLoading,
}) => {
  const { customerId } = useAuth();
  const { ooSummaryId, eventId } = useShop();
  const [disabled, setDisabled] = useState(false);

  const data = useMemo(() => {
    setDisabled(false);

    return answerQuestions(initialData.questions, initialData.answers);
  }, [initialData, setDisabled]);

  const { submit: submitResponse, error } = useBoothAssessment({ ooSummaryId });

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
        (question.assessmentQ_ID === ELECTRICAL_ID && question.answer === 'Yes')
      );
    });

    return result;
  }, [data]);

  return (
    <Content isLoading={isLoading} error={error?.message}>
      <form onSubmit={handleSubmit}>
        <ol className={styles.list}>
          {data.map(
            ({ question, answer, id, assessmentQ_ID, options = [] }) => (
              <li key={assessmentQ_ID} className={styles.item}>
                <p className={styles.question}>{question}</p>

                {options?.map((value) => (
                  <OptionButton
                    key={`${id}-${value}`}
                    value={value}
                    selected={value === answer}
                    onClick={(response) => {
                      setDisabled(true);

                      if (!answer || answer !== response) {
                        submitResponse({ response, assessmentQ_ID, id });
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
    answers: array,
  }),
};

export default Edit;
