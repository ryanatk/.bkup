import { array, bool, oneOf } from 'prop-types';

import cx from 'classnames';

import Item from './Item';

import styles from './CatalogGrid.module.css';

const CatalogGrid = ({ variant, items, isEarlyPricing }) => {
  return (
    <ul className={cx(styles[variant], styles.list)}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <Item item={item} isEarlyPricing={isEarlyPricing} />
        </li>
      ))}
    </ul>
  );
};

Item.propTypes = {
  items: array,
  isEarlyPricing: bool,
  variant: oneOf(['catalog']),
};

export default CatalogGrid;
