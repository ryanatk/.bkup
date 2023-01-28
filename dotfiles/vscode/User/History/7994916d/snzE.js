import axios from 'axios';

import { ENV, VALID } from 'common/const';
import { getBaseUrl, log } from 'common/utils';
import { getItem } from 'data/utils';

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
    const { data: { packageData = [] } = {} } = ENV.IS_MOCK
      ? mock()
      : await axios.get(`${baseUrl}orders2/event_packages/${eventId}/${ooId}`);

    // const categories =

    return [
      {
        description: 'Power Packages',
        categories: category.subCategories.map((subcategory) => ({
          ...subcategory,
          items: subcategory.items.map(getItem),
        })),
      },
    ];
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
