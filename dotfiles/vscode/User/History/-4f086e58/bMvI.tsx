import cx from 'classnames';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../constants';
import styles from './Grid.module.scss';

export interface GridProps {
  /** optional spacing between rows - multiple of vertical rhythm */
  rowCount?: number;
  /** remove outermost gutters for nested grid */
  nested?: boolean;
  /** optional classNames */
  className?: string;
  /** optional element name */
  Element?: 'div' | 'aside' | 'section' | 'ul' | 'header' | 'article';
  /** props */
  [x: string]: any;
}

/** Allow default gap to be added, which used to be a prop prior to tailwind purging */
const addDefaultGap = (className: string) =>
  className && className.includes('gap-y-') ? '' : 'gap-y-8';

const Grid = ({
  Element = 'div',
  rowCount = 1,
  nested = false,
  className,
  children,
  ...props
}: GridProps): JSX.Element => {
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);

  return (
    <Element
      className={cx(
        addDefaultGap(className),
        {
          [styles['gridContainer--nested']]: nested,
          [styles.gridContainer]: !nested,
        },
        className,
      )}
      style={{
        gridTemplateRows: isMinWidthLarge
          ? `repeat(${rowCount}, 1fr)`
          : `repeat(${rowCount}, auto)`,
      }}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Grid;
