import axios from 'axios';

import { getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

import { getItem } from '../utils';
import mock from './getEventCatalog.mock';
import { sortBy } from 'lodash';

const baseUrl = getBaseUrl(2);

export const FILTER_LABEL = 'Power Packages';

/**
 * Get online ordering catalog for an event
 * @param {string} eventId
 * @returns Array of objects with catalog data
 */
const getEventCatalog = async ({ eventId, ooId, boothType, boothLocation }) => {
  await VALID.checkAll(
    ['eventId', eventId, VALID.EVENT_ID],
    ['ooId', ooId, VALID.OO_SUMMARY_ID],
  );
  try {
    const { data } = ENV.IS_MOCK
      ? mock({ eventId, ooId })
      : await axios.get(
          `${baseUrl}events/catalog/${eventId}/${ooId}/${boothType}/${boothLocation}`,
        );
    const { categoryData: categories } = data;

    const catalog = categories.map((category) => ({
      description: category.description,
      categories: category.subCategories.map((subcategory) => ({
        ...subcategory,
        items: subcategory.items.map(getItem),
      })),
    }));

    const packageData = {
      description: 'Power Packages',
      categories: catalog
        ?.map(({ description, categories }) => ({
          description,
          items: categories?.reduce(
            (list, { items }) => [
              ...list,
              ...items.filter(({ isPackage }) => isPackage),
            ],
            [],
          ),
        }))
        .filter((category) => category.items.length),
    };

    return {
      catalog,
      packageData,
    };
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
