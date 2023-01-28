import { array, shape } from 'prop-types';
import cx from 'classnames';

import { TEXT } from 'common/const';
import { getAssessmentData } from 'common/utils';

import styles from './BoothQuestions.module.css';

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

export default Display;
