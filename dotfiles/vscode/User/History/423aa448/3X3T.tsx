import cx from 'classnames';
import { Typography } from '../../../sormus';

interface Props {
  className?: string;
  children: any;
}

const Subtitle = ({ className, children }: Props): JSX.Element => (
  <Typography
    Element="p"
    variant="h5"
    color="inherit"
    className={cx(
      className,
      'col-main',
      'col-start-3 md:col-start-8',
      'md:col-end-13',
    )}
  >
    {children}
  </Typography>
);

export default Subtitle;
