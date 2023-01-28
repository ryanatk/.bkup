import { arrayOf, object, shape, string } from 'prop-types';
import cx from 'classnames';
import { merge, sortBy } from 'lodash';

import { useShop } from 'app/context';
import { TEXT } from 'common/const';

import CatalogGrid from '../../CatalogGrid';

import styles from './Categories.module.css';

const Categories = ({ categories = [], isEarlyPricing }) => {
  // console.log('<Categories>', { categories, isEarlyPricing });

  const { powerPackage } = useShop();

  const mergeInfo = (item) => merge({}, powerPackage[item.id], item);

  return categories.map(({ longDescription, description, items }) => (
    <section key={`subcategory-${description}`}>
      {description && (
        <h4 className={cx(TEXT.H5, styles.name)}>{description}</h4>
      )}

      {longDescription && (
        <p className={styles.description}>{longDescription}</p>
      )}

      <CatalogGrid
        items={sortBy(
          items.map((item) => mergeInfo(item)),
          ({ isPackage, isFree }) => !isPackage && !isFree,
        )}
        isEarlyPricing={isEarlyPricing}
        variant="catalog"
      />
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
