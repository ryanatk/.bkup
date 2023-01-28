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

  // to keep QuantityButton from firing onChange for every render
  const handleSubmit = useCallback(
    (newQuantity) => {
      if (newQuantity === item.quantity) {
        return; // ignore if newQuantity is not different
      }

      const remainder =
        (newQuantity - item.addIncrement) % item.updateIncrement;

      if (newQuantity !== item.quantity) {
        if (isZero(newQuantity)) {
          console.log('isZero');
          updateCart(item, 0);
        } else if (newQuantity > item.max) {
          // show toast
          updateCart(item, item.max);
        } else if (newQuantity < item.min) {
          // show toast
          updateCart(item, item.min);
        } else if (newQuantity < item.addIncrement) {
          // show toast
          updateCart(item, item.addIncrement);
        } else if (remainder) {
          // show toast
          updateCart(item, newQuantity - remainder + item.updateIncrement);
        } else {
          updateCart(item, newQuantity);
        }
      }
    },
    [item, updateCart, quantity],
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

  // const addIncrement = useMemo(
  //   () => (quantity ? item.updateIncrement : item.addIncrement),
  //   [quantity, item.addIncrement, item.updateIncrement],
  // );

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
          onChange={(qty) => setUpdateQuantity(qty)}
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
