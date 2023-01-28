import { useMemo } from 'react';
import { array, bool, shape, string } from 'prop-types';
import cx from 'classnames';
import { useParams } from 'react-router';

import { TEXT } from 'common/const';

import Categories from './Categories';

import styles from './Packages.module.css';

const Packages = ({ packageData, isEarlyPricing }) => {
  console.log('<Packages>', { packageData, isEarlyPricing });

  const { selected } = useParams();

  // get categories & name from selected group
  const { description, categories } = useMemo(() => {
    console.log({ selected, packageData });
    return packageData;
  }, [packageData, selected]);

  return selected === description ? (
    <div className={cx(styles.box)}>
      <h3 className={cx(TEXT.H4, styles.title)}>{description}</h3>

      <Categories categories={categories} isEarlyPricing={isEarlyPricing} />
    </div>
  ) : null;
};

Packages.props = {
  packageData: shape({
    description: string,
    categories: array,
  }),
  isEarlyPricing: bool,
};

export default Packages;
