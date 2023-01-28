import { merge } from 'lodash';

import { BOOTH_SETUP } from 'common/const';

/**
 * Merges questions from an Assessment List
 * with answers from an Incomplete Order
 * and filters by the optional `show` config
 * @param {array} questions
 * @param {array} answers
 */
const answerQuestions = (questions, answers) => {
  console.log('!answerQuestions', { questions, answers });

  const list = questions.map((item) => {
    const responseData = answers.find(
      ({ templateId }) => templateId === item.templateId,
    );

    const config = Object.values(BOOTH_SETUP).find(
      ({ templateId }) => templateId === item.templateId,
    );

    return merge({}, item, responseData, config);
  });

  const filteredQuestions = list.filter((step) => {
    return typeof step.show === 'function' ? step.show(step) : true;
  });

  return filteredQuestions;
};

export default answerQuestions;