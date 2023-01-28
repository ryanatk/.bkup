import { useMemo } from 'react';
import { useHistory } from 'react-router';

import { useShop, useWizard } from 'app/context';
import { BOOTH_SETUP, ROUTE } from 'common/const';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId) => {
  const { steps, findStep } = useWizard();
  const step = useMemo(() => findStep(templateId), [findStep, templateId]);
  // console.log({ steps, step });

  // console.log('!useAssessmentResponse', { templateId, step, steps });

  const history = useHistory();
  const { ooSummaryId } = useShop();

  const { list, responses, submit, isLoading, isSubmitting, error } =
    useBoothAssessment(ooSummaryId, {
      onSuccess: () => next(),
      onAnswerQuestions: (list) => list,
      questionType: 1,
    });

  const isWorking = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading],
  );

  // changing steps
  const { backTo, next, buttonText } = useMemo(() => {
    console.log('*****************************************');
    console.log({ step });

    const currentIndex = list?.findIndex(
      ({ sortOrder }) => sortOrder === list?.sortOrder,
    );
    const getTo = (increment, endRoute) => {
      const templateId = list?.[currentIndex + increment]?.templateId;
      const to = templateId
        ? Object.values(BOOTH_SETUP).find(
            (step) => step.templateId === templateId,
          ).path
        : endRoute;

      return to;
    };

    return {
      backTo: getTo(-1, ROUTE.DASHBOARD),
      next: () => {
        const to = getTo(1, ROUTE.CATALOG);

        history.push(to);
      },
      buttonText: currentIndex === list?.length - 1 ? 'Complete' : undefined,
    };
  }, [list, history, step]);

  const response = useMemo(
    () => responses.find((step) => step.templateId === templateId),
    [responses, templateId],
  );

  return {
    ...step,
    response,
    submit: ({ response }) => submit({ question: step, response }),
    isSubmitting: isWorking,
    error,
    backTo,
    buttonText,
  };
};

export default useAssessmentResponse;
