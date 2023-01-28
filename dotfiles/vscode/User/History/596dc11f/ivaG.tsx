import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import cx from 'classnames';
import { FC, ReactNode, useEffect, useState } from 'react';
import { t } from '../../../public/locales/LocaleContext';
import { Typography } from '../../sormus';
import styles from './ScrollTeaser.module.scss';

export interface WrapperProps {
  children: ReactNode;
  visible: boolean;
}

interface ScrollTeaserProps {
  offset?: number;
  size?: 'small' | 'default';
  color?: 'gray' | 'default';
  wrapperComponent?: ({ children, visible }: WrapperProps) => JSX.Element;
  contentComponent?: ({ color }) => JSX.Element;
}

const DefaultWrapper = ({ children, visible }: WrapperProps) => (
  <div
    aria-hidden="true"
    className={cx(styles.ScrollTeaser, { [styles.invisible]: !visible })}
  >
    {children}
  </div>
);

const DefaultContent = ({ color }) => (
  <Typography align="center" variant="eyebrow" className={styles.text}>
    {t('meet_oura_ring_scroll_to_discover')}
  </Typography>
);

const ScrollTeaser: FC<ScrollTeaserProps> = ({
  offset = 50,
  size = 'default',
  color = 'default',
  wrapperComponent,
  contentComponent,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = offset > window.scrollY;
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  const Wrapper = wrapperComponent || DefaultWrapper;
  const Content = contentComponent || DefaultContent;

  return (
    <Wrapper visible={visible}>
      <Content />
      <div
        className={cx(styles.icon, {
          [styles.small]: size === 'small',
          'bg-helsinkiBlue text-white': color === 'default',
          'text-grayMedium': color === 'gray',
        })}
      >
        <ArrowRightAltIcon />
      </div>
    </Wrapper>
  );
};

export default ScrollTeaser;
