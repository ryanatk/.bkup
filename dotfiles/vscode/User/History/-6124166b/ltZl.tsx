import Head from 'next/head';

const CheckoutScripts = () => {
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
