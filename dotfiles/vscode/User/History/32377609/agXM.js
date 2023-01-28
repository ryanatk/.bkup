import { useMemo } from 'react';
import { array, func, string } from 'prop-types';
import cx from 'classnames';
import { merge } from 'lodash';

import { BORDER, COLOR, FLAG, TEXT } from 'common/const';

import styles from './ProductList.module.css';

const FREE = 'free-items';
const REQUIRED = 'required-items';
const STANDARD = 'standard-items';
const INIT_CATEGORY = {
  [FREE]: [],
  [REQUIRED]: [],
  [STANDARD]: [],
};

const ProductList = ({ categories, items, renderItem, groupClassName }) => {
  console.log('<ProductList>', {
    categories,
    items,
    renderItem,
    groupClassName,
  });

  const list = useMemo(() => {
    const categorized = items.reduce((obj, item) => {
      const name = item.associatedCategory ?? item.category;
      const group = item.isFree ? FREE : item.isRequired ? REQUIRED : STANDARD;
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
        const category = merge({}, INIT_CATEGORY, categorized[name]);

        return {
          name,
          items: [...category[FREE], ...category[STANDARD]],
          required: category[REQUIRED],
        };
      })
      .filter(({ items, required }) => items?.length || required?.length);
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
