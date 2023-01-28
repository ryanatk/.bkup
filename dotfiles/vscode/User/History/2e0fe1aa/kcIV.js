import { useCallback } from 'react';
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
      <>
        {isActive ? (
          <Button
            onClick={() => handleQuantityChange(item.addIncrement)}
            endIcon="plus"
            className={cx(BACKGROUND.PAPER, styles.add)}
            color="inherit"
          >
            Add to cart
          </Button>
        ) : (
          <IconButton
            size="small"
            onMouseEnter={() => setIsActive(true)}
            onFocus={() => setIsActive(true)}
            icon="plus"
            color="inherit"
          />
        )}
      </>
    );
  }
};

export default withClickOutside(AddToCart);
