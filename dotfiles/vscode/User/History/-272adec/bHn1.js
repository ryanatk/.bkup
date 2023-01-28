import { useEffect, useState } from 'react';
import { arrayOf, elementType, shape, string } from 'prop-types';

import { OrderCard, ViewDetails } from '..';

import styles from './OrdersList.module.css';

const OrdersList = ({ action = ViewDetails, orders = [] }) => {
  console.log('<OrdersList>', { action, orders });

  const [scrollTo, setScrollTo] = useState(window.scrollY);

  useEffect(() => {
    const onScroll = () => setScrollTo(window.scrollY);
    window.addEventListener('scroll', onScroll);

    return () => {
      console.log('unmount');
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ul>
      {orders.map(({ totals, ...order }) => (
        <li key={order.id} className={styles.order}>
          <OrderCard
            {...order}
            total={order?.orderTotal}
            action={action({
              order,
              text: true,
              size: 'medium',
              swap: 'caret-right',
            })}
          />
        </li>
      ))}
    </ul>
  );
};

OrdersList.propTypes = {
  action: elementType,
  orders: arrayOf(
    shape({
      id: string.isRequired,
    }),
  ),
};

export default OrdersList;
