import { useQuery } from 'react-query';

import { getAssessmentQuestions } from 'data/events';

const useQuestionsData = (ooSummaryId, options = {}) => {
  // console.log('!useQuestionsData', { ooSummaryId, options });

  const { questionType, refetchOnMount = false } = options;

  // get booth setup questions
  const { data, refetch, isFetching, error } = useQuery(
    ['getAssessmentQuestions', { ooSummaryId, questionType }],
    () => getAssessmentQuestions({ ooSummaryId, questionType }),
    {
      enabled: Boolean(ooSummaryId),
      refetchOnMount,
    },
  );

  return {
    questions: data?.list,
    isFetching,
    refetch,
    error,
  };
};

export default useQuestionsData;
