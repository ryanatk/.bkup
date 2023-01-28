import cx from 'classnames';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { breakpoints } from '../constants';
import styles from './Grid.module.scss';

export interface GridProps {
  /** optional spacing between rows - multiple of vertical rhythm */
  rowCount?: number;
  /** remove outermost gutters for nested grid */
  nested?: boolean;
  //** optional classNames */
  className?: string;
  /** props */
  [x: string]: any;
}

/** Allow default gap to be added, which used to be a prop prior to tailwind purging */
const addDefaultGap = (className: string) =>
  className && className.includes('gap-y-') ? '' : 'gap-y-8';

const Grid: React.FC<GridProps> = ({
  rowCount = 1,
  nested = false,
  className,
  children,
  ...props
}) => {
  const isMinWidthLarge = useMediaQuery(`(min-width:${breakpoints.large}px)`);

  return (
    <div
      className={cx(
        addDefaultGap(className),
        nested ? styles['gridContainer--nested'] : styles.gridContainer,
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
    </div>
  );
};

export default Grid;
