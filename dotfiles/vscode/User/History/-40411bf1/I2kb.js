import { useMemo } from 'react';
import { useHistory } from 'react-router';

import { useShop, useWizard } from 'app/context';
import { BOOTH_SETUP, ROUTE } from 'common/const';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId) => {
  const { steps, findStep } = useWizard();
  const step = useMemo(() => findStep(templateId), [findStep, templateId]);

  console.log('!useAssessmentResponse', { templateId, step, steps });

  const history = useHistory();
  const { ooSummaryId } = useShop();

  // changing steps
  const currentIndex = steps?.findIndex(
    ({ sortOrder }) => sortOrder === step?.sortOrder,
  );
  const getTo = (increment, endRoute) => {
    const templateId = steps?.[currentIndex + increment]?.templateId;
    const to = templateId
      ? Object.values(BOOTH_SETUP).find(
          (step) => step.templateId === templateId,
        ).path
      : endRoute;

    return to;
  };
  const backTo = getTo(-1, ROUTE.DASHBOARD);
  const next = () => {
    const to = getTo(1, ROUTE.CATALOG);

    history.push(to);
  };
  const buttonText =
    currentIndex === steps?.length - 1 ? 'Complete' : undefined;

  const { submit, isLoading, isSubmitting, error } = useBoothAssessment(
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

  return {
    ...step,
    submit,
    isSubmitting: isWorking,
    error,
    backTo,
    buttonText,
  };
};

export default useAssessmentResponse;
