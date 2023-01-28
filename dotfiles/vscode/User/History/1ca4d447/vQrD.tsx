import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import styles from './TypographyRhythm.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const TypographyRhythm = ({ children, className }: Props): ReactElement => {
  return (
    <div className={cx(className, styles.TypographyRhythm)}>{children}</div>
  );
};

export default TypographyRhythm;
