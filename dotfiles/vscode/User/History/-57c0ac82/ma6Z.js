import { useMemo } from 'react';
import { array, bool, shape, string } from 'prop-types';
import cx from 'classnames';
import { useParams } from 'react-router';

import { TEXT } from 'common/const';

import Categories from './Categories';

import styles from './Catalog.module.css';

const Catalog = ({ catalog, isEarlyPricing }) => {
  // console.log('<Catalog>', { catalog, isEarlyPricing });

  const { selected } = useParams();

  // get categories & name from selected group
  const {
    categories = [],
    description,
    longDescription,
  } = useMemo(
    () => catalog.find(({ description }) => description === selected) ?? {},
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

Catalog.props = {
  packageData: shape({
    description: string,
    isEarlyPricing: bool,
  }),
};

export default Catalog;
