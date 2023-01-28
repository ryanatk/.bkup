import { ReactElement } from 'react';
import { Typography, TypographyRhythm } from '../../sormus';

const FsaProductDetails = (): ReactElement => {
  return (
    <section>
      <TypographyRhythm>
        <Typography Element="h1" variant="h2">
          Oura Ring
        </Typography>

        <Typography Element="h2" variant="h3">
          Monitors your heart rate and overnight blood oxygen level0
        </Typography>
      </TypographyRhythm>
    </section>
  );
};

export default FsaProductDetails;
