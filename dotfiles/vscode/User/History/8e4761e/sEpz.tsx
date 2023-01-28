import { ReactNode } from 'react';
import { Typography } from '../../../sormus';

interface Props {
  h1?: boolean;
  className?: string;
  children: ReactNode;
}

const Title = ({ h1, className, children }: Props): JSX.Element => (
  <Typography
    Element={h1 ? 'h1' : 'h2'}
    variant="h1"
    color="inherit"
    className={className}
  >
    {children}
  </Typography>
);

export default Title;
