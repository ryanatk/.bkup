import {
  addCustomerAssessmentResponse,
  updateCustomerAssessmentResponse,
} from 'data/orders';
import { useMutation } from 'react-query';

const useSubmitResponse = ({ refetchResponses, onSuccess }) => {
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
    error: submitError,
  } = useCallback(
    ({ question, answer }) => {
      const fn = typeof question.id === 'number' ? add : update; // id changes from number to string after updating

      fn({ question, answer });
    },
    [add, update],
  );
};

export default useSubmitResponse;
