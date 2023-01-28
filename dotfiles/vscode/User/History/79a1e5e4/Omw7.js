import { useMemo } from 'react';
import { useHistory } from 'react-router';

import { useShop } from 'app/context';
import { useBoothAssessment } from 'common/hooks';
import getStep from '../steps/getStep';

const useWizard = ({ steps, templateId }) => {
  // console.log('!useWizard', { templateId });

  const history = useHistory();
  const { ooSummaryId } = useShop();
  const { next, back, buttonText } = getStep({ history, templateId, steps });

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
  console.log({ list, templateId, step });

  return {
    ...step,
    submit: ({ response }) => submit({ question: step, response }),
    isSubmitting: isWorking,
    error,
    back,
    buttonText,
  };
};

export default useWizard;
