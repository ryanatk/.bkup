import cx from 'classnames';
import { Typography } from '../../../sormus';
import { TypographyElement } from '../../../sormus/Typography';

interface Props {
  Element?: TypographyElement;
  className?: string;
  children: any;
}

const Title = ({
  Element = 'h2',
  className,
  children,
}: Props): JSX.Element => (
  <Typography
    Element={Element}
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
