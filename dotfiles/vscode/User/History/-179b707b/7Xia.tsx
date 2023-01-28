import cx from 'classnames';
import { ReactElement } from 'react';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Stat, StatsWrapper } from '../../sormus';
import { Typ } from './components';
import { BENEFITS } from './data';

const BusinessBenefits = (): ReactElement => {
  return (
    <Grid className="bg-sand py-20">
      <Typ
        Element="h2"
        variant="h2"
        className="col-main md:col-start-3 md:col-end-13 md:mb-7"
      >
        Real benefits in real time.
      </Typ>

      <Image
        className="col-main md:col-start-3 md:col-end-7"
        src={src('simple-home/home-about-oura-01@2x', 'jpg', 500)}
        alt=""
      />

      <Typ
        Element="div"
        className={cx(
          'pt-4 md:pt-0',
          'flex flex-col justify-center',
          'col-main md:col-start-8 md:col-end-13',
        )}
      >
        <Typ Element="h3" variant="h5" className="mb-8">
          Oura members experience significant benefits within their first month.
        </Typ>

        <StatsWrapper>
          {BENEFITS.map((stat) => (
            <Stat {...stat} key={stat.label} />
          ))}
        </StatsWrapper>
      </Typ>
    </Grid>
  );
};

export default BusinessBenefits;
