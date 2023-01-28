import { ReactElement } from 'react';
import { Typography } from '../../sormus';

const FOOTNOTE_ID = 'product-details-footnote';

const FsaProductDetails = (): ReactElement => {
  return (
    <article>
      <Typography Element="h1" variant="h3" className="mb-1">
        Oura Ring
      </Typography>

      <Typography Element="h2" variant="h4" className="mb-1">
        Monitors your heart rate and overnight blood oxygen level
      </Typography>

      <Typography>
        From $299 + $5.99/mo for membership
        <a href={`#${FOOTNOTE_ID}`}>*</a>
      </Typography>

      <div className="my-4 py-4 text-grayscale-text border-t border-gray-100">
        <ul className="list-disc ml-4">
          <li className="mb-4">
            A smart ring to monitor your heart rate and overnight SpO2 — from
            the comfort of your home.
          </li>
          <li className="mb-4">
            Used for daytime and nighttime heart rate monitoring.
          </li>
          <li className="mb-4">Long battery life of up to 7 days.</li>
          <li className="mb-4">
            Easily share your heart rate and activity insights with your
            physician, trainer, caregiver, or family member.
          </li>
        </ul>

        <footer id={FOOTNOTE_ID}>
          * First month of membership is on us with your purchase. $5.99/mo
          afterwards.
        </footer>
      </div>
    </article>
  );
};

export default FsaProductDetails;
