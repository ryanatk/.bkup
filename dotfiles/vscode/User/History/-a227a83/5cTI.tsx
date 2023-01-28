import { ReactNode } from 'react';
import { Grid } from '../../../sormus';
import Subtitle from './Subtitle';
import Title from './Title';

interface Props {
  title?: ReactNode;
  subtitle?: ReactNode;
  titleClass?: string;
  subtitleClass?: string;
}

const Header = ({
  title,
  subtitle,
  titleClass,
  subtitleClass,
}: Props): JSX.Element => (
  <Grid rowCount={title && subtitle ? 1 : 1}>
    {title && (
      <div className="col-start-2 col-end-6 md:col-start-3 md:col-end-12">
        <Title className={titleClass}>{title}</Title>
      </div>
    )}

    {subtitle && (
      <div className="row-start-2 col-start-2 col-end-6 md:col-start-8 md:col-end-13">
        <Subtitle className={subtitleClass}>{subtitle}</Subtitle>
      </div>
    )}
  </Grid>
);

export default Header;
