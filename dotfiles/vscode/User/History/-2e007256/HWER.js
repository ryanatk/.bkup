import { useMemo } from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';

import { TEXT } from 'common/const';

import Categories from './Categories';

import styles from './Packages.module.css';

const Packages = ({ catalog, isEarlyPricing }) => {
  // console.log('<Packages>', { catalog, isEarlyPricing });

  const { selected } = useParams();

  // get categories & name from selected group
  const {
    subcategories: categories = [],
    description,
    longDescription,
  } = useMemo(
    () =>
      selected
        ? catalog.find(({ description }) => description === selected)
        : {},
    [catalog, selected],
  );

  return (
    <div className={cx(styles.box)}>
      <h3 className={cx(TEXT.H4, styles.title)}>{description}</h3>

      {longDescription && (
        <p className={cx(TEXT.BODY_1, styles.description)}>{longDescription}</p>
      )}

      <Categories categories={categories} isEarlyPricing={isEarlyPricing} />
    </div>
  );
};

Packages.props = {};

export default Packages;
