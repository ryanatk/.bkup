import { ReactElement } from 'react';
import { Typography } from '../../sormus';

const FsaProductDetails = (): ReactElement => {
  return (
    <section>
      <Typography Element="h1" variant="h3">
        Oura Ring
      </Typography>

      <Typography Element="h2" variant="h4">
        Monitors your heart rate and overnight blood oxygen level
      </Typography>

      <p>From $299 + $5.99/mo for membership*</p>
    </section>
  );
};

export default FsaProductDetails;
