import getAssessment from './getAssessment';

import { getEventAssessmentList as list } from 'data/mock-data';

it('returns proper data structure from server data', () => {
  const result = list.map(getAssessment);
  const expected = list.map(({ responseSelections, ...data }) => {
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
  });

  expect(result).toEqual(expect.arrayContaining(expected));
});
