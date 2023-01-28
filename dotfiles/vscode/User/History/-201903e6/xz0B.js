import getBoothSetup from './getBoothSetup';

import { getAssessment } from 'data/utils';
import { orderAssessmentResponseData } from 'data/mock-data';
import { BOOTH_SETUP } from 'common/const';

const assessmentResponseData = orderAssessmentResponseData.map(getAssessment);

const getResponse = (index, { maskOutput = (response) => response }) => {
  const { response } = assessmentResponseData[index];
  return maskOutput(response);
};

it('returns responses', () => {
  const expected = {
    number: getResponse(0, BOOTH_SETUP.NUMBER),
    type: getResponse(1, BOOTH_SETUP.TYPE),
    location: getResponse(2, BOOTH_SETUP.LOCATION),
    size: getResponse(3, BOOTH_SETUP.SIZE),
  };
  const result = getBoothSetup({ assessmentResponseData });

  expect(result).toEqual(expected);
});
