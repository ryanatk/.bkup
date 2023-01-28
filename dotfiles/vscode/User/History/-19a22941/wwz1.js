import { BOOTH_SETUP, ROUTE } from 'common/const';
import { merge } from 'lodash';

const BACK_TO = ROUTE.DASHBOARD;
const NEXT_TO = ROUTE.CATALOG;

const BUTTON_TEXT = 'Next';
const COMPLETE_TEXT = 'Complete';

// Helper to get config (takes step object, from data)
const getConfig = ({ templateId }) =>
  Object.values(BOOTH_SETUP).find((step) => step.templateId === templateId);

const getStep = ({ list, item, index, history }) => {
  console.log('! getStep', { list, item, index });

  const { response: responseValue, ...question } = item;
  const { parseValues, maskInput, ...config } = getConfig(question);

  // navigation
  const buttonText = index === list?.length - 1 ? COMPLETE_TEXT : BUTTON_TEXT;

  const getPush = ([increment, endRoute]) => {
    const toStep = list?.[index + increment];
    const to = toStep ? getConfig(toStep).path : endRoute;

    return () => history.push(to);
  };

  const back = getPush(-1, BACK_TO);
  const next = getPush(1, NEXT_TO);

  // get (and parse) response
  const response =
    typeof parseValues === 'function'
      ? parseValues(responseValue)
      : responseValue;

  // submit response callback
  const submit = (response) =>
    submit({
      onSuccess: next,
      question,
      response:
        typeof maskInput === 'function' ? maskInput(response) : response,
    });

  return merge(
    {},
    question,
    config,
    { buttonText, back, next },
    { response, submit },
  );
};

export default getStep;
