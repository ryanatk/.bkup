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

  const {
    mutate: add,
    isAdding,
    addError,
  } = useMutation(
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

  const {
    mutate: update,
    isUpdating,
    updateError,
  } = useMutation(
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

  const submit = ({ question, response, answer }) => {
    console.log('!useSubmitResponse.submit', { question, response, answer });

    // id changes from number to string after updating
    const fn = typeof question.id === 'number' ? add : update;
    console.log({ fn });

    // TODO: update all usage to use "response"
    return fn({ question, response: answer ?? response });
  };

  return {
    submit,
    error: addError ?? updateError,
    isSubmitting: isAdding || isUpdating,
  };
};

export default useSubmitResponse;
