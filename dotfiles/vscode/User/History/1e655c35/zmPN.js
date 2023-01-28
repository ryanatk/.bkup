import { useEffect, useState } from 'react';
import cx from 'classnames';

import { ROUTE } from 'common/const';
import { useCart, useOrders } from 'app/context';
import { Scrollbar, Toast } from 'common/components';

import { Drawer, Header, Footer, HeaderSpacer } from '../components';
import ToggleCartButton from './ToggleCartButton';

import styles from './ShoppingPage.module.css';

const ShoppingPage = ({ className, Cart, children }) => {
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
    <div className={cx(styles.page)}>
      <HeaderSpacer />

      <Header backTo={ROUTE.DASHBOARD}>
        <div className={styles.header}>
          <ToggleCartButton
            count={count}
            toggleCart={() => {
              setIsCartOpen((isOpen) => !isOpen);
            }}
            isLoading={isUpdating || isRefetching}
          />
        </div>
      </Header>

      <Drawer
        anchor="right"
        close={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
        open={() => setIsCartOpen(true)}
        title="My Cart"
        hasResponsiveNav={true}
      >
        <Cart />
      </Drawer>

      <Scrollbar className={styles.content}>
        <main className={cx(className, styles.main)}>{children}</main>

        <Footer />
      </Scrollbar>

      <Toast
        alert={'error'}
        anchor={{ vertical: 'top', horizontal: 'center' }}
        isOpen={Boolean(errorToast)}
        close={() => setErrorToast()}
      >
        {errorToast}
      </Toast>
    </div>
  );
};

ShoppingPage.defaultProps = {
  count: '?',
  useCart: () => ({}),
};

export default ShoppingPage;
