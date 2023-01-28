import { BOOTH_SETUP } from 'common/const';

const useStep = ({ steps, templateId, history, backTo, nextTo }) => {
  const currentIndex = steps?.findIndex(
    (step) => step.templateId === templateId,
  );

  const getPush = (increment, endRoute) => {
    const toId = steps?.[currentIndex + increment]?.templateId;
    const to = toId
      ? Object.values(BOOTH_SETUP).find(({ templateId }) => templateId === toId)
          .path
      : endRoute;

    return () => history.push(to);
  };

  const back = getPush(-1, backTo);
  const next = getPush(1, nextTo);

  const buttonText =
    currentIndex === steps?.length - 1 ? 'Complete' : undefined;

  return { back, next, buttonText };
};

export default useStep;
