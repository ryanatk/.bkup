import {
  getAssessmentList,
  getAssessmentQuestions,
  getEventAssessmentLocation,
} from 'data/events';
import { useQuery } from 'react-query';

const useQuestionsData = ({ eventId, ooSummaryId, questionType }) => {
  // get booth setup questions
  const { data, refetch, isFetching, error } = useQuery(
    ['getAssessmentList', { ooSummaryId, eventId, questionType }],
    () =>
      ooSummaryId
        ? getAssessmentQuestions({ ooSummaryId, questionType })
        : getAssessmentList({ eventId, questionType }),
    {
      enabled: Boolean(ooSummaryId) || Boolean(eventId),
      refetchOnMount: true,
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
