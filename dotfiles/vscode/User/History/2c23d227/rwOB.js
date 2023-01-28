import { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { BACKGROUND, BORDER, COLOR } from 'common/const';
import { Button, QuantityButton, SubmitButton } from 'common/components';
import { useCart } from 'app/context';
import { findItem, isZero } from 'common/utils';

import styles from './AddToCart.module.css';

const AddToCart = ({ item }) => {
  console.log('<ProductDetail.AddToCart>', { item });

  const { items: cartItems = [], updateCart, error } = useCart();

  const { quantity = 0 } = useMemo(
    () => findItem(cartItems, item) ?? {},
    [item, cartItems],
  );

  const [updateQuantity, setUpdateQuantity] = useState(
    quantity ? item.updateIncrement : item.addIncrement,
  );

  const handleUpdateQuantity = useCallback(
    (qtyAdd) => {
      const remainder = qtyAdd % item.updateIncrement;

      if (remainder) {
        // show toast
        setUpdateQuantity(qtyAdd - remainder + item.updateIncrement);
      } else {
        setUpdateQuantity(qtyAdd);
      }
    },
    [item],
  );

  const handleSubmit = useCallback(
    (qtyAdd) => {
      // helper fn
      const submit = (qty) => {
        // update if newQuantity is different
        if (qty !== item.quantity) {
          updateCart(item, qty);
        }
      };

      if (qtyAdd + item.quantity < item.addIncrement) {
        // show toast
        submit(item.addIncrement);
      } else if (qtyAdd + item.quantity > item.max) {
        // show toast
        submit(item.max);
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
  );
};

export default AddToCart;
