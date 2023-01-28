import cx from 'classnames';
import { ReactElement } from 'react';
import styles from './HeaderBlur.module.scss';

interface Props {
  sticky?: boolean;
  pinned?: boolean;
  inverse?: boolean;
  className?: string;
}

const HeaderBlur = ({
  sticky,
  pinned,
  inverse,
  className,
}: Props): ReactElement => {
  return (
    <div
      className={cx(className, styles.blur, {
        [styles.sticky]: sticky,
        [styles.pinned]: pinned,
        [styles.inverse]: inverse,
      })}
      aria-hidden="true"
    />
  );
};

export default HeaderBlur;