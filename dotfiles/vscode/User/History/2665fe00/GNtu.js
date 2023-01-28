import { useEffect, useState } from 'react';

import { ROUTE } from 'common/const';

/**
 * A hook to share with "Resume Order" & "Start Order".
 *
 * Responsible for:
 * - getting Booth Setup questions
 * - adding steps to the wizard
 * - determining entry route
 *
 * Returns entry route
 */

const getIsAnswered = ({ id, response }, defaultValue) => {
  const isDefault = response === defaultValue;
  const isAnswered = typeof id === 'string' && !isDefault; // id changes from number to string after updating

  return isAnswered;
};

const useEnterOrder = (steps) => {
  // console.log('!useEnterOrder', { steps });

  const [entry, setEntry] = useState();

  // set entry path
  useEffect(() => {
    // console.log({ steps });

    if (steps) {
      // first check if all questions have been answered
      const isAllAnswered = steps.every(
        (step) => getIsAnswered(step), // ignore default value for this check
      );

      if (isAllAnswered) {
        setEntry(ROUTE.CATALOG);
      } else {
        // find the next question
        const nextQuestion = steps.find(
          ({ templateId, defaultValue, ...step }) => {
            return !getIsAnswered(step, defaultValue); // allow user to change from default value
          },
        );

        setEntry(() => (nextQuestion ? nextQuestion.path : ROUTE.CATALOG));
      }
    }
  }, [steps]);

  return entry;
};

export default useEnterOrder;