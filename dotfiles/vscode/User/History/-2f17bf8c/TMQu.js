import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { ConfirmationImage } from 'assets/images';
import { Button } from 'common/components';
import { ROUTE } from 'common/const';
import { Page } from 'common/site';
import { useOrders, useShop } from 'app/context';

import styles from './Confirmation.module.css';
import { track } from 'common/utils';

const Confirmation = () => {
  const { id } = useParams();
  const { refetch: refetchOrders, findOrder } = useOrders();
  const order = useMemo(() => findOrder(id), [id, findOrder]);

  const { reset: resetShop } = useShop();

  // Refetch Orders
  const [isFresh, setIsFresh] = useState();

  useEffect(() => {
    if (!isFresh) {
      setIsFresh(true);

      refetchOrders();
      resetShop();
    }
  }, [refetchOrders, resetShop, isFresh, setIsFresh]);

  useEffect(() => {
    if (order) {
      track('purchase', {
        currency: 'USD',
        transaction_id: order.id,
        value: order.orderTotal,
        items: order.items.map(({ id, name }) => ({
          item_id: id,
          item_name: name,
        })),
      });
    }
  }, [order]);

  return (
    <Page variant="centered" className={styles.page} title="Order Confirmation">
      <div className={styles.image}>
        <img src={ConfirmationImage} alt="Confirmation" />
      </div>

      <p className={styles.body}>
        We emailed an order confirmation. If you did not receive it check your
        spam or junk folder. You can also download a copy of your confirmation
        from your account.
      </p>
      <p className={styles.body}>
        If we have questions we will contact you via email.
      </p>

      <Button fullWidth to={ROUTE.ORDERS}>
        View My Orders
      </Button>
    </Page>
  );
};

export default Confirmation;
