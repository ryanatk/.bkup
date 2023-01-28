import cx from 'classnames';
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
    className={cx(
      className,
      'col-main',
      'col-start-main md:col-start-3',
      'md:col-end-13',
    )}
  >
    {children}
  </Typography>
);

export default Title;
