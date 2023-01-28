import { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { BORDER } from 'common/const';
import { Button, QuantityButton, Toast } from 'common/components';
import { useCart } from 'app/context';
import { findItem } from 'common/utils';

import styles from './AddToCart.module.css';

const AddToCart = ({ item }) => {
  // console.log('<ProductDetail.AddToCart>', { item });

  const { items: cartItems = [], updateCart, error } = useCart();

  const { quantity = 0 } = useMemo(
    () => findItem(cartItems, item) ?? {},
    [item, cartItems],
  );

  const [{ toast, updateQuantity }, setState] = useState({
    toast: undefined,
    updateQuantity: item.updateIncrement,
  });

  const handleUpdateQuantity = useCallback(
    (qtyAdd) => {
      const remainder = qtyAdd % item.updateIncrement;

      if (remainder) {
        setState({
          toast: item.isLabor
            ? 'You can only add increments of 15 mins(0.25h), 30 mins (0.50h), 45 mins (0.75h) and 60 mins (1h).'
            : `You can only add increments of ${item.updateIncrement}`,
          updateQuantity: qtyAdd - remainder + item.updateIncrement,
        });
      } else {
        setState({ updateQuantity: qtyAdd }); // hide toast
      }
    },
    [item],
  );

  const handleSubmit = useCallback(
    (qtyAdd) => {
      // helper fn
      const submit = (qty, toast) => {
        // only update if newQuantity is different
        if (qty !== item.quantity) {
          updateCart(item, qty);
          setState((state) => ({ ...state, toast }));
        }
      };

      if (qtyAdd + item.quantity < item.addIncrement) {
        submit(
          item.addIncrement,
          // `You must have a minimum of ${item.addIncrement} 500 Watt Outlets per order. We've added them to your cart.`,
        );
      } else if (qtyAdd + item.quantity > item.max) {
        // submit(
        // item.max,
        // `You can only have a maximum of ${item.max} 500 Watt Outlets per order. We've added them to your cart.`,
        // );
      } else {
        submit(qtyAdd + item.quantity);
      }
    },
    [item, updateCart],
  );

  // auto-adjust quantity, based on min/max
  useEffect(() => {
    if (quantity < item.min) {
      handleSubmit(item.min);
    }
    if (quantity > item.max) {
      handleSubmit(item.max);
    }
  }, [quantity, item.min, item.max, handleSubmit]);

  const max = useMemo(
    () => (isNaN(item.max) ? item.max : item.max - quantity),
    [quantity, item],
  );

  const min = useMemo(
    () => (quantity ? item.updateIncrement : item.addIncrement),
    [quantity, item],
  );

  return (
    <>
      <div className={styles.wrap}>
        <div className={cx(BORDER.DIVIDER, styles.quantity)}>
          <QuantityButton
            input
            onChange={(qty) => handleUpdateQuantity(qty)}
            number={updateQuantity}
            addIncrement={item.updateIncrement}
            updateIncrement={item.updateIncrement}
            min={min}
            max={max}
            zeroIcon="minus"
          />
        </div>

        <Button
          className={styles.add}
          onClick={() => handleSubmit(quantity + updateQuantity)}
          disabled={Boolean(error)}
        >
          Add to Cart
        </Button>
      </div>

      <Toast
        alert={'warning'}
        anchor={{ vertical: 'top', horizontal: 'right' }}
        isOpen={Boolean(toast)}
        close={() => setState((state) => ({ ...state, toast: undefined }))}
      >
        {toast}
      </Toast>
    </>
  );
};

export default AddToCart;
