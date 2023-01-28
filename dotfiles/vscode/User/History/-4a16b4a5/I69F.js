import axios from 'axios';

import { getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

import { getItem } from '../utils';
import mock from './getEventCatalog.mock';

const baseUrl = getBaseUrl(2);

/**
 * Get online ordering catalog for an event
 * @param {string} eventId
 * @returns Array of objects with catalog data
 */
const getEventCatalog = async ({ eventId, ooId }) => {
  await VALID.checkAll(
    ['eventId', eventId, VALID.EVENT_ID],
    ['ooId', ooId, VALID.OO_SUMMARY_ID],
  );
  try {
    const { data } = ENV.IS_MOCK
      ? mock({ eventId, ooId })
      : await axios.get(`${baseUrl}orders2/event_catalog/${eventId}/${ooId}`);
    const { categoryData: categories } = data;

    return categories.map((category) => ({
      ...category,
      subcategories: category.subCategories.map((subcategory) => ({
        ...subcategory,
        items: subcategory.items.map(getItem),
      })),
    }));
  } catch (error) {
    log('getEventCatalog', {
      data: { eventId, ooId },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default getEventCatalog;
