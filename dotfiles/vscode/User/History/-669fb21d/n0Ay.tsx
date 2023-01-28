import cx from 'classnames';

interface Props {
  className?: string;
}

const StatsWrapper: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cx(className, 'grid grid-cols-2 gap-10 mt-10 w-full')}>
      {children}
    </div>
  );
};

export default StatsWrapper;
