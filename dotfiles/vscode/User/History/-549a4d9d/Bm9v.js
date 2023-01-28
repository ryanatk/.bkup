import { useEffect, useMemo, useState } from 'react';

import { answerQuestions } from 'common/utils';

import useResponseData from './useResponseData';
import useQuestionsData from './useQuestionsData';
import useSubmitResponse from './useSubmitResponse';

const useBoothAssessment = (
  ooSummaryId,
  { onSuccess, questionType, onAnswerQuestions, refetchOnMount },
) => {
  // console.log('!useBoothAssessment', {
  //   ooSummaryId,
  //   onSuccess,
  //   questionType,
  //   refetchOnMount,
  // });

  const {
    questions,
    isLoading: isLoadingQuestions,
    error: questionsError,
  } = useQuestionsData({ ooSummaryId, questionType, refetchOnMount });

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

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoadingQuestions && !isLoadingResponses) {
      setIsReady(true);
    }
  }, [isLoadingQuestions, isLoadingResponses]);

  const error = useMemo(
    () => submitError ?? questionsError ?? responsesError,
    [questionsError, submitError, responsesError],
  );

  const list = useMemo(
    () =>
      isReady && questions && responses
        ? answerQuestions(questions, responses)
        : undefined,
    [questions, responses, isReady],
  );

  return {
    list,
    questions,
    responses,
    submit,
    isLoading: isLoadingQuestions || isLoadingResponses,
    isSubmitting,
    error,
  };
};

export default useBoothAssessment;
