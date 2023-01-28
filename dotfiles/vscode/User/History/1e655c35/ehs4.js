import { useEffect, useState } from 'react';
import cx from 'classnames';

import { ROUTE } from 'common/const';
import { useCart, useOrders } from 'app/context';
import { Toast } from 'common/components';

import { Drawer, Header, Footer, ResponsiveNav } from '../components';
import ToggleCartButton from './ToggleCartButton';

import styles from './ShoppingPage.module.css';

const ShoppingPage = ({
  className,
  Cart,
  sidebarLabel,
  sidebar,
  sidebarClass,
  children,
}) => {
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

      <ResponsiveNav
        label={sidebarLabel}
        className={cx(styles.sidebar, sidebarClass)}
      >
        {sidebar}
      </ResponsiveNav>

      <main className={cx(className, styles.main)}>
        <div className={styles.content}>{children}</div>
      </main>

      <Footer className={styles.footer} />

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

ShoppingPage.defaultProps = {
  count: '?',
  useCart: () => ({}),
};

export default ShoppingPage;
