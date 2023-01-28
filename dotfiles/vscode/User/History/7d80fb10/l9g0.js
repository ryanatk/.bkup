import { useState } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import cx from 'classnames';

import { useShop } from 'app/context';
import { TEXT, BACKGROUND, ROUTE, COLOR } from 'common/const';
import { TextLink } from 'common/components';

import styles from './Filters.module.css';

const Filters = ({ filters, selected, onChange }) => {
  // console.log('<Filters>', { filters, selected });

  const [hoverLink, setHoverLink] = useState('');
  const { update } = useShop();

  return (
    <ol className={styles.list}>
      {filters.map(({ name, isPackage }) => {
        return (
          <li
            key={`filter-${name}`}
            className={cx(TEXT.SUBTITLE, styles.item, COLOR.TEXT_SECONDARY)}
          >
            <TextLink
              className={cx(
                styles.link,
                isPackage
                  ? {
                      [BACKGROUND.POWER_PACKAGE]: name === selected,
                      [BACKGROUND.POWER_PACKAGE_LIGHT]: name === hoverLink,
                    }
                  : {
                      [BACKGROUND.GREY_100]: name === selected,
                      [BACKGROUND.GREY_50]: name === hoverLink,
                    },
              )}
              color="inherit"
              to={ROUTE.CATALOG + '/' + name}
              track={[
                'select_content',
                { content_type: 'catalog filter', item_id: name },
              ]}
              onClick={() => {
                onChange(name);
                update({ scrollTo: 0 });
              }}
              onMouseEnter={() => setHoverLink(name)}
              onMouseLeave={() =>
                // only unset hoverLink when necessary
                setHoverLink((link) => (name === link ? '' : name))
              }
            >
              {name}
            </TextLink>
          </li>
        );
      })}
    </ol>
  );
};

Filters.propTypes = {
  filters: arrayOf(
    shape({
      name: string,
      isPackage: bool,
    }),
  ),
  selected: string,
  onChange: func,
};

export default Filters;
