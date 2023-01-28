import cx from 'classnames';
import { Typography } from '../../../sormus';

interface Props {
  className?: string;
  color?: string;
  children: any;
}

const Subtitle = ({ className, color, children }: Props): JSX.Element => (
  <Typography
    variant="subhead"
    color={color}
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
