import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { useMutation } from 'react-query';

import { Content } from 'common/components';
import { useAuth, useOrders, useShop } from 'app/context';
import { initializeOrder } from 'data/orders';

import useEnterOrder from '../useEnterOrder';

const StartOrder = () => {
  const { eventId } = useParams();
  const { customerId } = useAuth();
  const { isRefetching: isLoadingOrders } = useOrders();

  const shop = useShop();
  const [ooSummaryId, setOoSummaryId] = useState();

  // console.log('<StartOrder>', { eventId, customerId, shop, ooSummaryId });

  // initialize order
  const { mutate: init, error: initError } = useMutation(
    () => initializeOrder({ customerId, eventId, boothNum: shop.boothNumber }),
    { onSuccess: ({ orderId }) => setOoSummaryId(orderId) },
  );

  const { entry, error } = useEnterOrder({ eventId, ooSummaryId });

  useEffect(() => {
    if (!ooSummaryId) {
      // get a new order id
      init();
    } else if (ooSummaryId !== shop.ooSummaryId) {
      // update `shop`
      shop.reset({ eventId, ooSummaryId });
    }
  }, [eventId, ooSummaryId, shop, init]);

  if (entry) {
    return <Redirect to={entry} />;
  }

  return (
    <Content
      error={error?.message || initError?.message}
      isLoading={!error & !initError}
    />
  );
};

export default StartOrder;
