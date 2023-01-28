import { useEffect, useMemo } from 'react';

// TODO: move this in from common
import { answerQuestions } from 'common/utils';

import useResponseData from './useResponseData';
import useQuestionsData from './useQuestionsData';
import useSubmitResponse from './useSubmitResponse';

const useBoothAssessment = ({
  ooSummaryId,
  eventId,
  onSuccess,
  questionType,
  refetchOnMount,
}) => {
  // console.log('!useBoothAssessment', { templateId, step, steps });

  const {
    questions,
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = useQuestionsData({ eventId, ooSummaryId, questionType, refetchOnMount });

  const {
    responses,
    isLoading: isLoadingResponses,
    refetch: refetchResponses,
    error: responsesError,
  } = useResponseData({ ooSummaryId });

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

  const list = useMemo(
    () => (isWorking ? undefined : answerQuestions(questions, responses)),
    [questions, responses, isWorking],
  );

  return {
    list,
    questions,
    responses,
    submit,
    isSubmitting: isWorking,
    error,
  };
};

export default useBoothAssessment;
