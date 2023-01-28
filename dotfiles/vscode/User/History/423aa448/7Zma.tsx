import { ReactNode } from 'react';
import { Typography } from '../../../sormus';

interface Props {
  className?: string;
  children: ReactNode;
  small?: boolean;
}

const Subtitle = ({ className, children, small }: Props): JSX.Element => (
  <Typography
    Element="p"
    variant={small ? 'h6' : 'h4'}
    color="inherit"
    className={className}
  >
    {children}
  </Typography>
);

export default Subtitle;
