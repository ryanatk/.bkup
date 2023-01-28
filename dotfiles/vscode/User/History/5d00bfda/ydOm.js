import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';

import {
  addCustomerAssessmentResponse,
  updateCustomerAssessmentResponse,
} from 'data/orders';

const useSubmitResponse = ({ refetchResponses, ooSummaryId }) => {
  // console.log('!useSubmitResponse', { ooSummaryId });

  // submit step
  const submitOptions = {
    onSuccess: async (data) => {
      // reload answers
      refetchResponses();
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

  const submit = useCallback(
    ({ question, response, onSuccess }) => {
      console.log('!useSubmitResponse.submit', { question, response });

      // id changes from number to string after updating
      const fn = typeof question.id === 'number' ? add : update;

      // TODO: update all usage to use "response"
      return fn({ question, response }).then((successData) =>
        console.log({ successData }),
      );
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
