import { BOOTH_SETUP, ROUTE } from 'common/const';

const BACK_TO = ROUTE.DASHBOARD;
const NEXT_TO = ROUTE.CATALOG;
const BUTTON_TEXT = 'Next';
const COMPLETE_TEXT = 'Complete';

const getStep = ({ item, list, index, history }) => {
  const getConfig = (templateId) =>
    Object.values(BOOTH_SETUP).find((step) => step.templateId === templateId);

  const config = getConfig(item.templateId);

  const getPush = (increment, endRoute) => {
    const toId = list?.[index + increment]?.templateId;
    const to = toId
      ? Object.values(BOOTH_SETUP).find(({ templateId }) => templateId === toId)
          .path
      : endRoute;

    return () => history.push(to);
  };

  const back = getPush(-1, BACK_TO);
  const next = getPush(1, NEXT_TO);

  const buttonText = index === list?.length - 1 ? COMPLETE_TEXT : BUTTON_TEXT;

  return { ...config, back, next, buttonText };
};

export default getStep;
