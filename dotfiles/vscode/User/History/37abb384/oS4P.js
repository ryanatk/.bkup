const useQuestionsData = () => {
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
};

export default useQuestionsData;
