import { useEffect, useState } from 'react';

import { useWizard } from 'app/context';
import { BOOTH_SETUP, ROUTE } from 'common/const';
import { useBoothAssessment } from 'common/hooks';

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

const getStepConfig = (templateId) =>
  Object.values(BOOTH_SETUP).find((step) => step.templateId === templateId);

const getIsAnswered = ({ id, response }, defaultValue) => {
  const isDefault = response === defaultValue;
  const isAnswered = typeof id === 'string' && !isDefault;
  return isAnswered;
};

const useEnterOrder = ({ ooSummaryId, steps }) => {
  console.log('!useEnterOrder', { ooSummaryId });

  const [entry, setEntry] = useState();

  // set entry path
  useEffect(() => {
    console.log({ steps });

    if (steps) {
      // first check if all questions have been answered
      const isAllAnswered = steps.every(
        (step) => getIsAnswered(step), // id changes from number to string after updating
      );

      if (isAllAnswered) {
        setEntry(ROUTE.CATALOG);
      } else {
        // find the next question
        const nextQuestion = steps.find(({ templateId, ...step }) => {
          const { defaultValue } = getStepConfig(templateId);
          return !getIsAnswered(step, defaultValue); // allow user to change from default value
        });

        if (nextQuestion) {
          const { path } = getStepConfig(nextQuestion.templateId);
          setEntry(path);
        } else {
          setEntry(ROUTE.CATALOG);
        }
      }
    }
  }, [steps]);

  return { entry, error, isLoading };
};

export default useEnterOrder;
