import { BOOTH_SETUP, ROUTE } from 'common/const';
import { merge } from 'lodash';

const BACK_TO = ROUTE.DASHBOARD;
const NEXT_TO = ROUTE.CATALOG;

const BUTTON_TEXT = 'Next';
const COMPLETE_TEXT = 'Complete';

const getStep = ({ list, item, index, history }) => {
  const getConfig = ({ templateId }) =>
    Object.values(BOOTH_SETUP).find((step) => step.templateId === templateId);

  const { response: responseValue, ...question } = item;
  const { parseValues, maskInput, ...config } = getConfig(item);

  const response =
    typeof parseValues === 'function'
      ? parseValues(responseValue)
      : responseValue;

  const getPush = (increment, endRoute) => {
    const toId = list?.[index + increment];
    const to = toId ? getConfig(toId).path : endRoute;

    return () => history.push(to);
  };

  const buttonText = index === list?.length - 1 ? COMPLETE_TEXT : BUTTON_TEXT;

  const back = getPush(-1, BACK_TO);
  const next = getPush(1, NEXT_TO);

  const submit = (response) =>
    submit({
      onSuccess: next,
      question,
      response:
        typeof maskInput === 'function' ? maskInput(response) : response,
    });

  return merge({}, question, config, {
    response,
    submit,
    back,
    next,
    buttonText,
  });
};

export default getStep;
