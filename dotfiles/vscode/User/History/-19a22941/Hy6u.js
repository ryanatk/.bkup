import { BOOTH_SETUP, ROUTE } from 'common/const';
import { merge } from 'lodash';

const BACK_TO = ROUTE.DASHBOARD;
const NEXT_TO = ROUTE.CATALOG;

const BUTTON_TEXT = 'Next';
const COMPLETE_TEXT = 'Complete';

// Helper to get config (takes step object, from data)
const getConfig = ({ templateId }) =>
  Object.values(BOOTH_SETUP).find((step) => step.templateId === templateId);

/**
 * get the full step object, to pass to templates
 * @param {array} list - full list of all steps
 * @param {object} item - step item, from list
 * @param {number} index - array index of `item` in `list` (to find next/back)
 * @param {function} history - from useHistory()
 * @param {function} submit - callback to submit a new response
 */
const getStep = ({ list, item, index, history, submit: submitFn }) => {
  // console.log('! getStep', { list, item, index });

  const { response: responseValue, ...question } = item;
  console.log({ responseValue });
  const { parseValues, maskInput, ...config } = getConfig(question);

  // navigation
  const buttonText = index === list?.length - 1 ? COMPLETE_TEXT : BUTTON_TEXT;

  const getPush = (increment, endRoute) => {
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
  console.log({ response });

  // submit response callback
  const submit = (response) =>
    submitFn({
      onSuccess: next,
      question,
      response:
        typeof maskInput === 'function' ? maskInput(response) : response,
    });

  return merge(
    {},
    question, // original step/item object, from list
    config, // config from BOOTH_SETUP
    { buttonText, back, next }, // nav
    { response }, // original response
    { submit }, // callback to submit new response
  );
};

export default getStep;
