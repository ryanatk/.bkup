import { getAssessmentList, getAssessmentQuestions } from 'data/events';
import { useQuery } from 'react-query';

const useQuestionsData = ({ eventId, ooSummaryId, questionType }) => {
  // get booth setup questions
  const { data, refetch, isFetching, error } = useQuery(
    ['getAssessmentList', { ooSummaryId, eventId, questionType }],
    () =>
      Boolean(ooSummaryId)
        ? getAssessmentQuestions({ ooSummaryId, questionType })
        : getAssessmentList({ eventId, questionType }),
    {
      enabled: Boolean(ooSummaryId) || Boolean(eventId),
      refetchOnMount: true,
    },
  );

  return {
    questions: data,
    isLoading: isFetching,
    refetch,
    error,
  };
};

export default useQuestionsData;
