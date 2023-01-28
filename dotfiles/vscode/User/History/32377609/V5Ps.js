import { useMemo } from 'react';
import { array, func, string } from 'prop-types';
import cx from 'classnames';

import { BORDER, COLOR, FLAG, TEXT } from 'common/const';

import styles from './ProductList.module.css';
import { useShop } from 'app/context';

const FREE = 'free-items';
const REQUIRED = 'required-items';
const STANDARD = 'standard-items';
const INIT_CATEGORY = {
  [FREE]: [],
  [REQUIRED]: [],
  [STANDARD]: [],
};

const ProductList = ({ items, renderItem, groupClassName }) => {
  const { categories } = useShop();

  const list = useMemo(() => {
    const categorized = items.reduce((obj, item) => {
      const name = item.associatedCategory ?? item.category;
      const isFree = (item.advancedPrice ?? item.price) === 0;
      const group = isFree ? FREE : item.isRequired ? REQUIRED : STANDARD;
      const category = obj[name] ?? INIT_CATEGORY;

      return {
        ...obj,
        [name]: {
          ...category,
          [group]: [...category[group], item],
        },
      };
    }, {});

    return categories
      .map((name) => {
        const group = categorized[name];

        return group
          ? {
              name,
              items: [...group[FREE], ...group[STANDARD]],
              required: group[REQUIRED],
            }
          : {};
      })
      .filter(({ items }) => items?.length);
  }, [items, categories]);

  return (
    <ul className={styles.list}>
      {list.map(({ name, items, required }) => (
        <li
          className={cx(BORDER.DIVIDER, groupClassName, styles.group)}
          key={'group' + name}
        >
          <header className={styles.header}>
            <h3 className={cx(FLAG.CATEGORY.className, styles.flag)}>{name}</h3>
          </header>

          <ul>
            {items.map((item) => (
              <li key={name + item.id} className={styles.item}>
                {renderItem(item)}
              </li>
            ))}
          </ul>

          {required.length ? (
            <>
              <header className={styles.header}>
                <h4 className={cx(FLAG.CATEGORY.className, styles.flag)}>
                  Required
                </h4>
                <p
                  className={cx(COLOR.GREY_600, TEXT.BODY_2, styles.subheading)}
                >
                  These were added based on the items in your cart
                </p>
              </header>

              <ul>
                {required.map((item) => (
                  <li key={name + item.id + 'required'} className={styles.item}>
                    {renderItem(item)}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

ProductList.propTypes = {
  groupClassName: string,
  items: array,
  renderItem: func,
};

export default ProductList;
