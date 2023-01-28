import cx from 'classnames';
import { Typography } from '../../../sormus';
import { TypographyElement } from '../../../sormus/Typography';

interface Props {
  el?: TypographyElement;
  className?: string;
  color?: string;
  children: any;
}

const Title = ({
  el = 'h2',
  className,
  color,
  children,
}: Props): JSX.Element => (
  <div
    className={cx(
      className,
      'col-main',
      'col-start-2 lg:col-start-4',
      'lg:col-end-12',
    )}
  >
    <Typography Element={el} variant="h1" color={color}>
      {children}
    </Typography>
  </div>
);

export default Title;