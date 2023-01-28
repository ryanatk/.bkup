import cx from 'classnames';
import { Typography } from '../../../sormus';

interface Props {
  h1?: boolean;
  className?: string;
  children: any;
}

const Title = ({ h1, className, children }: Props): JSX.Element => (
  <Typography
    Element={h1 ? 'h1' : 'h2'}
    variant="h1"
    color="inherit"
    className={cx(
      className,
      'col-main',
      'col-start-2 md:col-start-4',
      'md:col-end-12',
    )}
  >
    {children}
  </Typography>
);

export default Title;
