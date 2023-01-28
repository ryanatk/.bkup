import { useMemo } from 'react';
import { string } from 'prop-types';

import { Content, EventInfo as EventInfoComponent } from 'common/components';
import { useOrders, useShop } from 'app/context';
import { useEvent } from 'common/hooks';
import { getBoothSetup } from 'common/utils';

import styles from './EventInfo.module.css';

const EventInfo = ({ className }) => {
  const { ooSummaryId, eventId } = useShop();
  const { isLoading, data: event = {}, error } = useEvent(eventId);

  // console.log('<EventInfo>', { eventId, event, error });

  const { findOrder } = useOrders();
  const order = findOrder(ooSummaryId);
  const booth = useMemo(() => getBoothSetup(order), [order]);

  return (
    <Content error={error?.message} isLoading={isLoading}>
      <div className={styles.wrap}>
        <EventInfoComponent
          className={className}
          image={event.image}
          name={event.name}
          facilityName={event.facilityName}
          start={event.dateStart}
          end={event.dateEnd}
          advancedPricing={
            event.isEarlyPricing ? event.deadlineDate : undefined
          }
          order={order}
          booth={booth}
          id={eventId}
        />
      </div>
    </Content>
  );
};

EventInfo.propTypes = {
  className: string,
};

export default EventInfo;
