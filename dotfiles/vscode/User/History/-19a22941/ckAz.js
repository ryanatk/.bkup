import { BOOTH_SETUP, ROUTE } from 'common/const';

const BACK_TO = ROUTE.DASHBOARD;
const NEXT_TO = ROUTE.CATALOG;
const BUTTON_TEXT = 'Next';
const COMPLETE_TEXT = 'Complete';

const getNav = ({ list, i, history }) => {
  const getPush = (increment, endRoute) => {
    const toId = list?.[i + increment]?.templateId;
    const to = toId
      ? Object.values(BOOTH_SETUP).find(({ templateId }) => templateId === toId)
          .path
      : endRoute;

    return () => history.push(to);
  };

  const back = getPush(-1, BACK_TO);
  const next = getPush(1, NEXT_TO);

  const buttonText = i === list?.length - 1 ? COMPLETE_TEXT : BUTTON_TEXT;

  return { back, next, buttonText };
};

export default getNav;
