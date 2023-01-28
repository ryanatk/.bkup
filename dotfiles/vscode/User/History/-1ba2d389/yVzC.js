import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useOrders, useShop, useWizard } from 'app/context';
import { ROUTE } from 'common/const';

import { answerQuestions } from 'common/utils';
import { STEPS } from '../const';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId, queryOptions = {}) => {
  const { steps, loadSteps, findStep } = useWizard();
  const step = useMemo(() => findStep(templateId), [findStep, templateId]);

  // console.log('!useAssessmentResponse', { templateId, step, steps });

  const history = useHistory();
  const { ooSummaryId } = useShop();
  const {
    findOrder,
    incomplete: { data: orders },
    isLoading,
    refetch: refetchOrders,
    isRefetching,
    STATUS,
  } = useOrders();
  const { list, questions, responses, submit, isSubmitting, error } =
    useBoothAssessment({
      ooSummaryId,
      eventId,
      onSuccess: () => next(),
      questionType: 1,
    });

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

  // submit step
  const submitOptions = {
    ...queryOptions,
    onSuccess: async (data) => {
      if (typeof queryOptions.onSuccess === 'function') {
        queryOptions.onSuccess(data);
      }

      // reload answers
      refetchOrders(STATUS.INCOMPLETE);

      next();
    },
  };

  const isWorking = useMemo(
    () => isSubmitting || isLoading || isRefetching,
    [isSubmitting, isLoading, isRefetching],
  );

  useEffect(() => {
    // TODO: this works, but I worry about race conditions & re-renders
    if (!isWorking && orders) {
      const answers = findOrder(ooSummaryId, orders)?.assessmentResponseData;

      if (
        !answers.every(({ id, answer }) =>
          steps.find((step) => id === step.id && answer === step.answer),
        )
      ) {
        const mergedData = answerQuestions(steps, answers);
        loadSteps(mergedData);
      }
    }
  }, [orders, findOrder, loadSteps, ooSummaryId, steps, step, isWorking]);

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
