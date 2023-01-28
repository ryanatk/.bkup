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

      <Typography>From $299 + $5.99/mo for membership*</Typography>

      <ul>
        <li>
          A smart ring to monitor your heart rate and overnight SpO2 — from the
          comfort of your home.
        </li>
        <li>Used for daytime and nighttime heart rate monitoring.</li>
        <li>Long battery life of up to 7 days.</li>
        <li>
          Easily share your heart rate and activity insights with your
          physician, trainer, caregiver, or family member.
        </li>
      </ul>

      <p>
        * First month of membership is on us with your purchase. $5.99/mo
        afterwards.
      </p>
    </section>
  );
};

export default FsaProductDetails;
