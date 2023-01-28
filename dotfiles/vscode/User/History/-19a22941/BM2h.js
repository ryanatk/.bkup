import { BOOTH_SETUP, ROUTE } from 'common/const';
import { merge } from 'lodash';

const BACK_TO = ROUTE.DASHBOARD;
const NEXT_TO = ROUTE.CATALOG;

const BUTTON_TEXT = 'Next';
const COMPLETE_TEXT = 'Complete';

const getStep = ({ list, item, index, history }) => {
  const getConfig = ({ templateId }) =>
    Object.values(BOOTH_SETUP).find((step) => step.templateId === templateId);

  const config = getConfig(item);

  const response =
    typeof config.parseValues === 'function'
      ? config.parseValues(item.response)
      : item.response;

  const getPush = (increment, endRoute) => {
    const toId = list?.[index + increment];
    const to = toId ? getConfig(toId).path : endRoute;

    return () => history.push(to);
  };

  const back = getPush(-1, BACK_TO);
  const next = getPush(1, NEXT_TO);

  const submit = (response) =>
    submit({
      onSuccess: next,
      question: item,
      response:
        typeof config.maskInput === 'function'
          ? config.maskInput(response)
          : response,
    });

  const buttonText = index === list?.length - 1 ? COMPLETE_TEXT : BUTTON_TEXT;

  return merge({}, item, config, { response, submit, back, next, buttonText });
};

export default getStep;
