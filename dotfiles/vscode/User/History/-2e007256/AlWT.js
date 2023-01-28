import { useMemo } from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';

import { TEXT } from 'common/const';

import Categories from './Categories';

import styles from './Packages.module.css';

const Packages = ({ packages, isEarlyPricing }) => {
  console.log('<Packages>', { packages, isEarlyPricing });

  const { selected } = useParams();

  // get categories & name from selected group
  const { description, categories } = useMemo(() => {
    console.log({ selected, packages });
    return packages;
  }, [packages]);

  return selected === description ? (
    <div className={cx(styles.box)}>
      <h3 className={cx(TEXT.H4, styles.title)}>{description}</h3>

      <Categories categories={categories} isEarlyPricing={isEarlyPricing} />
    </div>
  ) : null;
};

Packages.props = {};

export default Packages;
