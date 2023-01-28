import { useCallback, useState } from 'react';
import { bool, func, object } from 'prop-types';
import cx from 'classnames';

import { BACKGROUND, COLOR, TEXT } from 'common/const';
import { getItemFlag, getItemTotals } from 'common/utils';
import { TextLink, Product, Icon } from 'common/components';

import UpdateQuantity from '../UpdateQuantity';

import styles from './Item.module.css';

const Item = ({
  hasError,
  item,
  isEarlyPricing,
  setRemovingItem,
  updateCart,
}) => {
  // console.log('<Cart.Item>', { item }, item.quantity);

  const [isActive, setIsActive] = useState(false);

  const { currentPrice, originalPrice } = getItemTotals({
    item,
    isEarlyPricing,
  });

  // to keep QuantityButton from firing onChange for every render
  const handleQuantityChange = useCallback(
    (newQuantity, context) => {
      console.log('!Cart/Item.handleQuantityChange', { newQuantity, context });

      if (newQuantity) {
        if (newQuantity !== item.quantity) {
          updateCart(item, newQuantity);
        }
      } else {
        setRemovingItem(item);
      }
    },
    [item, updateCart, setRemovingItem],
  );

  const flag = getItemFlag({ ...item, price: currentPrice });

  return (
    <Product
      variant="cart"
      isActive={isActive}
      id={item.id}
      name={item.name}
      image={item.image}
      currentPrice={currentPrice * item.quantity}
      originalPrice={originalPrice * item.quantity}
      flag={flag}
      quantity={
        <UpdateQuantity
          isActive={isActive && !hasError}
          setIsActive={setIsActive}
          className={cx(BACKGROUND.PAPER, TEXT.SUBTITLE)}
          quantity={item.quantity ?? 0}
          addIncrement={item.addIncrement}
          updateIncrement={item.updateIncrement}
          onChange={handleQuantityChange}
          disabled={
            item.isRequired ||
            hasError ||
            (item.quantity === item.min && item.quantity === item.max)
          }
          min={item.min}
          max={item.max}
        />
      }
    >
      {item.isRequired || item.min > 0 || hasError ? null : (
        <TextLink
          className={styles.remove}
          onClick={() => setRemovingItem(item)}
        >
          <span className={styles.trash}>
            <Icon name="trash" size="small" />
          </span>
          <span className={COLOR.TEXT}>Remove Item</span>
        </TextLink>
      )}
    </Product>
  );
};

Item.propTypes = {
  hasError: bool,
  item: object,
  setRemovingItem: func,
  updateCart: func,
};

export default Item;