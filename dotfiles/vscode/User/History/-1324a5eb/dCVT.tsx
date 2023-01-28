import cx from 'classnames';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { useA11yContext } from '../../../contexts/A11yContext';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { src } from '../../../utils/imageHelpers';
import { Image } from '../../sormus';
import styles from './AccoladesMarquee.module.scss';

interface AccoladeDataType {
  quote: MessageKey;
  source: {
    name: string;
    logo: string;
  };
}

const accoladesData: AccoladeDataType[] = [
  {
    quote: 'simple_home_accolades_usa_today',
    source: {
      name: 'USA Today',
      logo: src('simple-home/usa-today-logo', 'svg'),
    },
  },
  {
    quote: 'simple_home_accolades_wareable',
    source: {
      name: 'Wareable',
      logo: src('simple-home/wareable-logo', 'svg'),
    },
  },
  {
    quote: 'simple_home_accolades_washington_post',
    source: {
      name: 'Washington Post',
      logo: src('simple-home/washington-post-logo', 'svg'),
    },
  },
];

const Accolades = (): JSX.Element => {
  const { prefersReducedMotion } = useA11yContext();
  const [scrolling, setScrolling] = useState(false);
  // If the user has motion enabled, dupe the items to help with infinite looping
  const items = prefersReducedMotion
    ? accoladesData
    : [...accoladesData, ...accoladesData];
  return (
    <div
      className={cx('bg-white py-10', {
        // For users with reduced motion, allow them to manually scroll
        'overflow-x-auto': prefersReducedMotion,
        'overflow-x-hidden': !prefersReducedMotion,
      })}
    >
      <Waypoint
        topOffset="50%"
        scrollableAncestor={window}
        onEnter={() => {
          setScrolling(true);
        }}
      />
      <ul
        className={cx('inline-flex items-center', {
          'motion-safe:animate-simpleHomePressTicker': scrolling,
        })}
      >
        {items.map((item, i) => (
          <li
            className={styles.item}
            key={i}
            // Hide duped items from screen readers
            aria-hidden={i >= accoladesData.length}
          >
            <blockquote className="flex flex-row-reverse items-center">
              <p className={styles.text}>{t(item.quote)}</p>
              <footer className="flex-shrink-0 mr-6 lg:mr-8">
                <Image
                  src={item.source.logo}
                  alt={item.source.name}
                  className="h-6 max-w-none lg:h-9"
                />
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accolades;
