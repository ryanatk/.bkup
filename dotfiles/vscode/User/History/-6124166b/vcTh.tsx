import Head from 'next/head';
import { ReactElement } from 'react';

const CheckoutScripts = (): ReactElement => {
  return (
    <Head>
      <script
        key="paypal-checkout-script"
        src="https://www.paypalobjects.com/api/checkout.js"
        async
      />

      <script
        src="https://static.zuora.com/Resources/libs/hosted/1.3.1/zuora-min.js"
        async
      />
    </Head>
  );
};

export default CheckoutScripts;
