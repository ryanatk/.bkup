import { useMemo, useEffect, useState, useCallback } from 'react';
import cx from 'classnames';

import { useSetInterval } from 'common/hooks';
import { getSiteProps } from 'common/utils';
import { useOrders } from 'app/context';
import { Page } from 'common/site';
import { BACKGROUND, TEXT } from 'common/const';
import { Content, Alert, Button } from 'common/components';

import { OrdersList, NewOrderButton, SectionTitle } from '../components';

import styles from './OrderHistory.module.css';

const { HREF } = getSiteProps();

const OrderHistory = () => {
  const {
    refetch: refetchOrders,
    incomplete,
    completed,
    data,
    isLoading,
    error,
    STATUS,
  } = useOrders();

  // refresh our context, once
  const [isFresh, setIsFresh] = useState();
  useEffect(() => {
    if (!isFresh) {
      setIsFresh(true);

      refetchOrders();
    }
  }, [refetchOrders, isFresh, setIsFresh]);

  const {
    incompleteOrders = [],
    completedOrders = [],
    hasOrders,
  } = useMemo(
    () => ({
      incompleteOrders: incomplete.data,
      completedOrders: completed.data,
      hasOrders: data.length,
    }),
    [incomplete, completed, data],
  );

  const fetchIfPending = useCallback(() => {
    if (completedOrders.some((order) => order.isPending === true)) {
      refetchOrders(STATUS.COMPLETED);
    }
  }, [STATUS, refetchOrders, completedOrders]);

  useSetInterval(fetchIfPending, 10);

  return (
    <Page variant="account" title="My Orders">
      <h1 className={cx(TEXT.H4, styles.title)}>My Orders</h1>
      <div className={styles.title}>
        <Alert
          action={
            <Button
              className={styles.button}
              text
              color="inherit"
              href={HREF.LEGACY}
            >
              Log In
            </Button>
          }
        >
          <div className={styles.row}>
            Looking for orders and invoices from before March 27, 2022? Log into
            our legacy online ordering site to get access.
          </div>
        </Alert>
      </div>
      <Content isLoading={isLoading} error={error?.message}>
        {hasOrders ? (
          <>
            {incompleteOrders.length ? (
              <section className={styles.section}>
                <SectionTitle>In Progress</SectionTitle>
                <OrdersList orders={incompleteOrders} />
              </section>
            ) : null}

            {completedOrders.length ? (
              <section className={styles.section}>
                <SectionTitle>Purchased</SectionTitle>
                <OrdersList orders={completedOrders} />
              </section>
            ) : null}
          </>
        ) : (
          <div className={cx(BACKGROUND.GREY_100, styles.empty)}>
            <p className={styles.message}>Your orders will appear here.</p>

            <NewOrderButton />
          </div>
        )}
      </Content>
    </Page>
  );
};

export default OrderHistory;
