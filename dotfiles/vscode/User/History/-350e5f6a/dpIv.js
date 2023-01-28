import axios from 'axios';

import { findItem, getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

import { getCart } from '../utils';
import mock from './updateQuantity.mock';

const baseUrl = getBaseUrl(2);

/**
 * Update item quantity the cart (must already be in the cart)
 * @param {object} cart - complete cart object
 * @param {object} item - complete item object
 * @param {number} [quantity] - if undefined, the item will be removed
 * @returns {object} updated cart
 */
const updateQuantity = async (cart, item, quantity) => {
  // console.log('$ updateQuantity', { cart, item, quantity });

  await VALID.checkAll(
    ['customerId', cart.customerId, VALID.CUSTOMER_ID],
    ['eventId', cart.eventId, VALID.EVENT_ID],
    ['ooSummaryId', cart.ooSummaryId, VALID.OO_SUMMARY_ID],
    ['priceListId', item.priceListId, VALID.PRICE_LIST_ID],
    ['id', item.id, VALID.NUM],
    ['cartId', item.cartId, VALID.CART_ID],
    ['quantity', quantity, VALID.NUM],
  );

  try {
    if (!findItem(cart.items, item)) {
      log({
        data: { cart, item, quantity },
        throw: true,
        type: 'validation',
        error: `item with id === "${item.itemID}" not in cart.`,
      });
    }

    const cartDetails = [
      {
        customerId: cart.customerId,
        eventId: cart.eventId,
        itemId: item.id,
        priceListId: item.priceListId,
        quantity: quantity,
        onlineOrderId: cart.ooSummaryId,
        id: item.cartId,
      },
    ];

    const postData = {
      cartDetails,
      customerId: cart.customerId,
      eventId: cart.eventId,
      ooId: cart.ooSummaryId,
    };

    const { data } = ENV.IS_MOCK
      ? mock()
      : await axios.post(`${baseUrl}orders2/update_cart`, postData);

    const cartData = getCart(data.cartData);
    const itemData = findItem(cartData.items, item);

    return {
      // cart: cartData,
      item: itemData,
    };
  } catch (error) {
    log('updateQuantity', {
      data: { cart, item, quantity },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default updateQuantity;
