import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { MessageKey } from '../../../public/locales/setup';
import checkFeatureFlag from '../../../utils/checkFeatureFlag';
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
  const isHorizon = checkFeatureFlag('enable-horizon');

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = offset > window.scrollY;
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <div
      aria-hidden="true"
      className={cx(styles.wrap, {
        [styles.invisible]: !visible,
      })}
    >
      <Typography
        align="center"
        variant="eyebrow"
        className={cx(styles.text, {
          [styles.horizon]: isHorizon,
        })}
      >
        {t(content)}
      </Typography>

      <div
        className={cx(styles.icon, {
          [styles.small]: size === 'small',
          [styles.default]: !outline,
          [styles.outline]: outline,
          [styles.horizon]: isHorizon,
        })}
      >
        <ArrowRightAltIcon />
      </div>
    </div>
  );
};

export default ScrollTeaser;
