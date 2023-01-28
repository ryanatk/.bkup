import Head from 'next/head';
import { ReactElement } from 'react';

const CheckoutScripts = (): ReactElement => {
  return (
    <Head>
      <script
        src="https://www.paypalobjects.com/api/checkout.js"
        async
        key="paypal-checkout-script"
      />
    </Head>
  );
};

export default CheckoutScripts;
