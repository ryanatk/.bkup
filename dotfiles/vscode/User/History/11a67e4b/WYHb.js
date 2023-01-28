import axios from 'axios';

import { getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';
import { getOrder } from 'data/utils';

import mock from './getIncompleteOrders.mock';

const baseUrl = getBaseUrl(2);

/**
 * Get a list of incomplete orders for a customer, event, and booth
 * @param {string} customerId
 * @returns Array with incomplete order data
 */
const getIncompleteOrders = async (customerId) => {
  await VALID.check(
    customerId,
    VALID.CUSTOMER_ID.required('customerId is required.'),
  );

  // return console.log('getIncompleteOrders');

  try {
    const { data } = ENV.IS_MOCK
      ? mock({ customerId })
      : await axios.get(`${baseUrl}orders2/incomplete_orders/${customerId}`);

    const { incompleteCartData: orders } = data;

    return orders.map((order) =>
      getOrder({
        ...order,
        id: order.ooSummaryID,
        items: order.cartDetails,
        totals: order.cartTotal,
        boothLocation: order.boothData?.location,
        boothNumber: order.boothData?.number,
        boothType: order.boothData?.type,
      }),
    );
  } catch (error) {
    log('getIncompleteOrders', {
      data: { customerId },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default getIncompleteOrders;
