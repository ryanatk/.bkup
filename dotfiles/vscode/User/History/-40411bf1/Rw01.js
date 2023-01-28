import { useCallback, useEffect, useMemo } from 'react';

import { useShop, useWizard } from 'app/context';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId) => {
  // console.log('!useAssessmentResponse', { templateId });

  const { ooSummaryId } = useShop();
  const { next, back, buttonText } = useWizard();

  const { list, submit, isLoading, isSubmitting, error } = useBoothAssessment(
    ooSummaryId,
    {
      onSuccess: next,
      onAnswerQuestions: (list) => list,
      questionType: 1,
    },
  );

  const isWorking = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading],
  );

  const step = useMemo(
    () => list?.find((res) => res.templateId === templateId),
    [list, templateId],
  );

  return {
    ...step,
    submit: ({ response }) => submit({ question: step, response }),
    isSubmitting: isWorking,
    error,
    back,
    buttonText,
  };
};

export default useAssessmentResponse;
