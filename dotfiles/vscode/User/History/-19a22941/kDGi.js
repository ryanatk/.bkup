import { BOOTH_SETUP, ROUTE } from 'common/const';

const getStep = ({ steps, templateId, history }) => {
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

  const back = getPush(-1, ROUTE.DASHBOARD);
  const next = getPush(1, ROUTE.CATALOG);

  const buttonText =
    currentIndex === steps?.length - 1 ? 'Complete' : undefined;

  return { back, next, buttonText };
};

export default getStep;
