import cx from 'classnames';
import { ReactElement, ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

const StatsWrapper = ({ className, children }: Props): ReactElement => {
  return (
    <div className={cx(className, 'grid grid-cols-2 gap-10 w-full')}>
      {children}
    </div>
  );
};

export default StatsWrapper;
