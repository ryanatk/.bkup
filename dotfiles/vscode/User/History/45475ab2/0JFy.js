import { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { BORDER, ROUTE, TEXT } from 'common/const';
import { currency, track } from 'common/utils';
import {
  Button,
  Content,
  Dialog,
  EventOfflineDialog,
  Loading,
  ProductList,
  Scrollbar,
} from 'common/components';
import { useCart, useOrders, useShop } from 'app/context';
import { useEvent } from 'common/hooks';
import { useHistory } from 'react-router';

import EventInfo from '../EventInfo';
import Item from './Item';

import styles from './Cart.module.css';

const Cart = () => {
  const { isRefetching: isRefetchingOrders } = useOrders();
  const { eventId, categories, isLoading, update: updateShop } = useShop();
  const { data: event = {} } = useEvent(eventId);
  const { isEarlyPricing, isOffline } = useMemo(() => event, [event]);
  const history = useHistory();

  const {
    error,
    items = [],
    totalsData: { subtotal },
    updateCart,
    isUpdating,
  } = useCart();

  const handleClick = useCallback(() => {
    if (isOffline) {
      setIsOpen(true);
    } else {
      updateShop({ scrollTo: 0 });
      history.push(ROUTE.CHECKOUT);
    }
  }, [isOffline, history, updateShop]);

  // console.log('<Cart>', { items, subtotal });

  const [removingItem, setRemovingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    track('view_cart', {
      currency: 'USD',
      value: subtotal,
      items: items.map(({ id, name }) => ({ item_id: id, item_name: name })),
    });
  }, [subtotal, items]);

  return (
    <div className={styles.wrap}>
      <Scrollbar>
        <div className={styles.content}>
          <div className={cx(BORDER.GREY_100, styles.event)}>
            <EventInfo className={TEXT.BODY_2} />
          </div>

          <div className={cx({ [styles.loading]: isLoading }, styles.list)}>
            <Content isLoading={isLoading}>
              <ProductList
                groupClassName={styles.group}
                categories={categories}
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
              />
            </Content>
          </div>
        </div>
      </Scrollbar>

      <div className={cx(BORDER.GREY_100, styles.proceed)}>
        <dl className={cx(TEXT.SUBTITLE, styles.totals)}>
          <dt>Subtotal (USD)</dt>
          <dd>
            {isRefetchingOrders || isUpdating ? (
              <Loading size="button" />
            ) : (
              currency(subtotal)
            )}
          </dd>
        </dl>

        <p className={cx(TEXT.CAPTION, styles.terms)}>
          Taxes, discounts and fees will be calculated at Checkout
        </p>

        <Button fullWidth disabled={!items.length} onClick={handleClick}>
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
          track('remove_from_cart', {
            items: [{ item_id: removingItem.id, item_name: removingItem.name }],
          });
          setRemovingItem(undefined);
        }}
        size="xs"
        submitColor="error"
        submitText="Yes, Remove"
      >
        <p>
          Are you sure you want to remove "{removingItem?.name}" from your cart?
        </p>
      </Dialog>

      <EventOfflineDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
