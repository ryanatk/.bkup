import cx from 'classnames';
import { ReactNode } from 'react';

interface Props {
  spacing: 'single' | 'double';
  indent: 'single' | 'double';
  children: ReactNode;
}

const OL = ({ spacing = 'single', indent = 'single', children }) => {
  return (
    <ol
      className={cx({
        'mb-4': spacing === 'double',
        'ml-4': indent === 'single',
        'ml-8': indent === 'double',
      })}
    >
      {children}
    </ol>
  );
};

export default OL;
