import { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useShop, useWizard } from 'app/context';
import { BOOTH_SETUP, ROUTE } from 'common/const';
import { useBoothAssessment } from 'common/hooks';

const useAssessmentResponse = (templateId) => {
  const findStep = useCallback(
    (list) => list?.find((item) => item.templateId === templateId),
    [templateId],
  );
  const { steps } = useWizard();
  const step = useMemo(() => findStep(steps), [steps, findStep]);
  useEffect(() => console.log('!!!', { step }), [step]);

  // console.log('!useAssessmentResponse', { templateId, step, steps });

  const history = useHistory();
  const { ooSummaryId } = useShop();

  // changing steps

  const currentIndex = steps?.findIndex(
    ({ sortOrder }) => sortOrder === steps?.sortOrder,
  );
  const getTo = (increment, endRoute) => {
    const templateId = steps?.[currentIndex + increment]?.templateId;
    const to = templateId
      ? findStep(Object.values(BOOTH_SETUP)).path
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

  const { responses, submit, isLoading, isSubmitting, error } =
    useBoothAssessment(ooSummaryId, {
      onSuccess: next,
      onAnswerQuestions: (list) => list,
      questionType: 1,
    });

  const isWorking = useMemo(
    () => isSubmitting || isLoading,
    [isSubmitting, isLoading],
  );

  const response = useMemo(() => findStep(responses), [responses, findStep]);

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
