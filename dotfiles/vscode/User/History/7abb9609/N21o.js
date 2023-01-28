import axios from 'axios';

import { getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

import mock from './getEventCatalog.mock';

const baseUrl = getBaseUrl(2);

/**
 * Get online ordering catalog for an event
 * @param {string} eventId
 * @returns Array of objects with catalog data
 */
const getEventCatalogCategoryNames = async ({
  eventId,
  ooId,
  boothType = 'blank',
  boothLocation = 'blank',
}) => {
  await VALID.checkAll(
    ['eventId', eventId, VALID.EVENT_ID],
    ['ooId', ooId, VALID.OO_SUMMARY_ID],
  );

  try {
    const { data } = ENV.IS_MOCK
      ? mock({ eventId, ooId })
      : await axios.get(
          `${baseUrl}events/catalog_category_names/${eventId}/${ooId}/${boothType}/${boothLocation}`,
        );
    const { categoryNames } = data;

    return categoryNames;
  } catch (error) {
    log('getEventCatalog', {
      data: { eventId, ooId },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default getEventCatalogCategoryNames;
