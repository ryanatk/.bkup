import { merge } from 'lodash';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useMutation } from 'react-query';

import { useCustomer, useShop, useOrders } from 'app/context';
import { findItem } from 'common/utils';
import { addItemToCart, updateQuantity } from 'data/orders';

import reducer, { TYPE, init } from './reducer';

const Cart = createContext();

export const CartProvider = ({ children }) => {
  const { customerId } = useCustomer();
  const { ooSummaryId, eventId } = useShop();
  const { findOrder, refetch, STATUS } = useOrders();
  const [cart, dispatch] = useReducer(reducer, init(findOrder(ooSummaryId)));

  // update `cart` when `shop` updates
  useEffect(
    () =>
      dispatch({
        type: TYPE.NEW_CART,
        payload: { ooSummaryId, eventId },
      }),
    [ooSummaryId, eventId],
  );

  const cartCount = useMemo(
    () => cart.items.reduce((count, { quantity }) => count + quantity, 0),
    [cart.items],
  );

  const refreshCart = useCallback(() => {
    // stops all new requests from firing, until the cart is refreshed
    dispatch({
      type: TYPE.REFRESH,
    });

    const refetchOrders = async () => {
      const { data: refetchedOrders } = await refetch(STATUS.INCOMPLETE);
      const order = findOrder(ooSummaryId, refetchedOrders);

      // allows queued requests to start firing
      dispatch({
        type: TYPE.REFRESH_SETTLED,
        payload: { order },
      });
    };

    refetchOrders();
  }, [STATUS.INCOMPLETE, findOrder, ooSummaryId, refetch]);

  useEffect(() => {
    // don't refresh until all requests are complete
    if (
      cart.isTouched &&
      !Object.keys(cart.queue).length &&
      !cart.unsettled.length
    ) {
      refreshCart();
    }
  }, [cart.isTouched, cart.queue, cart.unsettled, refreshCart]);

  const { mutate: updateItem } = useMutation(
    ({ item, quantity }) => {
      // console.log('!updateItem', { item, quantity });

      dispatch({
        type: TYPE.UPDATE,
        payload: { item },
      });

      return Boolean(item?.cartId) // items already in the cart have a cartId
        ? updateQuantity({ ...cart, customerId }, item, quantity)
        : addItemToCart({ ...cart, customerId }, { ...item, quantity });
    },
    {
      onSuccess: ({ item }) => {
        // console.log('!updateItem.onSuccess', { item });

        dispatch({
          type: TYPE.UPDATE_SETTLED,
          payload: { item },
        });
      },

      onError: (error) => {
        dispatch({
          type: TYPE.UPDATE_ERROR,
          payload: { error: error.message, item: error.cause?.data?.item },
        });
      },
    },
  );

  // watch queue for changes, then update
  useEffect(() => {
    // console.log('cart.queue', cart.queue);

    // if cart is refreshing, bail
    if (cart.isRefreshing) {
      return;
    }

    const next = Object.values(cart.queue).find(
      (item) => !cart.unsettled.includes(item.id),
    );

    if (next) {
      // NOTE: the item in the queue could be from cart OR catalog,
      // so merge with the cartItem when updating to have all info.
      const item = merge({}, next, findItem(cart.items, next));

      updateItem({ item, quantity: next.quantity });
    }
  }, [cart.queue, cart.items, cart.unsettled, cart.isRefreshing, updateItem]);

  const updateCart = useCallback((item, quantity) => {
    // console.log('!updateCart', { item, quantity }, item?.id);

    dispatch({
      type: TYPE.QUEUE,
      payload: { item, quantity },
    });
  }, []);

  // Return
  return (
    <Cart.Provider
      value={{
        error: cart.error,
        count: cartCount,
        items: cart.items,
        totalsData: cart.totalsData,
        updateCart,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const useCart = () => useContext(Cart);
