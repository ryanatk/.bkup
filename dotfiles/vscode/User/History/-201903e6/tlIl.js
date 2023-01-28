import getBoothSetup from './getBoothSetup';

import { getAssessment } from 'data/utils';
import { orderAssessmentResponseData } from 'data/mock-data';
import { BOOTH_SETUP } from 'common/const';

const assessmentResponseData = orderAssessmentResponseData.map(getAssessment);

const getAnswer = ({ index, maskOutput = (answer) => answer }) => {
  const { answer } = assessmentResponseData[index];
  return maskOutput(answer);
};

it('returns answers', () => {
  const expected = {
    number: getAnswer(BOOTH_SETUP.NUMBER),
    type: getAnswer(BOOTH_SETUP.TYPE),
    location: getAnswer(BOOTH_SETUP.LOCATION),
    size: getAnswer(BOOTH_SETUP.SIZE),
  };
  const result = getBoothSetup({ assessmentResponseData });

  expect(result).toEqual(expected);
});
