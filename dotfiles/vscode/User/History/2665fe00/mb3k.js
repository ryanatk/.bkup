import { useEffect, useState } from 'react';

import { ROUTE } from 'common/const';

// Helper to consistently see if we have a qualifying response
const getHasResponse = ({ id, response }, defaultValue) => {
  console.log('!useEnterOrder.getHasResponse', { id, response, defaultValue });

  const isDefault = response === defaultValue; // optionally, if response matches default value, we can consider it unanswered
  const hasResponse = typeof id === 'string' && !isDefault; // id changes from number to string after updating
  console.log({ isDefault, hasResponse });

  return hasResponse;
};

/**
 * A hook to share with "Resume Order" & "Start Order".
 *
 * Takes list of steps (with questions, responses, & config)
 * Returns entry route
 */

const useEnterOrder = (steps) => {
  // console.log('!useEnterOrder', { steps });

  const [entry, setEntry] = useState();

  // set entry path
  useEffect(() => {
    // console.log({ steps });

    if (steps) {
      console.log({ steps });
      // first check if all questions have been answered
      const isAllAnswered = steps.every(
        (step) => getHasResponse(step), // don't compare to default value
      );
      console.log({ isAllAnswered });

      if (isAllAnswered) {
        setEntry(ROUTE.CATALOG);
      } else {
        // find the next question
        const nextQuestion = steps.find(
          ({ templateId, defaultValue, ...step }) => {
            return !getHasResponse(step, defaultValue); // allow user to change from default value
          },
        );
        console.log({ nextQuestion });

        setEntry(() => (nextQuestion ? nextQuestion.path : ROUTE.CATALOG));
      }
    }
  }, [steps]);

  return entry;
};

export default useEnterOrder;
