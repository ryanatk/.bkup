import axios from 'axios';

import { ENV, VALID } from 'common/const';
import { getBaseUrl, log } from 'common/utils';

import mock from './getEventPackages.mock';

const baseUrl = getBaseUrl(2);

/**
 * Get packages for an event
 * @param eventId - id for event
 * @param ooId - online ordering id
 * @returns package data
 */
const getEventPackages = async ({ eventId, ooId }) => {
  await VALID.checkAll(
    ['eventId', eventId, VALID.EVENT_ID],
    ['ooId', ooId, VALID.OO_SUMMARY_ID],
  );

  try {
    const { data } = ENV.IS_MOCK
      ? mock()
      : await axios.get(`${baseUrl}orders2/event_packages/${eventId}/${ooId}`);

    return data;
  } catch (error) {
    log('getEventPackages', {
      data: { eventId, ooId },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default getEventPackages;
