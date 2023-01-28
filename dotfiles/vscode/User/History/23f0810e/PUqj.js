import { useEffect, useState } from 'react';
import { array } from 'prop-types';
import { Redirect, useParams } from 'react-router';
import { useMutation } from 'react-query';

import { useAuth, useShop } from 'app/context';
import { Content, Require } from 'common/components';
import { initializeOrder } from 'data/orders';
import useEnterOrder from '../useEnterOrder';

const StartOrder = ({ steps }) => {
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

  // get entry
  const entry = useEnterOrder(steps);

  return (
    <Require data={[eventId]}>
      {entry ? (
        <Redirect to={entry} />
      ) : (
        <Content error={error?.message} isLoading={!error} />
      )}
    </Require>
  );
};

StartOrder.propTypes = {
  step: array,
};

export default StartOrder;
