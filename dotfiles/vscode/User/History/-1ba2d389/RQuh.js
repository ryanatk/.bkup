import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useShop, useWizard } from 'app/context';
import { ROUTE } from 'common/const';

import { STEPS } from '../const';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId, queryOptions = {}) => {
  const { steps, loadSteps, findStep } = useWizard();
  const step = useMemo(() => findStep(templateId), [findStep, templateId]);

  // console.log('!useAssessmentResponse', { templateId, step, steps });

  const history = useHistory();
  const { ooSummaryId } = useShop();

  // changing steps
  const currentIndex = steps?.findIndex(
    ({ sortOrder }) => sortOrder === step?.sortOrder,
  );
  const getTo = (increment, endRoute) => {
    const templateId = steps?.[currentIndex + increment]?.templateId;
    const to = templateId
      ? STEPS.find((step) => step.templateId === templateId).path
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

  const { list, questions, responses, submit, isLoading, isSubmitting, error } =
    useBoothAssessment({
      ooSummaryId,
      onSuccess: next,
      questionType: 1,
    });

  const isWorking = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading],
  );

  useEffect(() => {
    // TODO: this works, but I worry about race conditions & re-renders
    if (!isWorking && responses && questions) {
      if (
        !responses.every(({ id, answer }) =>
          steps.find((step) => id === step.id && answer === step.answer),
        )
      ) {
        loadSteps(list);
      }
    }
  }, [isWorking, responses, questions, steps, step, loadSteps, list]);

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
