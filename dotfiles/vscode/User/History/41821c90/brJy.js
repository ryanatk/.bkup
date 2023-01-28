import { useCallback, useEffect } from 'react';
import cx from 'classnames';

import { BACKGROUND, TEXT } from 'common/const';
import {
  Button,
  IconButton,
  QuantityButton,
  SubmitButton,
  withClickOutside,
} from 'common/components';
import { useCart } from 'app/context';
import { findItem } from 'common/utils';

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
        />
      );
    } else {
      return (
        <Button
          size="small"
          className={cx(BACKGROUND.PAPER, styles.round)}
          onMouseEnter={() => setIsActive(true)}
          color="inherit"
          disabled={quantity === item.min && quantity === item.max}
        >
          <span className={cx(TEXT.SUBTITLE)}>{quantity}</span>
        </Button>
      );
    }
  } else {
    // item is not already in cart
    return (
      <Button
        onClick={() => handleQuantityChange(item.addIncrement)}
        endIcon="plus"
        className={cx(BACKGROUND.PAPER, styles.add)}
        color="inherit"
      >
        Add
      </Button>
    );
  }
};

export default withClickOutside(AddToCart);
