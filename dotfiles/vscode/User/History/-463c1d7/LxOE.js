import axios from 'axios';
import { sortBy } from 'lodash';

import { ENV, VALID } from 'common/const';
import { getBaseUrl, log } from 'common/utils';
import { getAssessment } from 'data/utils';

import mock from './getAssessmentQuestions.mock';

const baseUrl = getBaseUrl(2);

/**
 * Get assessment data based on a given event and assessment question type
 * @param ooSummaryId - id for event
 * @param [questionType] - 0 = ALL 1 = Booth setup 2 = Booth work
 * @returns object with the event data
 */
const getAssessmentQuestions = async ({ ooSummaryId, questionType = 0 }) => {
  await VALID.checkAll(
    ['ooSummaryId', ooSummaryId, VALID.OO_SUMMARY_ID],
    ['questionType', questionType, VALID.NUM],
  );

  try {
    const {
      data: { assessmentData: data },
    } = ENV.IS_MOCK
      ? mock()
      : await axios.get(
          `${baseUrl}orders2/event_assessment_question_list/${ooSummaryId}/${questionType}`,
        );

    return {
      list: sortBy(
        data
          // .filter(({ isVisible }) => isVisible)  the back end currently does not set isVisible
          .map((item) => ({ ...item, assessmentQ_ID: item.id }))
          .map(getAssessment),
        ['sortOrder'],
      ),
    };
  } catch (error) {
    log('getAssessmentQuestions', {
      data: { ooSummaryId, questionType },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default getAssessmentQuestions;
