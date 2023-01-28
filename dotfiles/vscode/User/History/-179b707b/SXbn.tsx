import { ReactElement } from 'react';
import { src } from '../../../utils/imageHelpers';
import { Grid, Image } from '../../sormus';
import { Typ } from './components';

const BusinessBenefits = (): ReactElement => {
  return (
    <Grid>
      <Typ className="col-main">Real benefits in real time.</Typ>
      <Image
        shortSrc={src('simple-home/home-about-oura-01@2x', 'jpg', 500)}
        alt=""
      />

      <div>
        <Typ>
          Oura members experience significant benefits within their first month.
        </Typ>
      </div>
    </Grid>
  );
};

export default BusinessBenefits;
