import cx from 'classnames';
import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import ArrowDown from '../../../svg/icon-arrow-down.svg';
import { Typography } from '../../sormus';
import styles from './ScrollTeaser.module.scss';

interface ScrollTeaserProps {
  offset?: number;
  size?: 'small' | 'default';
  outline?: boolean;
  content?: MessageKey;
}

const ScrollTeaser = ({
  offset = 50,
  size = 'default',
  outline,
  content = 'meet_oura_ring_scroll_to_discover',
}: ScrollTeaserProps): JSX.Element => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = offset > window.scrollY;
      setVisible(isVisible);
    };

    const throttleScroll = throttle(handleScroll, 50);
    window.addEventListener('scroll', throttleScroll);

    return () => window.removeEventListener('scroll', throttleScroll);
  }, [offset]);

  return (
    <div
      aria-hidden="true"
      className={cx(styles.wrap, { [styles.invisible]: !visible })}
    >
      <Typography
        align="center"
        variant="eyebrow"
        color="inherit"
        className={cx(styles.text)}
      >
        {t(content)}
      </Typography>

      <div
        className={cx(styles.icon, {
          [styles.small]: size === 'small',
          [styles.default]: !outline,
          [styles.outline]: outline,
        })}
      >
        <ArrowDown />
      </div>
    </div>
  );
};

export default ScrollTeaser;
