import { ReactElement } from 'react';
import { Typography } from '../../sormus';

const FOOTNOTE_ID = 'product-details-footnote';

const FsaProductDetails = (): ReactElement => {
  return (
    <>
      <Typography Element="h1" variant="h3" className="mb-1" color="grayMedium">
        Oura Ring
      </Typography>

      <Typography Element="h2" variant="h4" className="mb-1" color="grayMedium">
        Monitors your heart rate and overnight blood oxygen level
      </Typography>

      <Typography color="grayMedium">
        From $299 + $5.99/mo for membership
        <a href={`#${FOOTNOTE_ID}`}>*</a>
      </Typography>

      <div className="mt-6 pt-4 px-2 text-grayscale-text border-t border-gray-200">
        <ul className="list-disc ml-6 mb-4">
          <li className="mb-2">
            A smart ring to monitor your heart rate and overnight SpO2 — from
            the comfort of your home.
          </li>
          <li className="mb-2">
            Used for daytime and nighttime heart rate monitoring.
          </li>
          <li className="mb-2">Long battery life of up to 7 days.</li>
          <li className="mb-2">
            Easily share your heart rate and activity insights with your
            physician, trainer, caregiver, or family member.
          </li>
        </ul>

        <footer id={FOOTNOTE_ID}>
          * First month of membership is on us with your purchase. $5.99/mo
          afterwards.
        </footer>
      </div>
    </>
  );
};

export default FsaProductDetails;
