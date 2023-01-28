import { getAssessmentQuestions } from 'data/events';
import { useQuery } from 'react-query';

const useQuestionsData = ({
  ooSummaryId,
  questionType = 0,
  refetchOnMount = false,
}) => {
  // console.log('!useQuestionsData', {
  //   ooSummaryId,
  //   questionType,
  //   refetchOnMount,
  // });

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
    isLoading: isFetching,
    refetch,
    error,
  };
};

export default useQuestionsData;
