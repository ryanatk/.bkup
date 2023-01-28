import getBoothSetup from './getBoothSetup';

import { getAssessment } from 'data/utils';
import { orderAssessmentResponseData } from 'data/mock-data';
import { BOOTH_SETUP } from 'common/const';

const assessmentResponseData = orderAssessmentResponseData.map(getAssessment);

const getAnswer = (index, { maskOutput = (answer) => answer }) => {
  const { answer } = assessmentResponseData[index];
  return maskOutput(answer);
};

it('returns answers', () => {
  const expected = {
    number: getAnswer(0, BOOTH_SETUP.NUMBER),
    type: getAnswer(1, BOOTH_SETUP.TYPE),
    location: getAnswer(2, BOOTH_SETUP.LOCATION),
    size: getAnswer(3, BOOTH_SETUP.SIZE),
  };
  const result = getBoothSetup({ assessmentResponseData });

  expect(result).toEqual(expected);
});
