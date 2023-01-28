import { number, oneOfType, shape, string } from 'prop-types';
import cx from 'classnames';

import { BORDER, ROUTE } from 'common/const';
import { getItemFlag, getItemTotals } from 'common/utils';
import { Product } from 'common/components';
import { useClick } from 'common/hooks';

import AddToCart from './AddToCart';

import styles from './Item.module.css';
import { BACKGROUND, COLOR } from 'common/const';
import { useState } from 'react';

const Item = ({ item, isEarlyPricing }) => {
  const { currentPrice, originalPrice } = getItemTotals({
    item,
    isEarlyPricing,
  });

  const flag = getItemFlag({ ...item, price: currentPrice });

  const { component: Link, ...linkProps } = useClick({
    to: {
      pathname: ROUTE.PRODUCT + '/' + item.id,
      state: item,
    },
  });
  const [hoverItem, setHoverItem] = useState();
  console.log(item.priceListId);

  return (
    <div className={styles.wrap}>
      <Link
        {...linkProps}
        className={cx(styles.link, {
          [BORDER.PRIMARY]: hoverItem === item.id,
          [styles.inactive]: hoverItem !== item.id,
        })}
        onMouseLeave={() => setHoverItem(null)}
        onMouseEnter={() => {
          setHoverItem(item.id);
        }}
      >
        <Product
          variant="catalog"
          id={item.id}
          name={item.name}
          image={item.image}
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          blurb={item.blurb}
          flag={flag}
        />
      </Link>

      <div className={styles.quantity}>
        <AddToCart
          className={cx(
            BACKGROUND.PAPER,
            COLOR.TEXT,
            styles.add,
            styles.button,
          )}
          item={item}
          floating
        />
      </div>
    </div>
  );
};

Item.propTypes = {
  item: shape({
    id: oneOfType([number, string]),
    name: string,
    image: string,
    currentPrice: number,
    originalPrice: number,
    blurb: string,
  }),
};

Item.defaultProps = {};

export default Item;
