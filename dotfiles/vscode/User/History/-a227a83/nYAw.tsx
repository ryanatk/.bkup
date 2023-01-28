import cx from 'classnames';
import { ElementType, ReactNode } from 'react';
import { Grid, Typography } from '../../../sormus';
import Icon from '../../../sormus/Icon';
import Subtitle from './Subtitle';
import Title from './Title';

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  titleClass?: string;
  subtitleClass?: string;
  icon?: ElementType;
  iconLabel?: string;
}

const Header = ({
  title,
  subtitle,
  titleClass,
  subtitleClass,
  icon: SVG,
  iconLabel,
}: Props): JSX.Element => (
  <Grid className="mb-16 gap-y-4">
    {SVG && (
      <div className="col-start-2 col-end-6 md:col-start-3 md:col-end-13">
        <Icon outlined size="large" square>
          <SVG />
        </Icon>

        {iconLabel && (
          <Typography
            Element="span"
            variant="caption"
            color="inherit"
            className="ml-3"
          >
            {iconLabel}
          </Typography>
        )}
      </div>
    )}

    {title && (
      <div
        className={cx('col-start-2 col-end-6 md:col-start-3 md:col-end-13', {
          'mb-4': Boolean(subtitle),
        })}
      >
        <Title className={titleClass}>{title}</Title>
      </div>
    )}

    {subtitle && (
      <div className="col-start-2 col-end-6 md:col-start-8 md:col-end-13">
        <Subtitle className={subtitleClass}>{subtitle}</Subtitle>
      </div>
    )}
  </Grid>
);

export default Header;
