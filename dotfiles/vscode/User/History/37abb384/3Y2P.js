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
        ? getAssessmentQuestions({ ooSummaryId, questionType: 2 })
        : getAssessmentList({ eventId, questionType: 1 }),
    {
      enabled: Boolean(ooSummaryId) || Boolean(eventId),
      onSuccess: ({ list }) => {
        dispatch({
          type: TYPE.LOAD_QUESTIONS,
          payload: list,
        });
      },
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
