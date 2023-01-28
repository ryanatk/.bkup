import { useCallback, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { BACKGROUND, BORDER, COLOR } from 'common/const';
import { Button, QuantityButton, SubmitButton } from 'common/components';
import { useCart } from 'app/context';
import { findItem } from 'common/utils';

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
  const handleQuantityChange = useCallback(
    (newQuantity) => {
      if (newQuantity !== quantity) {
        updateCart(item, newQuantity);
      }
    },
    [item, updateCart, quantity],
  );

  // auto-adjust quantity, based on min/max
  useEffect(() => {
    if (quantity < item.min) {
      handleQuantityChange(item.min);
    }
    if (quantity > item.max) {
      handleQuantityChange(item.max);
    }
  }, [quantity, item.min, item.max, handleQuantityChange]);

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
        onClick={() => handleQuantityChange(quantity + updateQuantity)}
        disabled={Boolean(error)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
