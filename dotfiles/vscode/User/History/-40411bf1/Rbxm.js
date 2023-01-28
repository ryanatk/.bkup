import { useMemo } from 'react';

import { useShop, useWizard } from 'app/context';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId) => {
  // console.log('!useAssessmentResponse', { templateId });

  const { ooSummaryId } = useShop();
  const { getNav } = useWizard();
  const { next, back, buttonText } = getNav(templateId);

  const { list, submit, isLoading, isSubmitting, error } = useBoothAssessment(
    ooSummaryId,
    {
      onSuccess: next,
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