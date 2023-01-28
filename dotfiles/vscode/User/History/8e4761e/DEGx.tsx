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
  <Typography
    Element={el}
    variant="h1"
    color={color}
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
