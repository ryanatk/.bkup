import { ReactElement } from 'react';
import { Typography } from '../../sormus';

const FsaProductDetails = (): ReactElement => {
  return (
    <section>
      <header>
        <Typography Element="h1" variant="h3" className="mb-1">
          Oura Ring
        </Typography>

        <Typography Element="h2" variant="h4" className="mb-1">
          Monitors your heart rate and overnight blood oxygen level
        </Typography>

        <Typography>From $299 + $5.99/mo for membership*</Typography>
      </header>

      <div className="text-grayscale-text border-t border-gray-100">
        <ul>
          <li>
            A smart ring to monitor your heart rate and overnight SpO2 — from
            the comfort of your home.
          </li>
          <li>Used for daytime and nighttime heart rate monitoring.</li>
          <li>Long battery life of up to 7 days.</li>
          <li>
            Easily share your heart rate and activity insights with your
            physician, trainer, caregiver, or family member.
          </li>
        </ul>

        <footer>
          * First month of membership is on us with your purchase. $5.99/mo
          afterwards.
        </footer>
      </div>
    </section>
  );
};

export default FsaProductDetails;
