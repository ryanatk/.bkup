import { useEffect, useMemo, useState } from 'react';

import { answerQuestions } from 'common/utils';

import useResponseData from './useResponseData';
import useQuestionsData from './useQuestionsData';
import useSubmitResponse from './useSubmitResponse';

const useBoothAssessment = (
  ooSummaryId,
  { onSuccess, questionType, refetchOnMount },
) => {
  // console.log('!useBoothAssessment', {
  //   ooSummaryId,
  //   onSuccess,
  //   questionType,
  //   refetchOnMount,
  // });

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

  const isWorking = useMemo(
    () => isFetchingQuestions || isFetchingResponses || isSubmitting,
    [isFetchingQuestions, isFetchingResponses, isSubmitting],
  );

  const list = useMemo(
    // empty the list while loading/reloading
    () => (isWorking ? undefined : answerQuestions(questions, responses)),
    [questions, responses, isWorking],
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
    isWorking,
    error,
  };
};

export default useBoothAssessment;
