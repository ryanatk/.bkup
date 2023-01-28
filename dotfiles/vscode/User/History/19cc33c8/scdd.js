import { arrayOf, object, shape, string } from 'prop-types';
import cx from 'classnames';
import { merge } from 'lodash';

import { useShop } from 'app/context';
import { TEXT } from 'common/const';

import Item from '../Item';

import styles from './Categories.module.css';

const Categories = ({ categories = [], isEarlyPricing }) => {
  // console.log('<Categories>', { categories, isEarlyPricing });

  const { powerPackage } = useShop();

  const mergeItem = (item) => merge({}, powerPackage[item.id], item);

  return categories.map(({ longDescription, description, items }) => (
    <section key={`subcategory-${description}`}>
      {description && (
        <h4 className={cx(TEXT.H5, styles.name)}>{description}</h4>
      )}

      {longDescription && (
        <p className={styles.description}>{longDescription}</p>
      )}

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={description + item.id} className={styles.item}>
            <Item item={item} isEarlyPricing={isEarlyPricing} />
          </li>
        ))}
      </ul>
    </section>
  ));
};

Categories.propTypes = {
  categories: arrayOf(
    shape({
      longDescription: string,
      description: string,
      items: arrayOf(object),
    }),
  ),
};

export default Categories;
