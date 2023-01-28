import { BOOTH_SETUP } from 'common/const';

const getBoothSetup = ({ assessmentResponseData }) => {
  // console.log('!useBoothSetup', { assessmentResponseData });

  const getResponse = ({ templateId, maskOutput = (response) => response }) => {
    const { response } =
      assessmentResponseData?.find((step) => step.templateId === templateId) ??
      {};

    return maskOutput(response);
  };

  return {
    location: getResponse(BOOTH_SETUP.LOCATION),
    number: getResponse(BOOTH_SETUP.NUMBER),
    size: getResponse(BOOTH_SETUP.SIZE),
    type: getResponse(BOOTH_SETUP.TYPE),
  };
};

export default getBoothSetup;
