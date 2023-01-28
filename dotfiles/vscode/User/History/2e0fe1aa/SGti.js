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
import { useCallback } from 'react';

const AddToCart = ({ isActive, setIsActive, item }) => {
  // if (isActive) console.log('<AddToCart>', { isActive, item });

  const { items: cartItems = [], updateCart, error } = useCart();
  const { quantity } = findItem(cartItems, item) ?? {};

  // to keep QuantityButton from firing onChange for every render
  const handleQuantityChange = useCallback(
    (quantity) => {
      updateCart(item, quantity);
    },
    [item, updateCart],
  );

  // item is already in cart
  // if (Boolean(error)) {
  if (true) {
    return (
      <SubmitButton isLoading className={cx(styles.round)} color="inherit">
        <span className={cx(TEXT.SUBTITLE)}>{quantity}</span>
      </SubmitButton>
    );
  } else if (quantity) {
    if (isActive) {
      return (
        <QuantityButton onChange={handleQuantityChange} number={quantity} />
      );
    } else {
      return (
        <Button
          size="small"
          className={cx(BACKGROUND.PAPER, styles.round)}
          onMouseEnter={() => setIsActive(true)}
          color="inherit"
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
            onClick={() => updateCart(item, 1)}
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
