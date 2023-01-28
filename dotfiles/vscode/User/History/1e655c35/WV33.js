import { useEffect, useState } from 'react';
import { any, bool, func, node } from 'prop-types';
import cx from 'classnames';

import { BORDER, ROUTE } from 'common/const';
import { useCart, useOrders } from 'app/context';
import { Content, Scrollbar, Toast } from 'common/components';

import { Drawer, Header, Footer, Sidebar } from '../components';
import ToggleCartButton from './ToggleCartButton';

import styles from './ShoppingPage.module.css';

const ShoppingPage = ({ Cart, eventInfo, filters, isLoading, children }) => {
  // console.log('<ShoppingPage>');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { error, count, isUpdating } = useCart();
  const { isRefetching } = useOrders();
  const [errorToast, setErrorToast] = useState(error);

  useEffect(() => {
    if (Boolean(error)) {
      setErrorToast(error);
    }
  }, [error]);

  return (
    <>
      <Header backTo={ROUTE.DASHBOARD}>
        <div className={styles.header}>
          <ToggleCartButton
            count={count}
            toggleCart={() => setIsCartOpen((isOpen) => !isOpen)}
            isLoading={isUpdating || isRefetching}
          />
        </div>
      </Header>

      <Content isLoading={isLoading}>
        <Sidebar
          label="Categories"
          className={cx(BORDER.GREY_100, styles.sidebar)}
        >
          <div className={styles.nav}>
            <div className={cx(BORDER.GREY_100, styles.event)}>{eventInfo}</div>

            <Scrollbar component="nav" className={styles.scrollbar}>
              {filters}
            </Scrollbar>
          </div>
        </Sidebar>

        <div className={cx(styles.content)} id="shopping-page">
          <main id="shopping-page" className={styles.main}>
            {children}
          </main>
          <Footer className={styles.footer} />
        </div>
      </Content>

      {/* Off-screen content */}
      <Drawer
        anchor="right"
        close={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
        open={() => setIsCartOpen(true)}
        title="My Cart"
      >
        <Cart />
      </Drawer>

      <Toast
        alert={'error'}
        anchor={{ vertical: 'top', horizontal: 'center' }}
        isOpen={Boolean(errorToast)}
        close={() => setErrorToast()}
      >
        {errorToast}
      </Toast>
    </>
  );
};

ShoppingPage.propTypes = {
  Cart: func,
  eventInfo: node,
  filters: node,
  isLoading: bool,
  chilren: any,
};

export default ShoppingPage;
