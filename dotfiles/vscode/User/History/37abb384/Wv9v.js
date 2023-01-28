import { useQuery } from 'react-query';

import { getAssessmentQuestions, getAssessmentList } from 'data/events';

// TODO: remove
import { useShop } from 'app/context';

const useQuestionsData = ({
  ooSummaryId,
  questionType = 0,
  refetchOnMount = false,
}) => {
  console.log('!useQuestionsData', {
    ooSummaryId,
    questionType,
    refetchOnMount,
  });

  // TODO: remove
  // const { eventId } = useShop();

  // get booth setup questions
  const { data, refetch, isFetching, error } = useQuery(
    ['getAssessmentQuestions', { ooSummaryId, questionType }],
    () => getAssessmentQuestions({ ooSummaryId, questionType }),
    // () => getAssessmentList({ eventId, questionType }),
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
