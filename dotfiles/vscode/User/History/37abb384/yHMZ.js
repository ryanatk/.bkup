import { getAssessmentList, getEventAssessmentLocation } from 'data/events';
import { useQuery } from 'react-query';

const useQuestionsData = ({ eventId, ooSummaryId, questionType }) => {
  // get booth setup questions
  const {
    data: questionsData = {},
    error: loadQuestionsError,
    isLoading: isLoadingQuestions,
  } = useQuery(
    ['getAssessmentList', eventId],
    () => getAssessmentList({ eventId, questionType: 1 }),
    {
      enabled: Boolean(eventId),
    },
  );

  // get booth locations by ooSummaryId
  const {
    data: location = [],
    isFetching: isLoadingLocations,
    error: locationError,
  } = useQuery(
    ['getEventAssessmentLocation', { eventId, ooSummaryId }],
    () => getEventAssessmentLocation({ eventId, ooId: ooSummaryId }),
    { refetchOnMount: true },
  );
};

export default useQuestionsData;
