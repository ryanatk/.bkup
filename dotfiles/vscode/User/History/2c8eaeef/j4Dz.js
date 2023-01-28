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
  return questions.map((item) => {
    const responseData = answers.find(
      ({ templateId }) => templateId === item.templateId,
    );

    const config = Object.values(BOOTH_SETUP).find(
      ({ templateId }) => templateId === item.templateId,
    );

    const mergedData = merge({}, item, responseData, config);

    const filteredSteps = mergedData.filter((step) => {
      return typeof step.show === 'function' ? step.show(step) : true;
    });

    return filteredSteps;
  });
};

export default answerQuestions;
