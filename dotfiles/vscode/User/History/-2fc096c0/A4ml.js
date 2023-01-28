import axios from 'axios';

import { getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

const baseUrl = getBaseUrl(2);

/**
 * Add a customer assessment response
 * @param {object} assessmentResponseData - object containing assessmentQ_Id and response
 */
const updateCustomerAssessmentResponse = async ({
  assessmentResponseData,
  ooId,
  isOptional,
}) => {
  console.log('$ updateCustomerAssessmentResponse', {
    assessmentResponseData,
    ooId,
    isOptional,
  });

  await VALID.checkAll(
    ['ooId', ooId, VALID.OO_SUMMARY_ID],
    ['assessmentQ_ID', assessmentResponseData.assessmentQ_ID, VALID.NUM],
    [
      'response',
      assessmentResponseData.response,
      VALID.STRING.defined(),
      isOptional,
    ],
  );

  try {
    if (!ENV.IS_MOCK) {
      await axios.post(
        `${baseUrl}orders2/update_customer_assessment_response`,
        {
          assessmentResponseData,
          ooId,
        },
      );
    }
  } catch (error) {
    log('updateCustomerAssessmentResponse', {
      data: { assessmentResponseData, ooId, isOptional },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default updateCustomerAssessmentResponse;
