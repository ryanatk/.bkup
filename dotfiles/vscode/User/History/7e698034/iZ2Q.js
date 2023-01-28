import { BOOTH_SETUP } from 'common/const';

const getBoothSetup = ({ assessmentResponseData }) => {
  // console.log('!useBoothSetup', { assessmentResponseData });

  const getAnswer = ({ templateId, maskOutput = (response) => response }) => {
    const { response } =
      assessmentResponseData?.find((step) => step.templateId === templateId) ??
      {};

    return maskOutput(response);
  };

  return {
    location: getAnswer(BOOTH_SETUP.LOCATION),
    number: getAnswer(BOOTH_SETUP.NUMBER),
    size: getAnswer(BOOTH_SETUP.SIZE),
    type: getAnswer(BOOTH_SETUP.TYPE),
  };
};

export default getBoothSetup;
