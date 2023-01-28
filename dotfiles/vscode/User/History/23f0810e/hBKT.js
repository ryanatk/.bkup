import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { useMutation } from 'react-query';

import { Content } from 'common/components';
import { useAuth, useShop } from 'app/context';
import { initializeOrder } from 'data/orders';

import useEnterOrder from '../useEnterOrder';

const StartOrder = () => {
  const { eventId } = useParams();
  const { customerId } = useAuth();

  const shop = useShop();
  const [ooSummaryId, setOoSummaryId] = useState();

  // console.log('<StartOrder>', { eventId, customerId, shop, ooSummaryId });

  // initialize order
  const { mutate: init, error } = useMutation(
    () => initializeOrder({ customerId, eventId, boothNum: shop.boothNumber }),
    { onSuccess: ({ orderId }) => setOoSummaryId(orderId) },
  );

  useEffect(() => {
    if (!ooSummaryId) {
      // get a new order id
      init();
    } else if (ooSummaryId !== shop.ooSummaryId) {
      // update `shop`
      shop.reset({ eventId, ooSummaryId });
    }
  }, [eventId, ooSummaryId, shop, init]);

  const { entry } = useEnterOrder({ eventId, ooSummaryId });

  if (entry) {
    return <Redirect to={entry} />;
  }

  return <Content error={error?.message} isLoading={!error} />;
};

export default StartOrder;
