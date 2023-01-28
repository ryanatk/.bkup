import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  spacing?: 'single' | 'double';
  indent?: 'single' | 'double';
  children: ReactNode;
}

const OL = ({
  spacing = 'single',
  indent = 'single',
  children,
}: Props): ReactElement => {
  return (
    <ol
      className={cx({
        [styles.doubleSpaced]: spacing === 'double',
        [styles.singleIndent]: indent === 'single',
        [styles.doubleIndent]: indent === 'double',
      })}
    >
      {children}
    </ol>
  );
};

export default OL;
