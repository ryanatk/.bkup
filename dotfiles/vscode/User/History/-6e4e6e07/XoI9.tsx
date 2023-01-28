import { ReactElement, ReactNode } from 'react';
import { Typography } from '../../../components/sormus';

const LIST: {
  [x: number]: {
    style: {
      [x: string]: string;
    };
  };
} = {
  1: { variant: 'h1', style: { listStyleType: 'upper-roman' } },
  2: { variant: 'h2', style: { listStyleType: 'upper-alpha' } },
  3: { variant: 'h3', style: { listStyleType: 'lower-roman' } },
  4: { variant: 'h4', style: { listStyleType: 'lower-alpha' } },
  0: { variant: 'h5', style: { listStyleType: 'disc' } },
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
