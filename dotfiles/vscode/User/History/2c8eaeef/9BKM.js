import { merge } from 'lodash';

import { STEPS } from './const';

/**
 * Merges questions from an Assessment List
 * with answers from an Incomplete Order
 * @param {array} questions
 * @param {array} answers
 */
const answerQuestions = (questions, answers) => {
  return questions.map((item) => {
    const responseData = answers.find(
      ({ templateId }) => templateId === item.templateId,
    );
    const config = STEPS.find(
      ({ templateId }) => templateId === item.templateId,
    );

    return merge({}, item, responseData, config);
  });
};

export default answerQuestions;
