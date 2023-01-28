import { useCallback } from 'react';
import { useMutation } from 'react-query';

import {
  addCustomerAssessmentResponse,
  updateCustomerAssessmentResponse,
} from 'data/orders';

const useSubmitResponse = (ooSummaryId, { refetchResponses }) => {
  // console.log('!useSubmitResponse', { ooSummaryId });

  // submit step
  const submitOptions = {
    onSuccess: () => refetchResponses(), // reload responses
  };

  const {
    mutateAsync: add,
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
    mutateAsync: update,
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

  const submit = useCallback(
    ({ question, response, onSuccess }) => {
      // console.log('!useSubmitResponse.submit', { question, response });

      // id changes from number to string after updating
      const fn = typeof question.id === 'number' ? add : update;

      return fn({ question, response }).then(() => {
        onSuccess({ question, response });
      });
    },
    [add, update],
  );

  return {
    submit,
    error: addError ?? updateError,
    isSubmitting: isAdding || isUpdating,
  };
};

export default useSubmitResponse;
