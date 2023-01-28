import { useCallback, useEffect } from 'react';
import cx from 'classnames';

import { BACKGROUND, BORDER, TEXT } from 'common/const';
import { Button, QuantityButton, SubmitButton } from 'common/components';
import { useCart } from 'app/context';
import { findItem } from 'common/utils';

import withWrap from './withWrap';

import styles from './AddToCart.module.css';

const AddToCart = ({ isActive, setIsActive, item }) => {
  // if (isActive) console.log('<AddToCart>', { isActive, item });

  const { items: cartItems = [], updateCart, error } = useCart();
  const { quantity = 0 } = findItem(cartItems, item) ?? {};

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
    // console.log({ quantity }, item.id);

    if (quantity < item.min) {
      // console.log('increase', quantity < item.min, { quantity, min: item.min });
      handleQuantityChange(item.min);
    }
    if (quantity > item.max) {
      // console.log('decrease', quantity < item.max, { quantity, max: item.max });
      handleQuantityChange(item.max);
    }
  }, [quantity, item.min, item.max, handleQuantityChange]);

  // disable button, on error
  if (Boolean(error)) {
    return <SubmitButton isLoading className={cx(styles.round)} />;
  }

  // item is already in cart
  if (quantity) {
    if (isActive) {
      return (
        <QuantityButton
          onChange={handleQuantityChange}
          number={quantity}
          addIncrement={item.addIncrement}
          updateIncrement={item.updateIncrement}
          min={item.min}
          max={item.max}
          className={styles.border}
          onMouseLeave={() => setIsActive(false)}
        />
      );
    } else {
      return (
        <Button
          size="small"
          className={cx(BACKGROUND.PAPER, styles.round, styles.border)}
          onMouseEnter={() => setIsActive(true)}
          color="inherit"
          disabled={quantity === item.min && quantity === item.max}
        >
          <span className={cx(TEXT.BUTTON)}>{quantity}</span>
        </Button>
      );
    }
  } else {
    // item is not already in cart
    return (
      <Button
        onClick={() => handleQuantityChange(item.addIncrement)}
        onMouseEnter={() => setIsActive(true)}
        endIcon="plus"
        className={cx(
          BACKGROUND.PAPER,
          BORDER.PAPER,
          styles.add,
          styles.border,
        )}
        color="inherit"
      >
        Add
      </Button>
    );
  }
};

export default withWrap(AddToCart);
