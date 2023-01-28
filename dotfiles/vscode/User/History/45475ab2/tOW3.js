import { useState } from 'react';
import cx from 'classnames';

import { BORDER, ROUTE, TEXT } from 'common/const';
import { currency } from 'common/utils';
import { Button, Dialog, ProductList, Scrollbar } from 'common/components';
import { useCart, useShop } from 'app/context';
import { useEvent } from 'common/hooks';

import EventInfo from '../EventInfo';
import Item from './Item';

import styles from './Cart.module.css';

const Cart = () => {
  const { eventId } = useShop();
  const { data: event = {} } = useEvent(eventId);
  const { isEarlyPricing } = event;

  const {
    error,
    items = [],
    totalsData: { subtotal },
    updateCart,
  } = useCart();

  console.log('<Cart>', { items, subtotal });

  const [removingItem, setRemovingItem] = useState();

  return (
    <div className={styles.wrap}>
      <Scrollbar>
        <div className={cx(BORDER.GREY_100, styles.event)}>
          <EventInfo className={TEXT.BODY_2} />
        </div>

        <div className={styles.list}>
          {/* <ProductList
            groupClassName={styles.group}
            items={items}
            renderItem={(item) => (
              <Item
                item={item}
                isEarlyPricing={isEarlyPricing}
                updateCart={updateCart}
                setRemovingItem={setRemovingItem}
                hasError={Boolean(error)}
              />
            )}
          /> */}
        </div>
      </Scrollbar>

      <div className={cx(BORDER.GREY_100, styles.proceed)}>
        <dl className={cx(TEXT.SUBTITLE, styles.totals)}>
          <dt>Subtotal (USD)</dt>
          <dd>{currency(subtotal)}</dd>
        </dl>

        <p className={cx(TEXT.CAPTION, styles.terms)}>
          Taxes, discounts and fees will be calculated at Checkout
        </p>

        <Button fullWidth to={ROUTE.CHECKOUT}>
          Checkout
        </Button>
      </div>

      <Dialog
        id="remove-item"
        title="Remove Item"
        close={() => setRemovingItem(undefined)}
        onCancel={() => setRemovingItem(undefined)}
        isOpen={Boolean(removingItem)}
        onSubmit={() => {
          updateCart(removingItem, 0);
          setRemovingItem(undefined);
        }}
        size="xs"
        submitColor="error"
        submitText="Yes, Remove"
      >
        Are you sure you want to remove "{removingItem?.name}" from your cart?
      </Dialog>
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
