import {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useMemo,
} from 'react';
import { any, number, string } from 'prop-types';
import { useQuery } from 'react-query';

// import { getCompletedOrders, getIncompleteOrders } from 'data/ordering';
import { getCompletedOrders, getIncompleteOrders } from 'data/orders';

import { useAuth } from 'app/context/';
import reducer, { TYPE, INIT_STATE } from './reducer';
import { useShop } from '../shop';

const STATUS = {
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};

const Orders = createContext();

export const OrdersProvider = ({ children }) => {
  const { customerId } = useAuth();
  const [{ completed, incomplete, orders }, dispatch] = useReducer(
    reducer,
    INIT_STATE,
  );

  // helper to setup consistent callbacks, etc, for queries
  const setupQuery = ({ onSuccess, onError, ...rest }) => ({
    ...rest,
    onSuccess: (data) => dispatch({ type: onSuccess, payload: data }),
    onError: (error) => dispatch({ type: onError, payload: error }),
    enabled: Boolean(customerId),
  });

  const {
    refetch: refetchCompleted,
    isRefetching: isRefetchingCompleted,
    isFetching: isFetchingCompleted,
  } = useQuery(
    ['getCompletedOrders', customerId],
    () => getCompletedOrders(customerId),
    setupQuery({
      onSuccess: TYPE.LOAD_COMPLETED,
      onError: TYPE.COMPLETED_ERROR,
    }),
  );

  const {
    refetch: refetchIncomplete,
    isRefetching: isRefetchingIncomplete,
    isFetching: isFetchingIncomplete,
  } = useQuery(
    ['getIncompleteOrders', customerId],
    () => getIncompleteOrders(customerId),
    setupQuery({
      onSuccess: TYPE.LOAD_INCOMPLETE,
      onError: TYPE.INCOMPLETE_ERROR,
    }),
  );

  const findOrder = useCallback(
    (orderId, ordersList = orders.data) =>
      ordersList.find(({ id }) => [orderId, orderId + ''].includes(id)),
    [orders.data],
  );

  const { ooSummaryId } = useShop();
  const current = useMemo(
    () => findOrder(ooSummaryId),
    [ooSummaryId, findOrder],
  );

  const refetch = async (status) => {
    switch (status) {
      case STATUS.COMPLETED:
        return await refetchCompleted().data;
      case STATUS.INCOMPLETE:
        return await refetchIncomplete();
      default:
        refetchCompleted();
        refetchIncomplete();
    }
  };

  return (
    <Orders.Provider
      value={{
        ...orders, // return normal api
        completed,
        incomplete,
        findOrder,
        current,
        refetch,
        refetchCompleted,
        refetchIncomplete,
        isFetching: isFetchingCompleted || isFetchingIncomplete,
        // TODO: deprecate in favor of isFetching
        isRefetching: isRefetchingCompleted || isRefetchingIncomplete,
        // TODO: deprecate in favor of refetchCompleted & refetchIncomplete
        STATUS,
      }}
    >
      {children}
    </Orders.Provider>
  );
};

Orders.propTypes = {
  boothNumber: string,
  eventId: string,
  ooSummaryId: number,
  children: any,
};

export const useOrders = () => useContext(Orders);
