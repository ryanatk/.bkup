import axios from 'axios';

import { findItem, getBaseUrl, log } from 'common/utils';
import { ENV, VALID } from 'common/const';

import { getCart } from '../utils';
import mock from './addItemToCart.mock';

const baseUrl = getBaseUrl(2);

/**
 * Add an item to the cart (must not already be in the cart)
 * @param {object} cart - complete cart object
 * @param {object} item - complete item object
 * @returns {object} updated cart & suggested items
 */
const addItemToCart = async (cart, item) => {
  // console.log('$ addItemToCart', { cart, item });

  await VALID.checkAll(
    ['customerId', cart.customerId, VALID.CUSTOMER_ID],
    ['eventId', cart.eventId, VALID.EVENT_ID],
    ['ooSummaryId', cart.ooSummaryId, VALID.OO_SUMMARY_ID],
    ['priceListId', item.priceListId, VALID.PRICE_LIST_ID],
    ['id', item.id, VALID.NUM],
    ['quantity', item.quantity, VALID.NUM],
  );

  try {
    if (findItem(cart.items, item)) {
      return log({
        data: { cart, item: { id: item.id } },
        throw: true,
        type: 'validation',
        error: `You already added ${item.itemDescription} to the cart. Please call updateQuantity if you need to increase the quantity.`,
      });
    }

    const cartDetails = [
      {
        customerId: cart.customerId,
        eventId: cart.eventId,
        itemId: item.id,
        priceListId: item.priceListId,
        quantity: item.quantity,
        onlineOrderId: cart.ooSummaryId,
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
      : await axios.post(`${baseUrl}orders2/add_to_cart`, postData);

    const cartData = getCart(data.cartData);
    const itemData = findItem(cartData.items, item);

    return {
      // cart: cartData,
      item: {
        ...item,
        ...itemData,
      },
    };
  } catch (error) {
    log('addItemToCart', {
      data: { cart, item },
      error,
      throw: true,
      type: 'request',
    });
  }
};

export default addItemToCart;
