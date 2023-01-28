import cx from 'classnames';
import { ReactElement } from 'react';
import styles from './HeaderBlur.module.scss';

interface Props {
  inverse?: boolean;
  className?: string;
}

const HeaderBlur = ({ inverse, className }: Props): ReactElement => {
  return (
    <div
      className={cx(className, styles.wrapperBlur, {
        [styles.inverse]: inverse,
      })}
      aria-hidden="true"
    />
  );
};

export default HeaderBlur;
