import { useEffect, useMemo, useState } from 'react';

import { answerQuestions } from 'common/utils';

import useResponseData from './useResponseData';
import useQuestionsData from './useQuestionsData';
import useSubmitResponse from './useSubmitResponse';

const useBoothAssessment = (ooSummaryId, options = {}) => {
  // console.log('!useBoothAssessment', {
  //   ooSummaryId,
  //   onSuccess,
  //   questionType,
  //   refetchOnMount,
  // });

  const { onSuccess, questionType, refetchOnMount } = options;

  const {
    questions,
    isFetching: isFetchingQuestions,
    error: questionsError,
  } = useQuestionsData({ ooSummaryId, questionType, refetchOnMount });

  const {
    responses,
    isFetching: isFetchingResponses,
    refetch: refetchResponses,
    error: responsesError,
  } = useResponseData({ ooSummaryId });

  const {
    submit,
    isSubmitting,
    error: submitError,
  } = useSubmitResponse({ refetchResponses, onSuccess, ooSummaryId });

  const isReady = useMemo(
    () => isFetchingQuestions || isFetchingResponses || isSubmitting,
    [isFetchingQuestions, isFetchingResponses, isSubmitting],
  );

  const list = useMemo(
    // empty the list whenever we're not ready
    () => (isReady ? answerQuestions(questions, responses) : undefined),
    [questions, responses, isReady],
  );

  const error = useMemo(
    () => submitError ?? questionsError ?? responsesError,
    [questionsError, submitError, responsesError],
  );

  return {
    list,
    questions,
    responses,
    submit,
    isReady,
    error,
  };
};

export default useBoothAssessment;
