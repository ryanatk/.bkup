import { useEffect, useMemo } from 'react';

// TODO: move this in from common
import { answerQuestions } from 'common/utils';

import useResponseData from './useResponseData';
import useQuestionsData from './useQuestionsData';
import useSubmitResponse from './useSubmitResponse';

const useBoothAssessment = ({ ooSummaryId, eventId, onSuccess, onLoad }) => {
  // console.log('!useBoothAssessment', { templateId, step, steps });

  const {
    responses,
    isLoading: isLoadingResponses,
    refetch: refetchResponses,
    error: responsesError,
  } = useResponseData({ ooSummaryId });

  const {
    questions,
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = useQuestionsData({ eventId, ooSummaryId });

  const {
    submit,
    isSubmitting,
    error: submitError,
  } = useSubmitResponse({ refetchResponses, onSuccess, ooSummaryId });

  const isWorking = useMemo(
    () => isSubmitting || isLoadingQuestions || isLoadingResponses,
    [isSubmitting, isLoadingQuestions, isLoadingResponses],
  );

  const error = useMemo(
    () => submitError ?? questionsError ?? responsesError,
    [questionsError, submitError, responsesError],
  );

  useEffect(() => {
    if (!isWorking) {
      const mergedData = answerQuestions(questions, responses);

      if (typeof onLoad === 'function') {
        onLoad(mergedData);
      }
    }
  }, [ooSummaryId, isWorking, onLoad, questions, responses]);

  return {
    submit,
    isSubmitting: isWorking,
    error,
  };
};

export default useBoothAssessment;