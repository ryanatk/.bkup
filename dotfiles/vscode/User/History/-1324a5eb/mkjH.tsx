import cx from 'classnames';
import { useState } from 'react';
import { useA11yContext } from '../../../contexts/A11yContext';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import { Image, Waypoint } from '../../sormus';
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
      logo: 'usa-today-logo.svg',
    },
  },
  {
    quote: 'simple_home_accolades_wareable',
    source: {
      name: 'Wareable',
      logo: 'wareable-logo.svg',
    },
  },
  {
    quote: 'simple_home_accolades_washington_post',
    source: {
      name: 'Washington Post',
      logo: 'washington-post-logo.svg',
    },
  },
];

interface Props {
  dark?: boolean;
}

const Accolades = ({ dark }: Props): JSX.Element => {
  const { prefersReducedMotion } = useA11yContext();
  const [scrolling, setScrolling] = useState(false);
  // If the user has motion enabled, dupe the items to help with infinite looping
  const items = prefersReducedMotion
    ? accoladesData
    : [...accoladesData, ...accoladesData];
  const logoPath = 'accolades/' + (dark ? 'dark/' : '');

  return (
    <Waypoint
      topOffset="50%"
      onEnter={() => {
        // only set once
        if (!scrolling) setScrolling(true);
      }}
      className={cx('py-10', {
        'bg-white': !dark,
        'bg-helsinkiBlue-dark': dark,
        // For users with reduced motion, allow them to manually scroll
        'overflow-x-auto': prefersReducedMotion,
        'overflow-x-hidden': !prefersReducedMotion,
      })}
    >
      <ul
        className={cx('inline-flex items-center', {
          'motion-safe:animate-simpleHomePressTicker': scrolling,
        })}
      >
        {items.map((item, i) => (
          <li
            className={cx(styles.item, {
              'text-helsinkiBlue-dark': !dark,
              'text-white': dark,
            })}
            key={i}
            // Hide duped items from screen readers
            aria-hidden={i >= accoladesData.length}
          >
            <blockquote className="flex flex-row-reverse items-center gap-5">
              <p className={styles.text}>{t(item.quote)}</p>

              <cite className="flex-shrink-0">
                <Image
                  shortSrc={logoPath + item.source.logo}
                  alt={item.source.name}
                  className="h-6 max-w-none lg:h-9"
                />
              </cite>
            </blockquote>
          </li>
        ))}
      </ul>
    </Waypoint>
  );
};

export default Accolades;
