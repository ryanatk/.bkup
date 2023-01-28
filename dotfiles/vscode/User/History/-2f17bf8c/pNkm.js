import { useEffect, useState } from 'react';

import { ConfirmationImage } from 'assets/images';
import { Button } from 'common/components';
import { ROUTE } from 'common/const';
import { Page } from 'common/site';
import { useOrders, useShop } from 'app/context';

import styles from './Confirmation.module.css';

const Confirmation = () => {
  const { refetch: refetchOrders } = useOrders();
  const shop = useShop();

  // Refetch Orders
  const [isFresh, setIsFresh] = useState();

  useEffect(() => {
    if (!isFresh) {
      setIsFresh(true);

      shop.reset();
      refetchOrders();
    }
  }, [refetchOrders, shop, isFresh, setIsFresh]);

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
