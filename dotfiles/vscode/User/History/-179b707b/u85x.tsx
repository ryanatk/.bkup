import { ReactElement } from 'react';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image, Stat, StatsWrapper } from '../../sormus';
import { Typ } from './components';
import { BENEFITS } from './data';

const BusinessBenefits = (): ReactElement => {
  return (
    <Grid className="bg-sand py-20">
      <Typ className="col-main">Real benefits in real time.</Typ>
      <Image
        className="col-main"
        shortSrc={src('simple-home/home-about-oura-01@2x', 'jpg', 500)}
        alt=""
      />

      <Typ Element="div" className="col-main">
        <Typ>
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
