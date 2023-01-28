import { useMemo } from 'react';

import { answerQuestions } from 'common/utils';

import useResponseData from './useResponseData';
import useQuestionsData from './useQuestionsData';
import useSubmitResponse from './useSubmitResponse';

const useBoothAssessment = (ooSummaryId, options = {}) => {
  // console.log('!useBoothAssessment', { ooSummaryId, options });

  const { questionType, refetchOnMount } = options;

  const {
    questions,
    isFetching: isFetchingQuestions,
    error: questionsError,
  } = useQuestionsData(ooSummaryId, { questionType, refetchOnMount });

  const {
    responses,
    isFetching: isFetchingResponses,
    refetch: refetchResponses,
    error: responsesError,
  } = useResponseData(ooSummaryId);

  const {
    submit,
    isSubmitting,
    error: submitError,
  } = useSubmitResponse(ooSummaryId, { refetchResponses });

  const list = useMemo(
    () =>
      questions && responses
        ? answerQuestions(questions, responses)
        : undefined,
    [questions, responses],
  );

  const error = useMemo(
    () => submitError ?? questionsError ?? responsesError,
    [questionsError, submitError, responsesError],
  );

  return {
    error,
    isLoading: isFetchingQuestions || isFetchingResponses,
    isSubmitting,
    list,
    questions,
    responses,
    submit,
  };
};

export default useBoothAssessment;
