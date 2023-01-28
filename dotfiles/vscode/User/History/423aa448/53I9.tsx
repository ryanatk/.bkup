import cx from 'classnames';
import { Typography } from '../../../sormus';
import { TypographyVariant } from '../../../sormus/Typography';

interface Props {
  variant?: TypographyVariant;
  className?: string;
  children: any;
}

const Subtitle = ({
  variant = 'h5',
  className,
  children,
}: Props): JSX.Element => (
  <Typography
    Element="p"
    variant={variant}
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
