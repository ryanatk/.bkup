import { useCallback } from 'react';
import { useMutation } from 'react-query';

import {
  addCustomerAssessmentResponse,
  updateCustomerAssessmentResponse,
} from 'data/orders';

const useSubmitResponse = ({ refetchResponses, onSuccess, ooSummaryId }) => {
  console.log('!useSubmitResponse', { ooSummaryId });

  // submit step
  const submitOptions = {
    onSuccess: async (data) => {
      // reload answers
      refetchResponses();

      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    },
  };

  const add = useMutation(
    ({ question, response }) =>
      addCustomerAssessmentResponse({
        assessmentResponseData: {
          assessmentQ_ID: question.assessmentQ_ID,
          response,
        },
        ooId: ooSummaryId,
        isOptional: !question.required,
      }),
    submitOptions,
  );

  const update = useMutation(
    ({ question, response }) =>
      updateCustomerAssessmentResponse({
        assessmentResponseData: {
          assessmentQ_ID: question.assessmentQ_ID,
          response,
          id: question.id,
        },
        ooId: ooSummaryId,
        isOptional: !question.required,
      }),
    submitOptions,
  );

  const {
    mutate: submit,
    isLoading: isSubmitting,
    error,
  } = useCallback(
    ({ question, response, answer }) => {
      // id changes from number to string after updating
      const fn = typeof question.id === 'number' ? add : update;
      console.log({ fn });

      // TODO: update all usage to use "response"
      return fn({ question, response: answer ?? response });
    },
    [add, update],
  );
  console.log({ submit });

  return {
    submit,
    error,
    isSubmitting,
  };
};

export default useSubmitResponse;
