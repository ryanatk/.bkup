import cx from 'classnames';

import { useCustomer, useOrders, useShop } from 'app/context';
import { BACKGROUND, ROUTE, TEXT } from 'common/const';
import { Button, Content } from 'common/components';
import { Page } from 'common/site';

import {
  NewOrderButton,
  OrdersList,
  ResumeOrder,
  SectionTitle,
} from '../components';

import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { firstName: customerName } = useCustomer();
  const {
    incomplete: { isLoading, error, data: orders },
    refetch: refetchOrders,
    STATUS,
  } = useOrders();
  const { reset: resetShop } = useShop();

  // console.log('<Dashboard>', { customerName, orders });

  // refresh our context, once
  const [isFresh, setIsFresh] = useState();

  useEffect(() => {
    if (!isFresh) {
      setIsFresh(true);
      // asdf
      refetchOrders(STATUS.INCOMPLETE);
      resetShop();
    }
  }, [resetShop, refetchOrders, isFresh, setIsFresh, STATUS.INCOMPLETE]);

  return (
    <Page className={styles.page} title="Dashboard">
      <aside className={cx(TEXT.H4, styles.hello)}>
        Hello{customerName && `, ${customerName}`}
      </aside>

      <nav className={styles.nav}>
        <Button outlined to={ROUTE.ORDERS}>
          My Orders
        </Button>

        <Button outlined to={ROUTE.ACCOUNT}>
          My Account
        </Button>
      </nav>

      <Content error={error?.message} isLoading={isLoading}>
        {orders.length ? (
          <section>
            <SectionTitle>In Progress</SectionTitle>
            <OrdersList orders={orders} action={ResumeOrder} />

            <div className={styles.new}>
              <NewOrderButton />
            </div>
          </section>
        ) : (
          <div className={cx(BACKGROUND.GREY_50, styles.empty)}>
            <p className={styles.message}>
              Incomplete orders will appear here.
            </p>

            <NewOrderButton />
          </div>
        )}
      </Content>
    </Page>
  );
};

export default Dashboard;
