import { useCallback } from 'react';
import { useMutation } from 'react-query';

import {
  addCustomerAssessmentResponse,
  updateCustomerAssessmentResponse,
} from 'data/orders';

const useSubmitResponse = ({ refetchResponses, onSuccess, ooSummaryId }) => {
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
    ({ question, answer }) =>
      addCustomerAssessmentResponse({
        assessmentResponseData: {
          assessmentQ_ID: question.assessmentQ_ID,
          response: answer,
        },
        ooId: ooSummaryId,
        isOptional: !question.required,
      }),
    submitOptions,
  );

  const update = useMutation(
    ({ question, answer }) =>
      updateCustomerAssessmentResponse({
        assessmentResponseData: {
          assessmentQ_ID: question.assessmentQ_ID,
          response: answer,
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
    ({ question, answer }) => {
      // id changes from number to string after updating
      const fn = typeof question.id === 'number' ? add : update;

      return fn({ question, answer });
    },
    [add, update],
  );

  return {
    submit,
    error,
    isSubmitting,
  };
};

export default useSubmitResponse;
