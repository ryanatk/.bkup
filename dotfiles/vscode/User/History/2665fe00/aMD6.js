import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { useOrders, useWizard } from 'app/context';
import { getAssessmentList } from 'data/events';
import { ROUTE } from 'common/const';

import { STEPS } from './const';
import { answerQuestions } from 'common/utils';

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
  STEPS.find((step) => step.templateId === templateId);

const getIsAnswered = ({ id, answer }, defaultValue) => {
  const isDefault = answer === defaultValue;
  const isAnswered = typeof id === 'string' && !isDefault;
  return isAnswered;
};

const useEnterOrder = ({ eventId, ooSummaryId }) => {
  // console.log('!useEnterOrder', { eventId, ooSummaryId });

  const { loadSteps, steps } = useWizard();
  const [entry, setEntry] = useState();

  const { findOrder, refetchIncomplete, incomplete } = useOrders();
  const assessmentResponseData = useMemo(() => {
    const data = findOrder(ooSummaryId)?.assessmentResponseData;

    console.log(findOrder(ooSummaryId));
    console.log({ data, isLoading: incomplete.isLoading, ooSummaryId });

    if (!data && !incomplete.isLoading && ooSummaryId) {
      console.log('refetch');
      // refetchIncomplete({ cancelRefetch: true });
      refetchIncomplete();
    }

    return data;
  }, [findOrder, ooSummaryId, refetchIncomplete, incomplete.isLoading]);

  // get booth setup questions
  const {
    data: questionsData = {},
    error,
    isLoading,
  } = useQuery(
    ['getAssessmentList', eventId],
    () => getAssessmentList({ eventId, questionType: 1 }),
    {
      enabled: Boolean(eventId),
      cacheTime: 0,
    },
  );

  // add questions list to wizard, as steps
  useEffect(() => {
    if (!steps) {
      if (questionsData.list && assessmentResponseData) {
        const mergedData = answerQuestions(
          questionsData.list,
          assessmentResponseData,
        );
        loadSteps(mergedData);
      }
    }
  }, [questionsData, loadSteps, steps, assessmentResponseData]);

  // set entry path
  useEffect(() => {
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
