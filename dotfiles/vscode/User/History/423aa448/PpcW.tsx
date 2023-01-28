import cx from 'classnames';
import { Typography } from '../../../sormus';

interface Props {
  className?: string;
  color?: string;
  children: any;
}

const Subtitle = ({ className, color, children }: Props): JSX.Element => (
  <div
    className={cx(
      className,
      'col-main',
      'col-start-3 md:col-start-8',
      'md:col-end-13',
    )}
  >
    <Typography variant="h6" color={color}>
      {children}
    </Typography>
  </div>
);

export default Subtitle;
