import cx from 'classnames';
import { ReactElement } from 'react';
import styles from './HeaderBlur.module.scss';

interface Props {
  className?: string;
}

const HeaderBlur = ({ className }: Props): ReactElement => {
  return (
    <div className={cx(className, styles.wrapperBlur)} aria-hidden="true" />
  );
};

export default HeaderBlur;
