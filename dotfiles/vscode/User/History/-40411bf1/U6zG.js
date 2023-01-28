import { useCallback, useEffect, useMemo } from 'react';

import { useShop, useWizard } from 'app/context';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId) => {
  const { steps, next, buttonText } = useWizard();

  const findStep = useCallback(
    (list) => ,
    [templateId],
  );
  const step = useMemo(() => findStep(steps), [steps, findStep]);
  useEffect(() => console.log('!!!', { step }), [step]);

  // console.log('!useAssessmentResponse', { templateId, step, steps });

  const { ooSummaryId } = useShop();

  const { list, submit, isLoading, isSubmitting, error } =
    useBoothAssessment(ooSummaryId, {
      onSuccess: next,
      onAnswerQuestions: (list) => list,
      questionType: 1,
    });

  const isWorking = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading],
  );

  const response = useMemo(() => list?.find((res) => res.templateId === templateId), [list, templateId]);

  return {
    ...step,
    response,
    submit: ({ response }) => submit({ question: step, response }),
    isSubmitting: isWorking,
    error,
    buttonText,
  };
};

export default useAssessmentResponse;
