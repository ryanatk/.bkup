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

const getIsAnswered = ({ id, answer }, defaultValue) => {
  const isDefault = answer === defaultValue;
  const isAnswered = typeof id === 'string' && !isDefault;
  return isAnswered;
};

const useEnterOrder = ({ ooSummaryId }) => {
  // console.log('!useEnterOrder', { ooSummaryId });

  const { loadSteps } = useWizard();
  const [entry, setEntry] = useState();

  const { list, isLoading, error } = useBoothAssessment(ooSummaryId, {
    questionType: 1,
  });

  useEffect(() => {
    if (list) {
      loadSteps(list);
    }
  }, [loadSteps, list]);

  // set entry path
  useEffect(() => {
    if (list) {
      // first check if all questions have been answered
      const isAllAnswered = list.every(
        (step) => getIsAnswered(step), // id changes from number to string after updating
      );

      if (isAllAnswered) {
        setEntry(ROUTE.CATALOG);
      } else {
        // find the next question
        const nextQuestion = list.find(({ templateId, ...step }) => {
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
  }, [list]);

  return { entry, error, isLoading };
};

export default useEnterOrder;
