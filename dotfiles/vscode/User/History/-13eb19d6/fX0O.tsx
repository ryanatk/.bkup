import cx from 'classnames';
import { ReactElement } from 'react';
import styles from './HeaderBlur.module.scss';

const HeaderBlur = ({ className }): ReactElement => {
  return (
    <div className={cx(className, styles.wrapperBlur)} aria-hidden="true" />
  );
};

export default HeaderBlur;
