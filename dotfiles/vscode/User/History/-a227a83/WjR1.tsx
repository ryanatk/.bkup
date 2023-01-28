import { ElementType, ReactNode } from 'react';
import { Grid } from '../../../sormus';
import Icon from '../../../sormus/Icon';
import Subtitle from './Subtitle';
import Title from './Title';

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  titleClass?: string;
  subtitleClass?: string;
  icon?: ElementType;
}

const Header = ({
  title,
  subtitle,
  titleClass,
  subtitleClass,
  icon: SVG,
}: Props): JSX.Element => (
  <Grid className="mb-16">
    {SVG && (
      <div className="col-start-2 col-end-6 md:col-start-3 md:col-end-13">
        <Icon outlined size="large">
          <SVG />
        </Icon>
      </div>
    )}

    {title && (
      <div className="col-start-2 col-end-6 md:col-start-3 md:col-end-13">
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
