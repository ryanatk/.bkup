import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';

const LIST: {
  [x: number]: {
    [x: string]: string;
  };
} = {
  1: { listStyleType: 'upper-roman' },
  2: { listStyleType: 'upper-alpha' },
  3: { listStyleType: 'lower-roman' },
  4: { listStyleType: 'lower-alpha' },
  0: { listStyleType: 'disc' },
};

interface ListProps {
  level: 1 | 2 | 3 | 4 | 0;
  children: ReactNode;
  className: string;
}

const List = ({ level, children, className }: ListProps): ReactElement => {
  const style = LIST[level];

  return (
    <Typography Element="ol" style={style} className={className}>
      {children}
    </Typography>
  );
};

export default List;
