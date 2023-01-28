const getAssessment = ({ responseSelections, ...data }) => {
  const options = Array.isArray(responseSelections)
    ? responseSelections.map(({ text }) => text)
    : responseSelections;

  return {
    response: data.response,
    assessmentQ_ID: data.assessmentQ_ID,
    id: data.id,
    options,
    question: data.question,
    required:
      typeof data.isResponseOptional === 'boolean'
        ? !data.isResponseOptional
        : undefined,
    sortOrder: data.sortOrder,
    templateId: data.templateTypeID,
  };
};

export default getAssessment;
